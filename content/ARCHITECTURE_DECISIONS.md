# مهمة الاتزان – THE EQUILIBRIUM MISSION — Architecture Decision Record

**Project owner:** Miss Arwa Yousef
**Purpose:** Record the decisions the project owner has approved after the two original specification files were written, so that the files and the implementation do not conflict.

## Precedence

1. **This file** overrides `Claude_Project_Handoff.md` wherever they conflict (application experience, pathways, accounts, data, assistant, design).
2. **`Chemistry_On_Trial_Scientific_Content_REVISED.md`** remains the sole authority for all chemistry facts, equations, values, examples, scientific activities, and its `TEACHER CONFIRMATION REQUIRED` / `HOLD — NOT FOR STUDENT DISPLAY` labels. Nothing in this file changes scientific content.
3. **`Claude_Project_Handoff.md`** applies wherever this file is silent.

The original specification files are kept unchanged.

---

## D1 — Platform identity
- **Platform name (approved 2026-11-13, replaces the earlier working title "الكيمياء في قفص الاتهام / Chemistry on Trial"):**
  - Arabic interface: **مهمة الاتزان**
  - English interface: **THE EQUILIBRIUM MISSION**
  - Browser title, metadata and README: **مهمة الاتزان – THE EQUILIBRIUM MISSION**
- **Tagline:** اكتشف أسرار التفاعلات… وتحدَّ قوى التغيير! / *Explore the Secrets of Reactions. Challenge the Forces of Change.*
- Module label / subtitle (unchanged): **الاتزان الكيميائي / Chemical Equilibrium**.
- Unchanged: repository name `chemistry-on-trial`; assistant name **EQUI – رفيق الكيمياء الذكي**.
- The original specification files keep the earlier working title; this decision overrides it.

## D2 — Learning structure
- Introductory **Unit 0** (dynamic equilibrium, scientific spec §2) followed by the six units, in the scientific specification's order. Axes are shown as labels.
- The first complete learning slice to be built (in a later stage) is **Unit 0 + Unit 1**.

## D3 — Three adaptive learning pathways *(overrides handoff §3 and §6 "exactly two pathways")*

| Pathway | Arabic | Colour | Illustration | Purpose |
|---|---|---|---|---|
| Remedial | المسار العلاجي | Blue `#1866B4` | Books | Complete step-by-step learning and concept rebuilding from the beginning |
| Corrective & Reinforcement | المسار التصحيحي والداعم | Green `#00845A` | Target | Specific gaps, misconceptions and targeted reinforcement |
| Enrichment | المسار الإثرائي | Purple `#784EAE` | Rocket | Advanced applications, investigations, higher-order challenges |

## D4 — Initial pathway thresholds
- Overall diagnostic score **< 50 %** → Remedial; **50 % to < 80 %** → Corrective & Reinforcement; **≥ 80 %** → Enrichment.
- Thresholds are teacher-configurable, validated (lower < upper, within 0–100), versioned, and apply only to future recommendations.
- Each pathway decision permanently records the score, the thresholds used and the settings version.

## D5 — Concept-level analysis and targeted support
- The initial pathway is determined by the overall score.
- Concept and objective weaknesses generate **targeted recommendations** without changing the main pathway.
- An Enrichment student with a weak concept receives a recommended corrective activity and keeps the Enrichment pathway.
- A Remedial student who has mastered a concept may receive optional review and a short mastery check.
- **Concept mastery criteria (weak / developing / mastered) and minimum question counts are not yet decided.** A concept → objective → question mapping is prepared first; criteria are then proposed for the owner's review.

## D6 — Pathway transitions
- **No automatic pathway transitions** until the owner approves explicit educational rules.
- Teacher overrides are always possible; each records the teacher, time, previous and new pathway, and reason.

## D7 — Assessment
- Diagnostic pre-test (form A), continuous formative assessment, parallel post-test (form B: same objectives, new questions of comparable difficulty).
- Research indicators: raw pre/post scores and concept-level raw gains. **Normalised gain and other indicators are not final** until reviewed with the research supervisor.

