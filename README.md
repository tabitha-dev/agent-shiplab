# ShipLab 🚀
**Build. Review. Ship.** A real, open-source full-stack task manager built to compare AI coding-agent workflows with measurable evidence.

[![CI](https://github.com/tabitha-dev/agent-shiplab/actions/workflows/ci.yml/badge.svg)](https://github.com/tabitha-dev/agent-shiplab/actions/workflows/ci.yml)

> **Status:** v0.1 baseline implementation. This repo is a controlled educational experiment — **not** a Kosuke endorsement and **not** evidence that any agent has passed our challenges.

## What is this?
ShipLab is a responsive, data-backed release dashboard with four task stages (Backlog, In Progress, In Review, Done). You can add tasks, assign people and priorities, set deadlines, filter/search projects, move work across stages, and delete tasks. Data persists in local SQLite. The project is intentionally **vendor-neutral**: you can run it locally, then try any capable agent or preview platform.

**Stack:** Next.js App Router, React, TypeScript, CSS, Prisma, SQLite, Vitest, and Playwright. No paid services or API keys required for the baseline.

## Quick start

Requires **Node.js 20+**, npm, and a Git checkout.

~~~bash
git clone https://github.com/tabitha-dev/agent-shiplab.git
cd agent-shiplab
npm install
cp .env.example .env
npm run setup
npm run dev
~~~

On Windows PowerShell use **\`Copy-Item .env.example .env\`** instead of **\`cp\`**.

Open **http://localhost:3000**. The setup command safely creates the database and seeds 12 sample tasks **only when the database is empty**.

### Test your environment

~~~bash
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
~~~

> E2E tests create and delete temporary tasks. The demo is single-user and has **no authentication**. Never publish it on the public internet with write access or real user information. An agent preview should be isolated and disposable.

## Repository tour
| Path | Purpose |
| --- | --- |
| \`src/components/dashboard.tsx\` | Responsive application and CRUD interactions |
| \`src/app/api/tasks\` | JSON API for viewing, creating, updating, and deleting tasks |
| \`src/lib/task-logic.ts\` | Search, filters, status totals, completion metrics |
| \`prisma/schema.prisma\` | SQLite schema |
| \`prisma/seed.ts\` | Non-destructive sample data |
| \`tests/unit\` | Regression tests for filtering and validation |
| \`tests/e2e\` | Real-browser user journey |
| \`docs/EXPERIMENT.md\` | Agent challenge protocol and measurement rubric |
| \`docs/KOSUKE_SETUP.md\` | Kosuke setup and cost/privacy checkpoints |

## Try the agent challenge
Start with the known-good main branch and follow [the experiment protocol](docs/EXPERIMENT.md). Each challenge gets its own branch and pull request. The intentionally broken search-filter exercise is **not** merged into main. That preserves a working subscriber experience.

## Demo data and limitations
- The 12 tasks, people, and projects are **fictional**.
- SQLite is local and may be ephemeral in cloud sandboxes. Do not use it for production.
- There is no sign-in, authorization, rate limiting, audit trail, or multi-tenant isolation.
- Search and priority/project filters, stage transitions, CRUD, and completion metrics are baseline functionality; CSV export and additional analytics are experimental challenges.
- Prices, claimed time savings, and product capabilities are not endorsed or verified by this repository. See setup guide.

## For subscribers
Clone the project, reproduce the baseline, and follow the prompts in \`docs/EXPERIMENT.md\`. Share screenshots **with tests and caveats**, not just green checkmarks.

Built by [Tabitha Dev](https://www.youtube.com/@tabitha-dev). MIT licensed. Contributions and bug reports are welcome.
