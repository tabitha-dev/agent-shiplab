# Challenge B — Deadline filters & sorting

**Stage:** Prepared for live Kosuke evaluation. No feature implementation or results are claimed in advance.

**Starting branch:** `challenge/deadline-filters` (created from the working `main` baseline).  
**PR target:** `challenge/deadline-filters` (never `main`).  
**Source:** [Issue #3](https://github.com/tabitha-dev/agent-shiplab/issues/3).

## First session prompt (copy everything in the block below)

> You are an engineering agent working in the public Next.js/TypeScript repo `tabitha-dev/agent-shiplab`. Your session MUST start from `challenge/deadline-filters`, which is a clean feature baseline taken from `main` — not the old `challenge/search-regression` bug branch.
>
> **First, before editing:** show the source commit SHA and branch, confirm the intended PR target is `challenge/deadline-filters`, inspect `src/components/dashboard.tsx`, `src/lib/task-logic.ts` and current tests, and run `npm test`, `npm run typecheck`, and `npm run build`. If the starting branch or PR target cannot be confirmed, stop instead of editing.
>
> **Feature:** make managing task deadlines practical and accessible:
>
> 1. Add a clearly labeled **Due date** filter above the existing Kanban board with **All**, **Overdue**, and **Due in next 7 days**.
> 2. Add a clearly labeled **Sort by** control with **Due soonest** and **Newest first**; keep ordering consistent *within each Kanban column*, without changing the order of the columns.
> 3. **Overdue** means an unfinished task with a due date **before the current local calendar date**. **Due in next 7 days** means an unfinished task due **today through the following 6 calendar dates, inclusive**. Do not include undated tasks in either bucket. Include all tasks, including undated ones, in **All**.
> 4. **Due soonest** puts earlier due dates before later dates and places undated tasks last; ties sort deterministically (created date, then ID). **Newest first** sorts by creation timestamp descending, with stable tie-breaking.
> 5. Treat task due dates as **calendar dates**, not instants. Avoid UTC-midnight and daylight-saving off-by-one errors. You may add date/filter helpers to `src/lib/task-logic.ts` and tests, but keep the data model and SQLite/API behavior intact.
> 6. New controls must compose with existing search, project, priority, and status filters; **Clear filters** resets due-date filtering as well. Preserve task creation, updating, deletion and case-insensitive search.
> 7. Make the interface keyboard-accessible and usable on desktop and mobile. Use native semantic controls with visible labels and clear focus states. Ensure the filter row does not overflow on a narrow screen.
>
> **Evidence and tests:**
>
> - Add meaningful unit tests for overdue/today/day 7, undated tasks, completed tasks, timezone behavior, sorting/tie-breakers, and composed filters.
> - Add at least one Playwright test showing deadline filtering and sort order in the board. Use deterministic fixture dates or clock control; never assert against real changing calendar time.
> - Run `npm test`, `npm run typecheck`, `npm run build`, and `npm run test:e2e`. If a command fails, diagnose and report the exact failure; do not silently drop it.
> - Demonstrate the actual controls in the session Preview at desktop and narrow/mobile widths. Capture screenshots showing the filter and sort results with visible task names, and report any issues honestly.
> - Keep the solution maintainable, focused and visually consistent with the existing ShipLab design. Do not disable tests, make unrelated redesigns or add an external UI library just for this feature.
>
> **Stop for review:** Show a concise implementation summary, list of changed files, test pass/fail counts, screenshots, environment issues, and actual run time / usage if available. **Do not open or merge a PR or modify `main`** until the creator explicitly approves. If you cannot run Kosuke's delegated recorded QA because the tools are unavailable, mark it **BLOCKED**, not passed or failed.

## Human verification

- [ ] New session starts from `challenge/deadline-filters`; not the former search regression
- [ ] Confirm clean baseline tests *before* making changes
- [ ] Overdue excludes completed and undated tasks
- [ ] Seven-day date range includes today and next 6 calendar days
- [ ] No time zone / daylight saving off-by-one error
- [ ] Sort is deterministic within every workflow column
- [ ] Date filter composes with search, priority, project and status
- [ ] Reset restores the expected board
- [ ] Desktop and mobile UI remain usable, with correct labels and keyboard focus
- [ ] Unit, typecheck, build, browser-test results shown (including failures)
- [ ] Screenshot actually shows feature controls and affected tasks
- [ ] No PR until review; any later PR targets `challenge/deadline-filters`
- [ ] Log prompt count, elapsed wall time, retries, credits/charges and any blocked QA

## Recording angle

We are moving beyond a deliberately planted defect. **This challenge asks the agent to add a real feature to an existing working app.** Capture before/after as truthful video evidence, and distinguish a passing GitHub CI run from Kosuke's separate automated QA.

[ShipLab README](../README.md) · [Challenge A findings](CHALLENGE_A_RESULTS.md) · [Full experiment](EXPERIMENT.md)
