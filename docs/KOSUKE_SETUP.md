# Kosuke × ShipLab: First run guide

This setup guide is for the **real, recorded** evaluation of Kosuke with [ShipLab](https://github.com/tabitha-dev/agent-shiplab). Keep the repo public and fictional; **do not connect personal or company repositories**.

**Status:** The creator reports that the promotional PRO account was activated. Account-level plan, renewal and credit settings must still be checked in the Kosuke UI before starting paid compute. No Kosuke test results are claimed here.

## Step 1. Confirm your PRO plan and spending controls

1. Open [Kosuke](https://app.kosuke.ai) and sign in to your existing workspace.
2. Open **Settings → Workspace → Billing**. Confirm it actually says **PRO**, inspect the promotion period and renewal/cancellation terms shown for **your** account.
3. Under **Usage past your plan**, leave **Bill me at list rates once my included usage is spent** **off** while evaluating. If it is already on, turn it off; only change spending settings with the owner's approval.
4. Open **Settings → Workspace → Usage** and record the included credit allowance, amount used and renewal date before the first sandbox. A standard paid PRO plan publicly advertises **$250 sandbox usage per month**, but promotional entitlements may differ.
5. Choose the smallest sandbox size that works when configuring the project. Kosuke reports that the **first deploy initially uses XLarge** before choosing a tier. Monitor usage; project previews, sessions, warm-up and deploys all consume credits.
6. Confirm that your Claude Code or Codex subscription is available for agent messages. Kosuke's sandbox billing is separate from your AI-provider plan.

**Never paste account passwords, access tokens, 2FA codes, billing information or full authentication screenshots into GitHub or chat.**

## Step 2. Connect exactly one repository

In Kosuke, go to **Projects → + → Import Project**.

1. If prompted, choose **Connect GitHub**, and complete the GitHub authorization in your browser.
2. If the repo is greyed out, choose **Install App** beside it. In the GitHub installation picker, choose **Only select repositories** and select only **`tabitha-dev/agent-shiplab`**. Do not grant blanket access to all repositories.
3. Find **`tabitha-dev/agent-shiplab`** in Kosuke and select **Import Project**.
4. Under **Settings → You → AI Providers**, connect Claude Code or Codex via the official sign-in flow if not already connected. The first Deploy requires working provider access.
5. At this stage, **leave the project on the default `main` branch**. This establishes a clean baseline before the deliberately defective challenge.

If Kosuke reports the GitHub App is installed but the repository does not appear, reopen the GitHub Connection prompt and check the app's selected-repo list.

## Step 3. Deploy and verify the working baseline

Kosuke's initial Deploy may infer the app configuration. If it asks for details or gets them wrong, these are the known-good settings:

| Setting | Value |
| --- | --- |
| Repository working directory | `.` (root) |
| Node.js | 20+ (22 recommended) |
| Sandbox | Small or Medium if sufficient |
| App setup script | `npm install --no-audit --no-fund && npm run setup` |
| Start command | `npm run dev` |
| Service port | `3000` |
| Exposure | Preview |
| Health route | `/` |
| Environment variable | `DATABASE_URL=file:./dev.db` |
| Optional environment variable | `NEXT_TELEMETRY_DISABLED=1` |

Use the **Services**, **Environment**, and **Sandbox** tabs in project settings to correct values, then **Save** and **Redeploy**. Avoid importing or exporting complete Kosuke settings into Git: exported configurations can contain secrets.

Verify the main Preview:
- [ ] Home page renders without an error banner
- [ ] Shows the ShipLab dashboard and 12 fictional tasks
- [ ] Create a temporary task and change its status
- [ ] Search for `NAVIGATION` finds `Investigate navigation overflow`
- [ ] Delete the temporary task
- [ ] Observe the browser console and service logs for errors
- [ ] Save a screenshot of the working baseline

**Caution:** The demo is single-user with no authentication. Do not advertise or distribute an exposed write-enabled preview URL, and never enter real information.

## Step 4. Set the challenge branch (without touching working main)

After the baseline Preview is healthy:

1. Open the project **Settings → Advanced → Branch Overrides**.
2. Set **Branch sessions from** to `challenge/search-regression`.
3. Set **Open PRs against** to `challenge/search-regression` **as well**.
4. Save both settings and **Redeploy**. If Kosuke is warming sandboxes, wait for the warm-up to finish before starting a session.
5. Confirm the new Preview/revision reflects the challenge branch and the case-sensitive search bug (try uppercase `NAVIGATION`).
6. Confirm **do not target `main`**. Both start and PR target must point at the challenge branch for the first benchmark.

The challenge branch has an **intentional failing unit test**. That is the experiment's starting state, not a failure of the working `main` branch. Do not merge the challenge branch into `main`.

> When finished with Challenge A, change **both** branch overrides back to `main`, redeploy, and wait for warm-up before starting the next feature experiment.

## Step 5. Ask the agent to fix the bug

Open **New Session** after the branch override and choose the desired model. **[Copy the exact first prompt](FIRST_AGENT_PROMPT.md)** into the session.

Keep the full original prompt and all later corrections. Check the branch before the agent begins work. Review the Preview and the diff, then create a GitHub PR **against `challenge/search-regression`**. Do not auto-merge.

Save all authentic evidence in the recording log. A successful preview alone is not a verified fix.

## Step 6. Report actual outcomes

Use **[the results template](RESULTS_TEMPLATE.md)** to collect measured time, test results, model, PR links, sandbox usage, retries and accessibility notes. Preserve real failures; avoid invented results.

The next experiments are described in [EXPERIMENT.md](EXPERIMENT.md): deadline sorting, parallel tasks, and QA evidence.

## Promo code and creator disclosure

The creator's email agreement says new eligible users who enter **`TABITHA2026`** in the optional promo-code box while creating their first workspace receive **$30 trial credits instead of $10**, and the creator earns a share of referred users' early payments. The publicly documented trial-credits mechanism matches the $10/$30 amounts, but the **code's current validity, date limits and affiliate payout rules must be confirmed with the founder**.

If a YouTube video is produced, disclose complimentary PRO access and possible referral earnings clearly **near the start of the video, in the description, and beside the referral offer**. The promotion must not influence the test scoring or hide drawbacks.

## Official references

- [Kosuke quickstart](https://docs.kosuke.ai/get-started/quickstart)
- [Import a repository](https://docs.kosuke.ai/set-up/import-a-repository)
- [Project settings and branch overrides](https://docs.kosuke.ai/set-up/project-settings)
- [Plans, credits, rates and overages](https://docs.kosuke.ai/workspace/plans-and-billing)
- [AI provider subscriptions](https://docs.kosuke.ai/workspace/ai-providers)
