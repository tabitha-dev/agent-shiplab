# Challenge 3: Parallel agent sessions

**Status:** READY TO RUN. This is the experiment specification, not evidence of success.

## Ground truth
- Based on the merged, verified Challenge 2 branch at commit f8e9ea335e06a5d8947167dad300583da8b7f496.
- Shared starting and PR target branch: challenge/parallel-agents.
- Issue: https://github.com/tabitha-dev/agent-shiplab/issues/4
- Both Kosuke sessions must independently start from the **same commit SHA of challenge/parallel-agents**, before either is merged.
- Kosuke should create a separate kosuke/chat-* working branch and sandbox for each session. Do not force agents to share a working branch.
- Keep main and all previous challenge branches unchanged.
- Use GPT 6.1 Sol (Low) in both sessions for consistency if selectable.

## The two tasks
1. **Analytics:** Read docs/CHALLENGE_C_ANALYTICS.md. Build a real-data, accessible Analytics view. No fake time-series data.
2. **CSV export:** Read docs/CHALLENGE_C_CSV.md. Export only currently filtered and sorted tasks with rigorous CSV escaping and spreadsheet-formula safety.

## Human runbook
1. Kosuke: open agent-shiplab > Project Settings > Advanced > Branch Overrides.
2. Set BOTH 'Branch sessions from' and 'Open PRs against' to challenge/parallel-agents; Save. Leave Agent Working Directory empty (the displayed packages/frontend is a placeholder).
3. Redeploy and confirm success.
4. Start **Analytics** session, explicitly selecting challenge/parallel-agents in the Start branch dropdown. Paste the Analytics prompt below and start.
5. While Analytics is running, click New Session and start **CSV export**, again explicitly selecting challenge/parallel-agents, NOT the Analytics agent's kosuke/chat-* working branch.
6. Capture independent session branch names and starting SHA, screenshots, test results, failures/retries, timestamps and actual usage for both agents.
7. Do not open PRs yet. Wait for both agents to finish, inspect their code and preview, and independently verify tests on their exact commit SHAs.
8. Only after approval, create **two separate PRs** targeting challenge/parallel-agents. Merge them **one at a time**, recheck the second after the first merge, resolve any shared dashboard.tsx conflicts without dropping either feature, and rerun full CI.
9. Verify both Analytics and CSV export together in the final integrated preview. Leave main untouched. Never claim Kosuke recorded QA passed if Delegated Run tools are blocked.
10. For YouTube, show actual concurrent sessions, independent previews, diffs, PRs, real test evidence and limitations. This experiment cannot be described as a speed comparison without equivalent controlled runs.

**Note:** Both tasks may need a small edit in src/components/dashboard.tsx. Keep diffs minimal; when PRs conflict, do not automatically choose one side. Integrate both sets of code intentionally and test again.

## Baseline test commands
- npm test
- npm run typecheck
- npm run build
- npm run test:e2e

Log initial and final results, including environment-only failures. No fabricated data, metrics, credits or recordings. No code or PR merges without explicit approval.
