# ShipLab: reproducible AI coding-agent experiment

**Purpose:** Test whether a coding agent can work in a real Next.js repository, preview changes, pass regression and browser tests, and produce a reviewable GitHub pull request.

## Evidence rules
1. Record the exact baseline commit SHA, agent model, subscription level, tool version, prompt, and start/end timestamps.
2. Run \`npm run setup\`, \`npm test\`, \`npm run typecheck\`, and \`npm run build\` **before** agent changes. Record outcomes.
3. Work from a dedicated branch for each challenge. Keep main functioning.
4. Do not quietly fix agent mistakes. Record every human intervention, re-prompt, failed test, and rerun.
5. Retest manually and with Playwright. A visual preview alone is **not** proof of correctness.
6. Never claim recorded results until evidence exists. Blur auth details, emails, tokens, and private repo names in videos.

## Challenge A — Search regression (the hook)
**Starting point:** Create a branch from main and introduce exactly one controlled failure in \`filterTasks()\`: make query matching case-sensitive instead of case-insensitive. This is **deliberately seeded** for the experiment, not a spontaneous bug.

**Reproduce:** Search for \`navigation\` with a seeded task titled \`Investigate navigation overflow\` — the card disappears when query case does not match. Run \`npm test\`; the case-insensitive search test should fail.

**Prompt to the agent:**
> In this ShipLab branch, task search incorrectly treats uppercase and lowercase letters differently. Reproduce the failure, fix the root cause without disabling tests, add or preserve the regression test, and provide a working preview and a pull request with test evidence. Do not change unrelated features.

**Accept:** Case-insensitive search works for title, description, assignee and project; whitespace is trimmed; combined filters work; existing tests remain active.

## Challenge B — Deadline management
**Prompt:**
> Add a due-date range filter (Overdue, Due in 7 days, All) and a sort selector (Due soonest, Newest) for the board. Ignore missing dates when filtering for a due range. Dates should be stable across time zones. Add unit and Playwright tests, demonstrate the controls in your preview, and create a PR.

**Accept:** No off-by-one timezone errors; empty due dates handled; keyboard-accessible controls; filters compose with existing search.

## Challenge C — Parallel sessions
**Session 1 prompt:** Add an Analytics tab with a lightweight trend visualization and proper empty states, testing the calculations. 
**Session 2 prompt:** Add a CSV export of the **currently filtered** tasks, with CSV escaping, safe filenames, and a unit test for commas/quotes/newlines.
**Accept:** Two independent branches and reviewable PRs, no overwritten work, passing tests after integration.

## Challenge D — Automated QA evidence
Ask the platform to run QA on a real PR. Save any screenshots, errors, test artifacts, and GitHub comments it actually produces. Independently test responsive layout at 390, 768, and 1440 pixels; keyboard navigation; and no uncaught console errors. Record any gap between claimed automated QA and observable artifacts.

## Scorecard (do not prefill results)
| Criterion | How measured |
| --- | --- |
| Build | \`npm run build\` exit code |
| Unit tests | Passed/total tests |
| Browser tests | Passed/total Playwright tests |
| Accessibility | Manual keyboard check + automated checks, if configured |
| Preview | Accessible URL, functional CRUD, no blocking errors |
| PR quality | Scope, explanation, evidence, reproduction steps |
| Time | Real wall-clock minutes including retries |
| Human input | Every manual edit or corrective prompt |
| Cost | Actual platform credits / charges, not estimated savings |

Mark each criterion PASS / FAIL / NOT TESTED, link artifacts and timestamp evidence. Report every failure. No benchmark or speed comparison is fair without the same hardware, codebase, prompt, and measurement boundaries.

## Version plan
- **Baseline v0.1:** A clean, reusable public task app and test suite.
- **Challenge branch:** Deliberately seeded bug used in the video, separate from main.
- **Results v1.0:** Merge only validated improvements after filming; publish linked run evidence.
