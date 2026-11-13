# مهمة الاتزان – THE EQUILIBRIUM MISSION

> اكتشف أسرار التفاعلات… وتحدَّ قوى التغيير!
> *Explore the Secrets of Reactions. Challenge the Forces of Change.*

A bilingual (Arabic RTL / English LTR) adaptive learning platform on **Chemical Equilibrium** for Egyptian secondary-school students.

> **Current status: Stage 2 — visual foundation.**
> Synthetic demonstration data only. No backend, no accounts, no real student data, no live AI, no deployment.

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

Requires Node.js 20 or later.

```bash
npm install
npm run dev        # development server
npm run build      # type-check and production build into dist/
npm run preview    # serve the production build
npm test           # automated checks
```

Add `?lang=en` or `?lang=ar` to the address to open a specific language. The language switch in the top bar also changes it, and the choice is remembered in the browser.

Repository name: `chemistry-on-trial` (unchanged). Assistant name: EQUI.

Pages: `#/` (student dashboard) and `#/design-system` (all tokens and shared components). Other links open a "later stage" notice.

## Technology

React 18 · TypeScript · Vite · Tailwind CSS · KaTeX (equations, always left-to-right) · Lucide icons · Cairo and Inter fonts (bundled locally) · Vitest.

## Structure

```text
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
  data/synthetic/  synthetic demonstration data
  i18n/         language provider (direction, translations)
  pages/        StudentDashboard, DesignSystemPage, LaterStagePage
  styles/       design tokens and global styles
  translations/ Arabic and English interface text
```
