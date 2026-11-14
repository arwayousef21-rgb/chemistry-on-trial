# مهمة الاتزان – THE EQUILIBRIUM MISSION

> اكتشف أسرار التفاعلات… وتحدَّ قوى التغيير!
> *Explore the Secrets of Reactions. Challenge the Forces of Change.*

A bilingual (Arabic RTL / English LTR) adaptive learning platform on **Chemical Equilibrium** for Egyptian secondary-school students.

> **Current status: Stage 3 — M0 (local development setup and CI) complete.**
> Stage 2 (visual foundation) approved at commit `35a77b9`. Synthetic data only. No Cloudflare account, no real student data, no AI API, nothing deployed.
> Plan: `docs/stage-3/MVP-PLAN.md` · Decisions: `content/ARCHITECTURE_DECISIONS.md` (D15–D17).

## Project documents

| File | Role |
|---|---|
| `content/ARCHITECTURE_DECISIONS.md` | Owner-approved decisions; overrides the handoff where they conflict |
| `content/Chemistry_On_Trial_Scientific_Content_REVISED.md` | Sole authority for all scientific content |
| `content/Claude_Project_Handoff.md` | Original implementation brief |
| `public/reference/primary-dashboard-reference.jpg` | Mandatory visual reference |
| `design/design-tokens.md` | Colours, type, radii and shadows sampled from the reference |
| `design/concept-mapping.md` | Concept → objective → question mapping (draft for review) |
| `design/3d-illustration-style-guide.md` | 3D asset style guide and prompts (draft for review) |
| `docs/stage-2/screenshots/` | Stage 2 screenshots and side-by-side comparison with the reference |

## Running locally

Requires Node.js 20 or later. Everything runs on your computer; no Cloudflare account is needed.

```bash
npm install
npm run dev            # design preview only (synthetic data, no API) at http://localhost:5173
npm run dev:full       # full local stack: site + API + local database at http://localhost:8787
npm run typecheck      # type-check the site and the Worker
npm test               # unit tests
npm run test:e2e       # browser tests: API, database and the approved Stage 2 design
npm run db:reset:local # recreate the local database with synthetic data
```

- `http://localhost:8787/api/health` shows whether the local database is reachable.
- **Screenshot baselines** (`tests/e2e/__screenshots__/`) are the approved Stage 2 design. Update them with `npm run test:e2e:update` **only** after the owner approves a visual change.

## Architecture (Stage 3 MVP, zero cost)

| Part | Technology |
|---|---|
| Site + API | Cloudflare Worker (`worker/src/`) serving `dist/` and `/api/*` |
| Database | Cloudflare D1 (SQLite). Migrations in `migrations/`, synthetic seed in `seed/` |
| Configuration | `wrangler.jsonc` (local placeholder database ID until go-live) |
| CI | `.github/workflows/ci.yml`: type check, unit tests, build, browser tests; no secrets, never deploys |

**Student access (from M1):** full name + email + Egyptian mobile number. Students stay signed in on the same device, resume on a new device with email + phone, and can press "Not you?" on shared devices. No passwords, verification or return codes. **Email + phone matching is not identity verification**, so assessments are for learning and research, not high-stakes grading.

Add `?lang=en` or `?lang=ar` to the address to open a specific language. The language switch in the top bar also changes it, and the choice is remembered in the browser.

Repository name: `chemistry-on-trial` (unchanged). Assistant name: EQUI.

Pages: `#/` (student dashboard) and `#/design-system` (all tokens and shared components). Other links open a "later stage" notice.

## Technology

React 18 · TypeScript · Vite · Tailwind CSS · KaTeX (equations, always left-to-right) · Lucide icons · Cairo and Inter fonts (bundled locally) · Vitest.

## Structure

```text
worker/src/     Cloudflare Worker: API router, routes, security headers
migrations/     D1 database migrations
seed/           synthetic development data
tests/e2e/      browser tests and approved screenshot baselines
docs/stage-3/   MVP plan
content/        specification files and decision record
design/         design tokens, concept mapping, 3D style guide (review documents)
docs/stage-2/   screenshots for review
public/
  reference/    mandatory dashboard reference image
  assets/illustrations/{robot,pathways,chemistry,ui,backgrounds}/   3D assets (pending)
src/
  app/          routing
  components/
    ui/         shared building blocks (Card, Button, TitlePill, ProgressRing, Equation, IllustrationSlot…)
    layout/     AppShell, TopNav, PageBackground, LanguageSwitch
    learning/   HeroBanner, PathCard, DiagnosticScoreCard, RecommendationCard
    assistant/  EQUI launcher, strip and panel (interface only)
  data/          data layer (DataService, demo implementation, API client)
  data/synthetic/  synthetic demonstration data
  i18n/         language provider (direction, translations)
  pages/        StudentDashboard, DesignSystemPage, LaterStagePage
  styles/       design tokens and global styles
  translations/ Arabic and English interface text
```
