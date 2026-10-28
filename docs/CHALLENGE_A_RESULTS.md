# Challenge A: Case-insensitive search — verified results (2026-10-28)

> Independent, evidence-based log for the ShipLab/Kosuke evaluation. This is **not** an endorsement or a completed Kosuke automated-QA certification.

## Reproducible setup

- Repo: [tabitha-dev/agent-shiplab](https://github.com/tabitha-dev/agent-shiplab)
- Working baseline: `main` — uppercase search worked in the preview.
- Intentionally seeded regression: `challenge/search-regression`, starting commit `d7366ac6b4fda852d0a079f852807524d49a1269`.
- Agent: Kosuke session with **OpenAI GPT 6.1 Sol (Low)**, as shown in creator screenshots.
- Session working branch: `kosuke/chat-epissf`.
- Fix commit: [`d246ecf`](https://github.com/tabitha-dev/agent-shiplab/commit/d246ecf83c971e18ef829e28d12a124642ea92fe).
- Review PR: [#6](https://github.com/tabitha-dev/agent-shiplab/pull/6), `kosuke/chat-epissf` → `challenge/search-regression`; **open and unmerged** at verification.

## Actual observations

| Check | Result | Evidence |
| --- | --- | --- |
| Uppercase `NAVIGATION` search on baseline | PASS (manually observed) | Creator screenshot shows `Investigate navigation overflow` |
| Same search on seeded regression branch | FAIL (intentionally) | Creator screenshot shows 0 results |
| Unit tests before fix | 7 passed, 3 failed | Kosuke session output |
| Agent identifies bug | PASS | Source was using case-sensitive `.includes()` |
| Agent changes code | PASS, 1 file, 2 lines | [PR diff](https://github.com/tabitha-dev/agent-shiplab/pull/6/files) |
| Unit tests after fix | 10 passed | Kosuke session output and independent CI |
| Typecheck | PASS | Independent GitHub CI |
| Production build in Kosuke sandbox | **FAIL** | `Invariant: no direct app page entry found for /icon.svg`; environment-specific cause not established |
| Production build in GitHub Actions | PASS | [Independent CI run](https://github.com/tabitha-dev/agent-shiplab/actions/runs/40748751312) |
| Playwright browser smoke test | PASS, 1/1 | GitHub CI; Kosuke initially needed Chromium installed |
| Session preview of repaired uppercase search | PASS according to agent | Agent reports observing the matching task; supplied image artifact should not be represented as conclusive visual proof without showing the actual search state |
| PR base/head | PASS | [PR #6](https://github.com/tabitha-dev/agent-shiplab/pull/6) |
| PR merged | NO | Deliberately left open; `main` is not the target |
| Kosuke recorded/Delegated QA (initial) | **BLOCKED, not failed** | 0 passed, 0 failed, 2 blocked |
| Kosuke recorded/Delegated QA (restart) | **BLOCKED again** | Required `start_run` and `wait_runs` unavailable; no videos generated. [PR issue comment](https://github.com/tabitha-dev/agent-shiplab/pull/6) |

## What we can and cannot claim

**Verified:** Kosuke inspected a real GitHub project, diagnosed the seeded search regression, changed only the relevant lines, passed regression/unit and browser tests, and opened a reviewable PR targeting the requested challenge branch. Independent CI builds the same commit successfully.

**Not verified / limitation:** Kosuke's separate recorded automated-QA run never executed; the report is correctly labelled `qa: blocked`. Do not call its two checklist items passed or failed. The agent's screenshot artifact previously displayed a task dashboard, rather than clearly showing `NAVIGATION` entered and the matching task; obtain genuine visible proof before using it as a video before/after.

**Build caveat:** The Kosuke sandbox's `/icon.svg` production-build failure must be reported even though the GitHub CI build passed. No root-cause conclusion has been established.

## For the video

- **Before:** working `main` preview with uppercase query -> one matching card.
- **Seeded failure:** explicit disclosure that the test bug was introduced intentionally in a separate challenge branch; uppercase query -> zero cards.
- **Agent diagnosis:** 7 passing / 3 failing unit tests.
- **Agent repair:** [two-line diff](https://github.com/tabitha-dev/agent-shiplab/pull/6/files).
- **Verification:** [GitHub green CI](https://github.com/tabitha-dev/agent-shiplab/actions/runs/40748751312) and accurately described sandbox build caveat.
- **Platform limitation:** separate recorded QA run blocked twice; no videos.
- **PR:** [#6](https://github.com/tabitha-dev/agent-shiplab/pull/6) left unmerged for review.

## Measurements still missing

Elapsed wall-clock time, number of prompt retries, credit usage/charges, manually captured case-insensitive search after the fix, mobile-width checks, keyboard-accessibility results, and developer's subjective usability verdict are **not recorded**. Do not invent these.

## Promotional disclosure

Kosuke provided the creator complimentary promotional access and may pay referral commissions. Code `TABITHA2026` was supplied via email. Confirm current eligibility and exact reward terms before publishing them. State the complimentary access and financial relationship prominently in any video or description.

[Experiment protocol](EXPERIMENT.md) · [Setup guide](KOSUKE_SETUP.md)
