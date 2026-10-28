# Session 1: Honest analytics view

## Start conditions
Repository: tabitha-dev/agent-shiplab
Starting branch AND future PR base: challenge/parallel-agents
Kosuke should use its own auto-created working branch (kosuke/chat-...). Do not target main, challenge/deadline-filters or the CSV session branch.
Before editing, show the actual starting commit SHA and verify it matches origin/challenge/parallel-agents; inspect the task DTO, dashboard, statusCounts and calculateStats, and run npm test, npm run typecheck and npm run build. If the starting code is wrong, STOP.

## Implement
Add an **Analytics** tab to the existing navigation, without breaking Overview, Project board, status filters, CRUD or deadline features. Visual style should match ShipLab and work at 390px and desktop.

Show only metrics backed by the actual loaded task dataset:
- Total tasks, counts by status (Backlog, In Progress, In Review, Done), completion percentage (done / total, with clear empty-state handling).
- A lightweight **current status distribution** visualization with labels, values and an accessible HTML table or equivalent screen-reader-readable textual alternative.
- Optionally show **tasks created by week** using actual createdAt values, correctly labelled as task creation activity; DO NOT infer historical status transitions, completion history, velocity or productivity trends from current snapshot data. There is no event-history model.
- Handle zero tasks and a single status group gracefully. Keep counts reconciled with visible records; do not use fabricated analytics values or placeholders in production.
- Use semantic headings, keyboard-accessible navigation, sufficient labels, visible focus, and responsive chart alternatives. Avoid adding a large chart dependency.

Do not implement CSV export, add unneeded external services, or alter the SQLite schema for time-series claims.

## Verification
Add unit tests for chart data preparation/status totals, empty dataset and at least one edge case. Add one meaningful Playwright test covering Analytics navigation, correct figures and accessible text/table. Keep all existing tests active.

Run npm test, npm run typecheck, npm run build, npm run test:e2e. Demonstrate Analytics in preview at desktop and 390px mobile, capture full relevant screenshots. Report exact passing/failing totals and environment issues, wall time/prompt count/credits only if observable. Explicitly distinguish normal Playwright from any separate Kosuke recorded QA, mark unavailable tools BLOCKED.

Commit/push only the session's own working branch. NO PR yet, no merges, no changes to main or shared starting branch. Stop for independent human review.