## D8 — EQUI – رفيق الكيمياء الذكي *(replaces "ARWA AI" in the handoff; implementation superseded by D16)*
- Roles: platform guide and educational tutor, in Arabic and English (replies in the student's language).
- **Completely disabled during the formal pre-test and post-test.**
- During formative learning: guided hints, explanations and feedback; does not simply reveal answers where independent thinking is the goal.
- Uses approved content only. Conversations are **not stored by default**; retention may be made configurable for research.
- Live AI integration requires a later approval; a labelled demo mode is used until then.

## D9 — Accounts, roles and data *(overrides handoff §2; registration, sign-in and backend details superseded by D15)*
- Students register with full name, email, password and a teacher-provided class code.
- Teacher and administrator roles are separate and protected; students can never grant themselves elevated roles.
- Proposed backend: Supabase (planning only — **no project created**).
- **No real student data** until privacy, consent, retention and institutional requirements are reviewed. Development uses synthetic data only.
- No hosting region is assumed; options are presented before any production database is created.
- Educator dashboard with individual and class reports, Excel (.xlsx) and CSV export.

## D10 — Scientific content approval
- Content items and questions carry a status: approved, pending confirmation, or on hold (initialised from the scientific specification's labels).
- Claude may draft lessons, questions and activities in Arabic and English **from approved scientific content only**; all drafts are pending and hidden from students until approved.
- Approval is tied to the exact wording; any later edit requires re-approval.

## D11 — Simulations and virtual laboratories
- **Simulations:** conceptual exploration and manipulation of scientific variables.
- **Virtual laboratories:** guided experimental procedures, apparatus, observations and data interpretation.
- Both must be interactive and educationally meaningful.

## D12 — Visual design
- The reference image `public/reference/primary-dashboard-reference.jpg` is a mandatory specification for **all** screens, in Arabic RTL and English LTR at equal quality.
- Fonts: Cairo (Arabic), Inter (English); equations rendered with KaTeX, always left-to-right.
- Accessibility adjustments: green buttons `#00845A`; progress ring `#049870` with `#04AC7C` as highlight.
- Main mascot and educational illustrations must be glossy, dimensional 3D-style assets with transparent backgrounds. SVG is used only for simple interface icons and decorative elements. A style guide and prompts are prepared before assets are generated.

## D13 — Process
- Work proceeds in stages, each requiring explicit approval. No deployment, external account creation, live AI integration or real data collection without explicit approval.

## D14 — Stage 2 approved and complete (2026-11-13)
The owner formally approved Stage 2 at commit `35a77b9`. Approved:
- Platform branding: **مهمة الاتزان – THE EQUILIBRIUM MISSION** (D1).
- Arabic and English dashboard designs.
- The three pathway cards and their colours (D3).
- The six original 3D illustrations (Blender renders; provenance in `public/assets/illustrations/assets-manifest.json`).
- The EQUI assistant character.
- Desktop, tablet and mobile responsive layouts.
- Typography, spacing and the visual design system (`src/styles/tokens.ts`, `design/design-tokens.md`).

Not yet authorised at that time: Stage 3 implementation and merging into `main`. See D15–D17.

## D15 — Stage 3 MVP architecture: zero cost, simple student access (2026-11-13)
**Zero-paid-service requirement.** No paid subscriptions, APIs, AI models, hosting, databases, email services or paid add-ons. No credit card or billing account. Free tiers are treated as subject to change; the data layer stays portable.

**Platform:** Cloudflare (free plan, no card): static site + server API (Workers) + D1 database (SQLite), at a free public address (`*.workers.dev` or `*.pages.dev`). The site must work from students' homes, the owner's home and the university. Supabase Free, Firebase Spark and the school-server design are **not used** (Firebase Spark cannot grade on the server or back up for free; Supabase Free pauses after inactivity).

**Student registration and access (exact flow):**
1. *First registration* — the student provides only **full name, email address and Egyptian mobile number** (11 digits starting 010/011/012/015). One unique student record is created and a persistent device session starts in that browser.
2. *Same device* — the saved device session recognises the student automatically, restores the profile and progress, and never asks them to register again.
3. *New device* — a **"لدي حساب بالفعل / I already have an account"** option asks for **email address and phone number only**. If both match one existing record, that record is resumed with its progress. If not, a clear error suggests checking the details or contacting the teacher. **The resume process never creates a record.**
4. *Shared devices* — a visible **"لست أنت؟ / Not you?"** button clears the local session and returns to the welcome screen.
5. **No passwords, no email verification, no return codes** for students. No other personal information is collected.
6. Email is unique per record; a phone number already in use is flagged for the teacher (siblings may share a phone).

**Important limitation:** matching email + phone **is not identity verification**. Anyone who knows both can resume that record, and anyone can register with false details. Assessments are therefore for **learning and research purposes under supervision, not high-stakes formal grading**.

**Data protection:** the database is reachable only through the server API. The public interface never returns another student's record. Lookups during resume return only "match / no match", never record details. Official answer keys stay on the server. The **teacher account is separately protected** (passphrase-based session; method finalised in M1/M4).

**Teacher exports:** Excel (.xlsx) and CSV with name, email, phone, registration and participation, pre/post results, pathway, activity progress and concept performance; plus a coded-ID research export without personal details. Regular Excel exports form part of the backup routine, alongside D1 Time Travel (7-day restore).

**Development** uses synthetic data only, running locally and in CI without any Cloudflare account. Deployment requires the owner's explicit approval.

## D16 — EQUI as a content-based assistant (2026-11-13)
EQUI is a **content-based learning assistant, not a generative AI model**. It runs in the browser, searches only **approved** learning materials (Arabic and English, with glossary-based term matching), shows approved passages with their source reference, gives pre-authored definitions, examples and step-by-step hints, recommends lessons and activities, helps with navigation, and clearly says when the approved materials do not cover a question (referring the student to the teacher). Pending and on-hold content is never included. EQUI is unavailable during official pre-tests and post-tests. No paid AI API is connected.

## D17 — Stage 3 milestone authorisation
M0 (local development setup and CI, synthetic data, no external accounts, no deployment) is authorised. Later milestones and any deployment or merge into `main` each require explicit approval.

