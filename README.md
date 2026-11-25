# NexusHQ Platform

Frontend marketing and client portal platform for **NexusHQ** — *The Command Centre for Modern Mentors*.

## Stack & Architecture

- **Core Framework:** [Astro v6](https://astro.build) (Static export + Vercel deployment)
- **UI Components:** React 19 Islands + Tailwind CSS v4 + Framer Motion
- **Icons:** Lucide React
- **Brand Identity:** 3D Hex Shield Emblem (SVG Vector System)
- **Toolchain:** TypeScript 6, pnpm v10, ESLint v10, Prettier v3, Husky
- **Testing:** `node:test` unit tests, Playwright E2E

---

## Local Development

1. **Clone & Setup:**
   ```bash
   git clone https://github.com/fardanahmed/nexushq.git
   cd nexushq
   pnpm install
   cp .env.example .env.local
   ```

2. **Start Development Server:**
   ```bash
   pnpm dev
   ```

3. **Verify Environment Variables:**
   | Variable | Required | Purpose |
   | --- | --- | --- |
   | `PUBLIC_BACKEND_API_URL` | no | Backend base URL (default in `.env.example`: `http://localhost:5000`). Unset: content falls back to built-in mock data. |
   | `BACKEND_API_URL` | no | Server-side-only override of the URL above. |
   | `PUBLIC_R2_PUBLIC_URL` | no | Cloudflare R2 public URL for images; falls back to `/assets`. |

4. **Run with the backend (optional):**
   In the `nexushq-backend` repo run `pnpm install && pnpm dev` (API on port 5000, CORS allows `http://localhost:4321`, the Astro dev URL). Start the site with `pnpm dev`. Without the backend the site still renders, but the forms will show an error.

---

## Project Structure

```text
nexushq/
├── .github/
│   ├── ISSUE_TEMPLATE/     # Standard bug report and feature request templates
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/ci.yml    # GitHub Actions CI workflow (Node 22 + pnpm 10)
├── public/                 # Static assets (logo.svg, favicon.svg, compressed WebP images)
├── src/
│   ├── components/
│   │   ├── home/           # Homepage feature sections (Hero, TrustBar, HowItWorks, etc.)
│   │   ├── shared/         # Navbar, Footer, Logo
│   │   └── ui/             # Reusable UI primitives (button.tsx, card.tsx)
│   ├── layouts/            # Layout templates (Layout.astro)
│   ├── lib/                # Utilities and Content API client
│   ├── pages/              # Astro routes (index, about, pricing, features, contact)
│   ├── styles/             # Global Tailwind v4 styles & theme tokens
│   └── types/              # TypeScript interface definitions
└── tests/                  # Playwright E2E testing suite
```

---

## Git & PR Workflow Guidelines

We strictly follow a structured Git & GitHub workflow:

`Milestone → Issue → Feature Branch → Commits → Pull Request → Squash-Merge`

- **Branch Naming:** `feat/`, `fix/`, `chore/`, `refactor/`, `security/`, `docs/`
- **Conventional Commits:** `feat:`, `fix:`, `chore:`, `docs:`, `security:`, `refactor:`
- **PR Requirement:** Every PR must reference an issue (`Closes #<number>`) and pass all pre-commit hooks and CI runs before merge.

---

## Quality Assurance & Testing

- **Typecheck & Astro Check:** `pnpm typecheck`
- **Linter & Formatting:** `pnpm lint` / `pnpm format:check`
- **Unit Tests:** `pnpm test`
- **Production Build:** `pnpm build`
- **End-to-End Tests:** `pnpm test:e2e`
