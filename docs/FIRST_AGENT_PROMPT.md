# Challenge A — First Kosuke agent prompt

Use this prompt **only after** the project is imported and you have verified:
- main preview renders the task board and sample tasks
- the project settings are set to `Branch sessions from = challenge/search-regression` and `Open PRs against = challenge/search-regression`
- the new session actually starts from `challenge/search-regression`, **not** `main`

## Copy into the first Kosuke session

> You are working in the public repository `tabitha-dev/agent-shiplab`.
>
> **Your starting branch must be `challenge/search-regression`, not `main`.** This branch contains a deliberately introduced bug for a reproducible engineering test.
>
> **Task:** Repair the task search so it matches text regardless of letter case. Searching for `NAVIGATION` should find the seeded task `Investigate navigation overflow`. Keep searching across title, description, project, and assignee; preserve whitespace trimming, project/priority/status filters, and task CRUD.
>
> **Before changing code:** inspect `src/lib/task-logic.ts`, run `npm test`, explain which test fails and why. Do not remove, weaken, skip or rewrite existing tests to hide the defect.
>
> **Implement the smallest correct fix** and add a regression test only if existing coverage is insufficient. Run and report `npm test`, `npm run typecheck`, `npm run build`, and `npm run test:e2e`. If a browser cannot run, state that explicitly and explain the limitation instead of claiming success.
>
> **Show the result in the live Preview:** search for `NAVIGATION`, `  navigation  `, and `aurora`, then demonstrate at least one combined filter. Make sure no existing functionality regressed.
>
> **Deliver:** a focused pull request **targeting `challenge/search-regression` only**, a summary of root cause, exact commands and test results, screenshots or logs showing the before/after behavior, and any issues or tradeoffs. **Do not merge, deploy to production, or modify `main`.** If your environment tries to target `main`, stop and ask for the PR target to be corrected.
>
> Avoid real user data, credentials, and unrelated code changes. Describe what you actually observed. Do not exaggerate results.

## Film and evidence checklist

Record or save:
- [ ] Date, start time and timezone
- [ ] The Kosuke account shows Pro, with current credit allowance and usage (hide private details)
- [ ] Agent/model selected
- [ ] Repo + start branch + intended PR target visible
- [ ] Baseline error on challenge branch: search for `NAVIGATION`
- [ ] Failing unit-test output **before** the fix
- [ ] Full original prompt and each follow-up
- [ ] Code diff showing the narrow fix
- [ ] Preview working after the fix, including mobile width if possible
- [ ] Unit, typecheck, production-build and Playwright results
- [ ] PR URL + review comments + QA artifacts, if any
- [ ] End time and total sessions/turns
- [ ] Usage and cost read from Kosuke, including any stopped sandboxes
- [ ] Actual failure(s), manual intervention and unresolved defects

## Stop conditions

Stop and investigate if:
- Kosuke cannot clone `agent-shiplab` with repository-only access
- Pro is not visible / billing shows unexpected charges or overages enabled
- Preview exposes private content, has live credentials, or needs public data
- The session starts from `main` or asks to merge a PR into `main`
- The agent silently alters or removes tests to obtain a pass
- The app service is not healthy at port 3000

Do not publish the affiliate promo as a verified benefit until its current terms are confirmed. Filming should disclose complimentary access and referral earnings.

[Return to setup](KOSUKE_SETUP.md) · [Experiment protocol](EXPERIMENT.md)
