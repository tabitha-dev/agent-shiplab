# Connecting this repo to Kosuke (after baseline is checked)

**This is an independent evaluation.** Integration and trial entitlements must be verified in your account before making public claims.

1. Confirm your local baseline runs and note its Git commit SHA.
2. Register at [app.kosuke.ai](https://app.kosuke.ai) with the email you intend to use.
3. Ask Kosuke's contact to activate the promised 3 months of PRO on **that account**, and confirm in writing the included sandbox credits, possible overages, automatic renewal/cancellation, and commission payment terms.
4. Install/invite the GitHub integration **only for \`tabitha-dev/agent-shiplab\`**. Do not grant all-repository access unless unavoidable and deliberately approved.
5. If Kosuke asks for a start command, use \`npm install && npm run setup && npm run dev\` with \`DATABASE_URL=file:./dev.db\` (or create \`.env\` from \`.env.example\`). Select a Node.js 20+ runtime.
6. Check the deployed preview shows 12 sample tasks and that you can create, update, filter, and delete one.
7. Run [the experiment](EXPERIMENT.md) on isolated branches. Capture PR links, screenshots, logs, timestamps, sandbox credits, and actual costs.
8. Revoke unused integration permissions and end disposable preview sandboxes after the shoot.

### Promo information to verify with the founder
The creator was told that promo code **\`TABITHA2026\`**, entered into the **optional promo code box after sign-up**, gives referred accounts **$30 credits instead of the ordinary $10** and pays the creator **100% of referred customer payments during their first 3 months**. **These are reported email terms, not independently verified public platform terms.** Confirm validity dates, eligibility, payout thresholds and timing, whether credit is USD sandbox usage, and exactly how a new user applies it.

### Disclosures in any video or post
Disclose near the beginning, in the description, and next to the referral link/code that the creator received complimentary PRO access and may earn referral commissions. Do not portray a demo as an independent benchmark if prompts, testing conditions or failures were withheld.

### Security boundaries
This is a public, single-user teaching application. Do not input credentials, customer data, work files, company code, or real personal information. SQLite sandbox data is disposable and may not persist across restarts. If deploying anywhere public, add authentication and rate limiting first.
