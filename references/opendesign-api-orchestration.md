# OpenDesign Daemon API & Automation Reference

Authoritative guide for headlessly orchestrating AI OpenDesign via its native daemon REST API (port 7456) instead of fragile browser DOM clicks.

---

## 1. Architecture Overview
- **Daemon Port**: `7456` (OpenDesign Next.js + Fastify daemon backend).
- **Frontend Port**: `3000` (In DevPixel environment, port 3000 is often reserved for `devpixel-frontend`, while OpenDesign daemon runs on `7456`).
- **Database**: SQLite database at `/var/lib/docker/volumes/open-design_open_design_data/_data/app.sqlite`.
- **Runs Store**: File-based run logs at `<dataDir>/runs/<run_id>/state.json` and `events.jsonl`.
- **Project Directory**: Workspace files live in `/app/.od/projects/<project_id>/`.

---

## 2. API Automation Pipeline

### Step 1: Project Creation (`POST /api/projects`)
Creates a new workspace bound to the specified skill:
```bash
POST http://127.0.0.1:7456/api/projects
Content-Type: application/json

{
  "id": "603e09ca-43b8-4d82-acd5-a341f1691da3",
  "name": "MNC Global Solutions v2 - Beplus Spec Remake",
  "skillId": "beplus-spec-remake"
}
```
**Response**: `{ id: "...", conversationId: "..." }`.

---

### Step 2: Message Seeding (`PUT /api/projects/:id/conversations/:cid/messages/:mid`)
Before dispatching a chat run, SQLite strictly requires both a user message AND an assistant message placeholder.

#### A. User Message
```bash
PUT http://127.0.0.1:7456/api/projects/<project_id>/conversations/<conv_id>/messages/<user_msg_uuid>
Content-Type: application/json

{
  "id": "<user_msg_uuid>",
  "role": "user",
  "content": "<FULL_PROMPT>",
  "position": 0,
  "createdAt": 1791257914000
}
```

#### B. Assistant Placeholder (CRITICAL SQLITE CONSTRAINTS)
SQLite enforces `content TEXT NOT NULL` and `position INTEGER NOT NULL` on table `messages`. Omitting `content: ""` causes an HTTP 500 error (`NOT NULL constraint failed: messages.content`).
```bash
PUT http://127.0.0.1:7456/api/projects/<project_id>/conversations/<conv_id>/messages/<asst_msg_uuid>
Content-Type: application/json

{
  "id": "<asst_msg_uuid>",
  "role": "assistant",
  "content": "",
  "position": 1,
  "runStatus": "queued",
  "createdAt": 1791257914001
}
```

---

### Step 3: Dispatch Chat Run (`POST /api/chat`)
Initiates the agent run.
```bash
POST http://127.0.0.1:7456/api/chat
Content-Type: application/json

{
  "projectId": "<project_id>",
  "conversationId": "<conv_id>",
  "assistantMessageId": "<asst_msg_uuid>",
  "message": "<FULL_PROMPT>",
  "userPrompt": "<FULL_PROMPT>",
  "skillId": "beplus-spec-remake",
  "agentId": "opencode",
  "clientType": "web"
}
```

#### ⚠️ Critical Pitfall: The `message` Key
The daemon route (`routes/runs.js`) validates:
```javascript
if ((typeof message !== 'string' || !message.trim()) && safeCommentAttachments.length === 0) {
    return failRun('BAD_REQUEST', 'message required');
}
```
If you pass `userPrompt` without `message: prompt`, the daemon immediately fails the run with `BAD_REQUEST: message required`. Always supply `message: prompt`.

---

### Step 4: Stream Consumption & Progress Tracking
The response from `POST /api/chat` is an HTTP Server-Sent Events (SSE) stream (`text/event-stream`):
- `event: start` -> carries `runId`, `agentId`, `cwd`.
- `event: agent` -> carries `type: "status"` (`running`), `type: "thinking"`, `type: "tool_use"` (`bash`, `read`, `write`), `type: "tool_result"`, and `type: "text"`.
- `event: done` or `data: [DONE]` -> indicates completion.

To check completion headlessly without keeping the connection open:
```bash
jq '{id, status, error}' /var/lib/docker/volumes/open-design_open_design_data/_data/runs/<run_id>/state.json
```
Status transitions: `running` -> `succeeded` or `failed`.

---

## 3. Critical Failure Modes & Root-Cause Solutions

### 3.1. The `example-web-prototype` Plugin Trap & 600s Watchdog Stall ("Reply timed out")

#### Symptom:
A run takes 20+ minutes and terminates with a red banner: **`Reply timed out`** (`Agent stalled without emitting any new output for 600s. The model or CLI likely hung while generating`).

#### Root Cause Forensic:
1. When a user creates a project via the OpenDesign UI homepage or clicks the default prototype card, the daemon auto-assigns the official plugin snapshot: `plugin_id: example-web-prototype` (`/app/plugins/_official/examples/web-prototype`).
2. This creates `.od-skills/web-prototype-<hash>/` inside the project alongside `beplus-spec-remake`.
3. `web-prototype` has a strict P0 requirement: *"No remote image dependencies. Every used image is embedded as a data URI in the artifact HTML."*
4. The AI agent gets hijacked by this rule, downloads all 20+ remote images, and writes Python scripts to convert them into a massive Base64 WebP JSON (`/tmp/data_uris.json` reaching ~1 MB).
5. When the agent attempts to assemble an HTML file with ~1 MB of embedded base64 data URIs in a single turn, the LLM token generation stream freezes/stalls, exceeding the 600-second daemon inactivity watchdog.

#### Deterministic Remediation:
1. **Purge the conflicting plugin directory**:
   ```bash
   docker exec -u 0 open-design rm -rf /app/.od/projects/<project_id>/.od-skills/web-prototype-*
   ```
2. **Clear the snapshot binding in SQLite**:
   ```bash
   sqlite3 /var/lib/docker/volumes/open-design_open_design_data/_data/app.sqlite \
     "UPDATE projects SET applied_plugin_snapshot_id = NULL WHERE id = '<project_id>';"
   ```
3. **Clean up lingering base64 artifacts**:
   ```bash
   docker exec -u 0 open-design rm -f /tmp/data_uris.json /tmp/svg_logos.json /tmp/prototype.html
   ```
4. **Enforce Pure `beplus-spec-remake`**:
   Ensure `.od-skills/` only contains `beplus-spec-remake` and instruct the agent to use Unsplash imagery instead of base64 data URIs.
