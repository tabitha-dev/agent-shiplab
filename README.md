<div align="center">

<img src="./src/app/icon.svg" alt="ShipLab lightning bolt logo" width="78" height="78">

# ShipLab

### Build it. Break it. Test it. Ship it.

**An open-source full-stack app for testing what AI coding agents can *actually* deliver.**

From working previews to real GitHub pull requests, ShipLab gives every experiment a reproducible starting point.

[![ShipLab CI](https://github.com/tabitha-dev/agent-shiplab/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/tabitha-dev/agent-shiplab/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-9F8BFF?style=flat-square)](./LICENSE)
[![Node.js 20+](https://img.shields.io/badge/Node.js-20%2B-56CFB2?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Project stage](https://img.shields.io/badge/stage-baseline%20ready-779CF5?style=flat-square)](#project-status)

[Get started](#-quick-start) · [Explore the app](#-meet-the-app) · [Take the challenge](#-the-agent-challenge) · [View source](#-project-structure) · [Watch Tabitha Dev](https://www.youtube.com/@tabitha-dev)

</div>

---

## ✨ Meet the app

ShipLab is a modern, responsive **task and delivery workspace**. It's a working app, not a mockup, and it's intentionally small enough for developers and AI coding agents to understand.

<table>
  <tr>
    <td width="50%">
      <strong>🗂️ Kanban workflow</strong><br><sub>Move tasks between Backlog, In Progress, In Review and Done.</sub>
    </td>
    <td width="50%">
      <strong>📝 Task management</strong><br><sub>Create and delete tasks, update status, assign owners and set deadlines.</sub>
    </td>
  </tr>
  <tr>
    <td>
      <strong>🔎 Find the work that matters</strong><br><sub>Search tasks and filter by project, status or priority.</sub>
    </td>
    <td>
      <strong>📊 Delivery insights</strong><br><sub>See task counts, work in progress and completion rate.</sub>
    </td>
  </tr>
  <tr>
    <td>
      <strong>💾 Real persistence</strong><br><sub>SQLite-backed API, Prisma schema and 12 fictional sample tasks.</sub>
    </td>
    <td>
      <strong>✅ Real verification</strong><br><sub>Vitest unit tests, Playwright browser tests and GitHub Actions CI.</sub>
    </td>
  </tr>
</table>

> [!NOTE]
> **Screenshots and a live-preview link will be added after the platform evaluation.** The repository currently contains the runnable source and tests; no hosted public demo is being claimed.

## 🛠️ Tech stack

| Layer | Built with |
| :-- | :-- |
| Interface | **Next.js App Router**, **React**, **TypeScript**, custom responsive CSS |
| Backend | **Next.js route handlers** for task CRUD |
| Data | **Prisma** + **SQLite** |
| Unit testing | **Vitest** |
| Browser testing | **Playwright** |
| Continuous integration | **GitHub Actions** |

The baseline requires **no paid tools, AI subscriptions or external API keys**.

## 🚀 Quick start

**Requirements:** Node.js **20+**, npm and Git.

**1 · Clone and install**

```bash
git clone https://github.com/tabitha-dev/agent-shiplab.git
cd agent-shiplab
npm install
```

**2 · Set up the local database**

<details>
<summary><strong>macOS / Linux / Git Bash</strong></summary>

```bash
cp .env.example .env
npm run setup
```

</details>

<details>
<summary><strong>Windows PowerShell</strong></summary>

```powershell
Copy-Item .env.example .env
npm run setup
```

</details>

**3 · Start the app**

```bash
npm run dev
```

Open **[localhost:3000](http://localhost:3000)**.

The setup command initializes SQLite and seeds **12 sample tasks** if the database is empty. Running it again won't overwrite existing tasks.

<details>
<summary><strong>🔬 Run the quality checks</strong></summary>

```bash
npm run typecheck   # TypeScript
npm test            # Unit tests
npm run build       # Production build

npx playwright install chromium
npm run test:e2e    # Browser workflow test
```

CI runs these checks automatically on the configured branches and pull requests. Check the **live CI badge above** for the latest main-branch result.

</details>

## 🧪 The agent challenge

**Can an AI coding agent find a real bug, ship working features and prove its changes are safe to merge?**

That's the question this repository was built to answer.

```text
   BASELINE APP           AI AGENT              EVIDENCE
 ┌────────────────┐   ┌────────────────┐   ┌─────────────────┐
 │ Working code   │ → │ Investigate    │ → │ Live preview    │
 │ Repeatable bug │   │ Implement      │   │ Test results    │
 │ Known tests    │   │ Open a PR      │   │ Reviewable diff │
 └────────────────┘   └────────────────┘   └─────────────────┘
```

| Challenge | What the agent must demonstrate | Track it |
| :-- | :-- | :-- |
| **01 · Fix the bug** | Reproduce and repair a deliberately case-sensitive task search | [Issue #2](https://github.com/tabitha-dev/agent-shiplab/issues/2) |
| **02 · Ship a feature** | Add accessible deadline filtering and sorting, with tests | [Issue #3](https://github.com/tabitha-dev/agent-shiplab/issues/3) |
| **03 · Work in parallel** | Build analytics and CSV export in separate branches without conflicts | [Issue #4](https://github.com/tabitha-dev/agent-shiplab/issues/4) |
| **04 · Prove it works** | Collect actual QA artifacts and verify claims against observed behavior | [Issue #5](https://github.com/tabitha-dev/agent-shiplab/issues/5) |

### Start with the broken branch

The main branch stays **working and reusable**. The intentionally seeded bug lives in its **own branch**:

**[↗ Open `challenge/search-regression`](https://github.com/tabitha-dev/agent-shiplab/tree/challenge/search-regression)**

This branch intentionally fails search regression tests, giving the agent an objective problem to solve. A failing test **in the challenge branch** is expected and should not be mistaken for a broken baseline.

See the **[full experiment protocol](./docs/EXPERIMENT.md)** for exact prompts, acceptance criteria, the scoring rubric and the evidence rules.

### What we'll measure

| Engineering quality | Experiment integrity |
| :-- | :-- |
| Typecheck, build and unit-test results | Time elapsed, including retries |
| Browser behavior and responsiveness | Number of prompts and human fixes |
| Clear, focused GitHub pull requests | Credits or charges actually incurred |
| Reproducible results and artifacts | Failures, tradeoffs and limitations |

We will **never report invented test results** or claim a workflow is faster until comparable runs are measured.

## 📁 Project structure

```text
agent-shiplab/
├── src/
│   ├── app/
│   │   ├── api/tasks/        # Read, create, update and delete tasks
│   │   └── page.tsx          # App entry point
│   ├── components/
│   │   └── dashboard.tsx     # Responsive workspace UI
│   └── lib/                 # Task logic, validation and database access
├── prisma/
│   ├── schema.prisma        # SQLite data model
│   └── seed.ts              # Fictional starter tasks
├── tests/
│   ├── unit/                # Fast regression checks
│   └── e2e/                 # Real-browser journey
├── docs/
│   ├── EXPERIMENT.md        # Agent prompts and proof checklist
│   └── KOSUKE_SETUP.md     # Integration and cost/privacy checkpoints
└── .github/workflows/
    └── ci.yml               # Continuous integration
```

## 🎬 Follow the experiment

ShipLab is being built for a **Tabitha Dev** video testing AI-assisted development workflows with real code and real evidence.

- **[YouTube · Tabitha Dev](https://www.youtube.com/@tabitha-dev)** — developer tutorials, hands-on builds and practical AI experiments.
- **[Challenge playbook](./docs/EXPERIMENT.md)** — try the same tasks with your preferred tool.
- **[Kosuke setup guide](./docs/KOSUKE_SETUP.md)** — integration steps and questions to verify before testing.

**Platform evaluation status:** Kosuke PRO activation and the live experiment are **pending**. This project is **vendor-neutral**, not an endorsement, and the results section will be updated **after** real testing. Any future affiliate arrangement will be clearly disclosed alongside recommendations.

## 🔐 Before deploying or connecting tools

> [!WARNING]
> **This is a single-user educational demo, not a production SaaS.** It does **not** include authentication, authorization, rate limiting or tenant isolation. Do not publish its write-enabled API openly or add sensitive information. Use only fictional data and isolated preview environments.

When connecting a GitHub App, grant access to **this repository only** wherever the integration supports it. Never commit credentials or `.env` files. SQLite data in temporary preview sandboxes may disappear between sessions. Read [SECURITY.md](./SECURITY.md) for the security boundaries.

## 💜 Made for developers who verify before they ship

Fork it. Improve it. Test your favorite AI agent against it. And if something breaks, **show the failing test and the fix**.

Created by **[Tabitha Dev](https://github.com/tabitha-dev)** · [Watch on YouTube](https://www.youtube.com/@tabitha-dev) · Distributed under the [MIT License](./LICENSE)

<div align="center">

**Build → Review → Verify → Ship**

⭐ Star this repository if you find the experiment useful.

</div>
