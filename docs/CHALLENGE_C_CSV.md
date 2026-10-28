# Session 2: Export currently filtered tasks to CSV

## Start conditions
Repository: tabitha-dev/agent-shiplab
Starting branch AND future PR base: challenge/parallel-agents
Use a new independent Kosuke session and its own auto-created working branch (kosuke/chat-...). Start from the same shared baseline as the Analytics session, NOT its working branch.
Before editing, report source commit SHA, verify it matches origin/challenge/parallel-agents, inspect dashboard.tsx, filterTasks, sortTasks and task DTO, and run npm test, npm run typecheck and npm run build. If source is wrong, STOP.

## Implement
- Add a clearly labelled and keyboard accessible **Export CSV** control near the existing project board search and filters.
- Export exactly the tasks in the **currently filtered AND sorted board view** (including active search, status, project, priority, due-date options and selected sort); use the same filtered array already used for rendering. Don't silently export all tasks.
- Include useful column headers and task data such as title, description, project, assignee, status, priority, due date, createdAt. Do not invent metrics or export secrets.
- CSV quoting: correctly double quotes within cells and quote cells containing comma, quote, CR or LF. Preserve embedded newlines; use consistent line endings. Guard against spreadsheet formula injection in user-provided text beginning with =, +, -, @ or control/whitespace leading into those characters.
- Generate safe, deterministic filename without path traversal, optionally with local date. Export should work without external integrations or a backend change, and revoke temporary object URLs after download.
- Handle empty filtered results explicitly: either export a headers-only CSV with clear communication or disable the button with accessible explanation; choose and document one.
- Maintain design, 390px mobile fit and visible keyboard focus. Ensure task creation, status changes, deletion, deadline filters and Analytics-independent baseline remain intact.

## Verification
Add isolated unit tests for header order, commas, quotes, newlines, CRLF, empty strings, Unicode, formula injection, empty filtered list, and exported row count/order. Add Playwright coverage exercising a query + due/project filter combination and verifying the downloaded CSV has exactly the visible rows. Do NOT weaken existing tests.

Run npm test, npm run typecheck, npm run build, npm run test:e2e; inspect real CSV output and preview at desktop and mobile. Capture screenshots and downloadable evidence (avoid publishing personal data). Report failures/retries/environment issues accurately. Distinguish normal Playwright from recorded Kosuke QA; mark unavailable Delegated Run tools BLOCKED.

Commit/push only the separate session branch. NO PR yet, no merges, no changes to main or shared starting branch. Stop for independent human review.
