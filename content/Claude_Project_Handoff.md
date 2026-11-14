# THE EQUILIBRIUM MISSION — مهمة الاتزان
## Claude Code Project Handoff — CURRENT SOURCE OF TRUTH (updated 2026-11-14)

> **Read this section first.** It describes the project as it stands now.
> The **original implementation brief** (written before the owner's later decisions) is kept **unchanged** in the appendix at the end of this file. Where the appendix conflicts with this section or with `content/ARCHITECTURE_DECISIONS.md`, **this section and the decision record win**.
> **All chemistry** comes only from `content/Chemistry_On_Trial_Scientific_Content_REVISED.md`.

---

## 1. Project purpose

- **What:** a bilingual (Arabic RTL / English LTR), adaptive, inquiry-based learning platform for the **Chemical Equilibrium** unit.
- **Who:** Egyptian third-year secondary-school students. **Owner:** Miss Arwa Yousef (teacher and researcher).
- **Research:** an educational research project (Design-Based Research). It needs a diagnostic pre-test, adaptive pathways, formative assessment, a parallel post-test, learning gains, and teacher Excel exports.
- **Platform name:** Arabic interface **مهمة الاتزان**; English interface **THE EQUILIBRIUM MISSION**; browser title and README **مهمة الاتزان – THE EQUILIBRIUM MISSION**.
- **Tagline:** اكتشف أسرار التفاعلات… وتحدَّ قوى التغيير! / *Explore the Secrets of Reactions. Challenge the Forces of Change.*
- **Module subtitle:** الاتزان الكيميائي / Chemical Equilibrium.
- **Unchanged names:** the repository `chemistry-on-trial`; the assistant **EQUI – رفيق الكيمياء الذكي**.

## 2. Source files — exact names and locations (do not rename, move or rewrite)

| File | Role | Status |
|---|---|---|
| `content/Chemistry_On_Trial_Scientific_Content_REVISED.md` | **Sole authority for all scientific content.** Holds 12 `Teacher confirmation required` items and 3 `HOLD` sections; §15 lists 42 open teacher decisions | Owner-supplied. **Never edited.** git blob `b68e253e` |
| `content/ARCHITECTURE_DECISIONS.md` | Decision record D1–D18 (overrides this file's appendix where they conflict) | Current |
| `content/Claude_Project_Handoff.md` | This file (current state + original brief as appendix) | Current |
| `public/reference/primary-dashboard-reference.jpg` | Mandatory visual reference | Approved |
| `design/concept-mapping.md` | 35 concepts → objectives → question slots → misconceptions → activities | **Draft, awaiting owner approval** |
| `design/3d-illustration-style-guide.md`, `design/design-tokens.md` | Visual system documentation | Approved with Stage 2 |
| `docs/stage-3/MVP-PLAN.md` | Stage 3 MVP plan and milestones | Current |

## 3. Approved Stage 2 visual design — must be preserved

- **Approved at commit `35a77b9`** (D14). Covers: the Arabic/English dashboards; the three pathway cards and colours; the six original 3D illustrations; the EQUI character; the desktop, tablet and phone layouts; typography, spacing and design tokens.
- **Colours:** Remedial blue `#1866B4`; Corrective & Reinforcement green `#00845A`; Enrichment purple `#784EAE`; navy top bar `#183660`; score ring `#049870` with `#04AC7C` highlight.
- **Fonts:** Cairo (Arabic) and Inter (English), bundled with the site. Equations use KaTeX, always left-to-right.
- **Tokens** live in `src/styles/tokens.ts`. 3D asset registry: `src/assets/illustrations.ts`. Blender sources: `design/3d-source/`.
- **The only approved change since `35a77b9`:** the top-bar "خروج / Exit" placeholder became **"لست أنت؟ / Not you?"** (M1). The footer label changed to "Development preview".
- **Automatic protection:** `tests/e2e/stage2-design.spec.ts` checks the layout strictly and compares screenshots with the baselines in `tests/e2e/__screenshots__/`. **Never update the baselines without the owner's approval.**

## 4. Settled decisions — do not reopen (details in `content/ARCHITECTURE_DECISIONS.md`)

- **Zero-cost requirement (D15):** no paid subscriptions, APIs, AI models, hosting, databases, email services or add-ons. No credit card or billing account. No trials that convert to paid plans. Free tiers are assumed to be changeable, so the data layer stays portable.
- **Architecture (D15):** Cloudflare free plan.
  - **Implemented now:** one **Cloudflare Worker** serves the built site (`dist/`, as static assets — the role Pages would play) and the API under `/api/*`, with a **D1** database (SQLite).
  - **Not used:** Supabase, Firebase and paid AI.
  - **Free public address:** `*.workers.dev` or `*.pages.dev`, chosen at go-live.
- **Student registration and access (D15):**
  - **First visit:** **full name, email, Egyptian mobile number** (010/011/012/015, 11 digits) plus a consent tick. Creates **one** record and starts a persistent device session.
  - **Same device:** recognised automatically.
  - **New device:** **"لدي حساب بالفعل / I already have an account"** asks for **email + phone only**. A match resumes that record; no match shows a clear error ("check details or contact the teacher"). **Resuming never creates a record.**
  - **Shared devices:** **"لست أنت؟ / Not you?"** clears the local session and returns to the welcome screen.
  - **No passwords, no email verification, no return codes** (return codes were removed completely). No other personal data.
  - **Email + phone is NOT identity verification.** Assessments are for **learning and research under supervision, not high-stakes formal grading**.
- **Teacher access (D18):** **one strong password only**: no Google sign-in, no authenticator app, no extra steps.
  - Stored as the server secret `TEACHER_PASSWORD` (local: git-ignored `.dev.vars`; go-live: `npx wrangler secret put TEACHER_PASSWORD`). **Never in frontend code or GitHub.**
  - A sign-in lasts 12 hours. Attempts are limited to 5 per 15 minutes per address. The dashboard is at `#/teacher`.
- **Three pathways (D3):** Remedial (blue, books), Corrective & Reinforcement (green, target), Enrichment (purple, rocket).
- **Thresholds (D4):** pre-test score **< 50% → Remedial; 50% to < 80% → Corrective & Reinforcement; ≥ 80% → Enrichment**.
  - Teacher-configurable, validated (lower < upper), versioned.
  - Every pathway decision stores the score, the thresholds used and the settings version.
- **Concept-level support (D5):** weak concepts trigger targeted recommendations **without** changing the main pathway.
- **Pathway changes (D6):** **no automatic pathway transitions until the owner approves explicit rules.** Teacher overrides are always allowed, with a recorded reason.
- **Assessment (D7):** pre-test (form A), formative checks, parallel post-test (form B: same objectives, new questions, comparable difficulty). Research measures: raw pre/post scores and per-concept raw gains. **Normalised gain is not final** until reviewed with the supervisor.
- **EQUI (D8, D16):** a **content-based assistant, not generative AI**.
  - Searches **approved** materials only, in the browser, and shows sources.
  - Gives pre-authored definitions, examples and step-by-step hints; recommends activities; helps with navigation.
  - Says when something is not covered. **Off during official pre-tests and post-tests.** No paid AI API.
- **Scientific content approval (D10):** every item is approved, pending or on hold. Claude may **draft** content **from approved scientific content only**; drafts stay **pending and hidden from students** until the owner approves them. Approval is tied to the exact wording.
- **Simulations vs virtual labs (D11):**
  - **Simulations:** conceptual exploration of variables.
  - **Virtual labs:** guided procedure, apparatus, observations, data interpretation.
- **Data:** synthetic data only during development. No real student data until the owner approves.
- **Process (D13, D17):** each milestone needs explicit approval. **No deployment, no merge into `main`, no account creation** without explicit approval.

## 5. Required Chemical Equilibrium learning unit — content status

**Legend:**
- **APPROVED SOURCE** = in the scientific specification without a flag.
- **PENDING** = in the specification but flagged `TEACHER CONFIRMATION REQUIRED`.
- **HOLD** = flagged `HOLD — NOT FOR STUDENT DISPLAY`.
- **DRAFTED** = Claude has drafted it; awaiting the owner's approval.
- **NOT CREATED** = does not exist yet.

**No lesson text, question, explanation, feedback text, hint or EQUI entry has been written yet.** Only the concept mapping draft exists.

| # | Topic (spec section; code unit) | Approved source material | Pending / on hold in the spec | Drafted (awaiting approval) | Not yet created |
|---|---|---|---|---|---|
| 1 | **Dynamic Equilibrium** (§2; Unit 0) | Reversible reactions; dynamic nature; equal rates ≠ equal concentrations; dynamic-equilibrium activity requirements (§2.4) | Closed-system wording (#3); activity and qualitative rate graph approval (#7, #8); reversible-reaction opening wording (#33); contrast with irreversible reactions (#38) | Concept mapping `U0.*` (4 concepts) | Lessons, questions, feedback, hints, simulation A1, EQUI entries |
| 2 | **Le Chatelier's Principle** (§3; Unit 1) | Principle; concentration-shift table; molecular model replacing the water-vessel analogy; concentration lab requirements | — | `U1.*` (4 concepts); A2 proposed as a simulation | Lessons, questions, feedback, hints, A2, EQUI entries |
| 3 | **Law of Mass Action and Reaction Rates** (§4; Unit 2) | FeCl₃ + 3NH₄SCN ⇌ Fe(SCN)₃ + 3NH₄Cl; r_f, r_b; K_c = k_f/k_b; rate-graph requirements; "deeper/paler red" model | Colour wording (#21); FeCl₃ model note (#35). **HOLD:** HI concentration–time graph (#1, #22, #42) | `U2.*` (6 concepts) | Lessons, questions, FeCl₃ virtual lab A3, rate-graph activity, EQUI entries |
| 4 | **Equilibrium Constant K_c** (§5–6; Unit 3) | General expression and construction steps; omission of pure solids/liquids; examples A–C; reversal and multiplication rules | Solids/liquids wording (#4); state-symbol glossary incl. (v) (#5); meaning of large/small K_c (#10); reversal/multiplication examples (#26). **HOLD:** both HI numerical examples (K_c ≈ 50 and 55.16), equilibrium check (#16, #27). **No approved numerical K_c example exists** | `U3.*` (6 concepts) | Lessons, questions, K_c builder A5; calculator A6 stays held |
| 5 | **Effect of Temperature** (§7; Unit 4) | Exothermic/endothermic rules; shift table; temperature changes K; ammonia example (ΔH = −92 kJ); NO₂/N₂O₄ observations | Explanation of why temperature changes K (#6); three-position control (#9); "+Heat" with ΔH (#36); 0 °C "colourless" vs "almost colourless" (#37); temperature vs rate wording (#24); sign of ΔH (#25) | `U4.*` (4 concepts) | Lessons, questions, NO₂/N₂O₄ virtual lab A7, EQUI entries |
| 6 | **Pressure, Volume and K_p** (§8; Unit 5) | Gas-mole rules; ammonia and CO/NO₂ examples; P_total = 2 + 5 + 7 = 14 atm; K_p expression; **K_p = 20** (N₂/O₂/NO₂) | Pressure–volume reasoning (#18–20); K_c/K_p units (#11); rounding and tolerance (#12); HCl worked question and conditions (#13, #14, #29); phase step in the K_p builder (#28); gas added at constant volume (#39) | `U5.*` (7 concepts) | Lessons, questions, piston simulation A8, K_p builder/calculator A9, EQUI entries |
| 7 | **Effect of Catalysts** (§9; Unit 6) | Alternative pathway; lower activation energy; both rates increase; K and position unchanged; energy-profile requirements | Equal lowering of both barriers wording (#23); SO₃ example's purpose (#15); which reaction the simulation names (#32) | `U6.*` (4 concepts) | Lessons, questions, catalyst explorer A10, EQUI entries |

**Content outside the seven topics**

| Item | Approved source | Pending | Drafted | Not yet created |
|---|---|---|---|---|
| Misconceptions M1–M18 | §11 | — | Linked in the concept mapping | Comparison activities |
| Extra reactions (§10) | Listed in the spec | **All five need approval** (#17, #31) | — | — |
| Arabic glossary (§14) | Draft in the spec | **Whole glossary** (#2) | — | — |
| Assessment blueprint | §12 (question types, required fields, what must not be assessed) | — | — | **Pre-test form A, post-test form B, formative checkpoints, retests, answer keys, feedback texts — none written** |
| Concept mastery criteria (weak/developing/mastered) | — | Owner decision | — | **Not proposed yet** (to follow approval of the concept mapping) |
| Pathway content (Remedial / Corrective / Enrichment) | Pathway purposes (D3) | — | Dashboard card text (provisionally approved; scientific wording to be reviewed) | All pathway lessons, activities and challenges. **Enrichment needs an owner-approved set of reactions and values (#31)** |
| EQUI knowledge base | D16 design | — | — | **Not created** (definitions, explanations, hint ladders, comparisons, platform help) |
| Simulations and virtual labs A1–A10 | §13 requirements | A1 (#7), A7 (#9, #37), A10 (#15, #32); **A4 and A6 on HOLD** | Classification proposed in the concept mapping | **None built** |
| Teacher dashboard | D9 requirements | — | — | Built so far: password sign-in + student register only. **Not built:** analytics, overrides, threshold settings, Excel/CSV/research export |
| Student welcome and consent wording | — | — | **Drafted** in `src/translations/{ar,en}.ts` (welcome, consent, privacy note) | Final consent and retention wording from the owner or institution |

## 6. Implementation status

| Milestone | Scope | Status |
|---|---|---|
| Stage 1–2 | Audit; visual foundation; 3D assets; branding | ✅ Approved (D14, `35a77b9`) |
| **M0** | Local Worker + D1 stack, migrations, synthetic seed, data layer, CI, design-protection tests | ✅ Complete. CI passed (run #1, `0803901`) |
| **M1** | Student registration / same-device / new-device resume / Not you?; teacher password sign-in + protected student register; rate limits; record isolation | ✅ Complete. CI passed (run #2, `b73ac6b`) |
| M2 | Pre-test (form A), server-side grading, concept results, pathway assignment (50 / 80) with thresholds recorded, live dashboard | ⛔ **Not started: needs owner approval** |
| M3 | Unit 0–1 lessons, simulations, checkpoints, progress; EQUI search | ⛔ Not started |
| M4 | Teacher dashboard (analytics, overrides, settings), Excel / CSV / research export, backup reminder | ⛔ Not started |
| M5 | Post-test (form B), learning gains, student report | ⛔ Not started |
| M6 | Go-live: owner creates a free Cloudflare account; deployment only on explicit request | ⛔ Not started |
| M7 | Units 2–6 (approved content only) | ⛔ Not started |

**Known temporary behaviour:** after registration the dashboard still shows the **synthetic** diagnostic data (65%, Corrective) from `src/data/synthetic/demoStudent.ts`. M2 replaces this with each student's real results.

## 7. Repository facts

- **Branch:** `claude/chemistry-on-trial-setup-jqety8`. Never push to `main`; never merge.
- **Latest commit:** see `git log -1`. At the end of M1 it was `b73ac6b`; this handoff update is committed immediately after.
- **Important paths:**
  - Server: `worker/src/` (`index.ts`, `router.ts`, `routes/{health,students,teacher}.ts`, `cookies.ts`, `crypto.ts`, `rateLimit.ts`, `request.ts`)
  - Database: `migrations/0001_app_meta.sql`, `migrations/0002_student_access.sql`; synthetic data `seed/synthetic.sql`
  - Shared validation: `shared/validation.ts`
  - Frontend: `src/pages/` (`StudentDashboard`, `WelcomePage`, `TeacherPage`, `DesignSystemPage`); `src/data/` (`DataService`, `StudentSessionProvider`, `apiClient`); `src/components/`; `src/translations/{ar,en}.ts`
  - Config: `wrangler.jsonc` (placeholder local database ID until go-live); `.dev.vars.example` (copy to git-ignored `.dev.vars`)
  - Tests: `tests/e2e/*.spec.ts`; unit tests `**/*.test.ts`; CI `.github/workflows/ci.yml` (no secrets, never deploys)
- **Commands:**
  - `npm ci` — install
  - `npm run typecheck` — site + Worker types
  - `npm test` — unit tests (34)
  - `npm run build` — production build into `dist/`
  - `npx playwright test` — browser tests (29); starts its own local Worker with a fresh synthetic database. Set `CI=1` to force a fresh server
  - `npm run dev:full` — full local stack at http://localhost:8787
  - `npm run dev` — design-only preview at http://localhost:5173 (demo mode, no API)
- **Last verified results:** type check ✅ · unit tests 34/34 ✅ · build ✅ · browser tests 29/29 ✅ · GitHub CI ✅ (runs #1 and #2).

## 8. Next task — and what must NOT be started

- **Next:** wait for the owner's explicit approval of **M2**. Before M2 can be finished with real content, the owner must approve (or ask Claude to draft from approved content):
  - the concept mapping;
  - pre-test form A questions (until then, M2 may use clearly labelled **synthetic placeholder questions**);
  - concept mastery criteria.
- **Do NOT start without explicit approval:**
  - M2 or any later milestone;
  - deployment or Cloudflare account creation;
  - merging into `main`;
  - real student data;
  - paid services of any kind;
  - changes to the approved Stage 2 design or screenshot baselines;
  - automatic pathway transitions;
  - normalised gain;
  - any scientific content not drafted from the approved specification.
- **Open owner decisions:**
  - Approval of the concept mapping.
  - Mastery criteria.
  - Pathway-transition rules (D6).
  - Threshold scope and who may edit thresholds.
  - Boundary rounding.
  - Consent and retention wording.
  - The free address name.
  - The 42 items in §15 of the scientific specification.

---
---

# APPENDIX — Original implementation brief (preserved unchanged)

> Historical record of the owner's original brief. **Superseded** where it conflicts with Section 1–8 above or with `content/ARCHITECTURE_DECISIONS.md`. Superseded points include: two pathways (now three); "ARWA AI" (now EQUI, content-based); no login and local storage only (now Cloudflare D1 with the access flow above); the title "Chemistry on Trial" (now THE EQUILIBRIUM MISSION).

# CHEMISTRY ON TRIAL — الكيمياء في قفص الاتهام
## Claude Code Project Handoff — Revised Implementation Brief

**Project owner:** Miss Arwa Yousef  
**Project:** Bilingual, interactive, adaptive Chemistry learning website  
**Audience:** Egyptian third-year secondary students  
**Main title:** الكيمياء في قفص الاتهام  
**Subtitle:** كيف تدافع التفاعلات عن توازنها ضد الحرارة والضغط؟  
**Learning journey title:** رحلة إلى عالم الاتزان الكيميائي  
**Languages:** Arabic and English  
**Student access:** Public access; no account or login required for the initial version.  
**Primary scientific specification:** `Chemistry_On_Trial_Scientific_Content_REVISED.md`  
**Status:** Approved project direction; inspect the repository and supplied files before implementation.

---

# 1. Instructions and source-of-truth hierarchy

Build a complete, responsive, bilingual interactive learning application named **CHEMISTRY ON TRIAL — الكيمياء في قفص الاتهام**.

Read both project documents before implementing educational content:

1. `Claude_Project_Handoff.md` — application, experience, design, adaptive-learning, assistant, and technical requirements.
2. `Chemistry_On_Trial_Scientific_Content_REVISED.md` — authoritative scientific content, lesson specifications, examples, simulation requirements, assessment blueprint, and unresolved teacher decisions.

**When the documents appear to conflict, the revised scientific content file controls all chemistry facts, equations, values, examples, and scientific activities. This handoff controls the application experience, visual design, pathways, AI assistant, and technical implementation.**

Non-negotiable scientific rules:
- Do not invent textbook content, equations, observations, examples, numerical values, temperatures, initial conditions, measurements, units, rounding tolerances, or page references.
- Do not silently correct, rebalance, simplify, or change source equations.
- Respect every `TEACHER CONFIRMATION REQUIRED` and `HOLD — NOT FOR STUDENT DISPLAY` label in the scientific specification.
- Do not show held or unapproved content as settled student-facing material, quiz questions, graph data, calculations, or answer keys.
- Distinguish textbook content, enriched explanation, and conceptual/illustrative simulation behavior.
- Never claim a qualitative animation is a quantitatively validated chemical model.
- Keep chemistry equations and symbols correctly ordered LTR inside Arabic RTL content.
- Do not let visual effects override scientific accuracy.

If the original scanned textbook, extracted knowledge base, or educational blueprint are not present in the repository, report that fact. Continue only with the approved material that is actually available, and list missing sources clearly. Do not fabricate their contents.

# 2. Project purpose and student experience

This is an adaptive, inquiry-based digital learning environment — not a static textbook, slide deck, or generic dashboard.

The central investigation asks how a chemical system at equilibrium responds when it is disturbed. Students investigate, predict, model, calculate where approved data allow, apply, assess, and reach a final scientific verdict.

The experience must begin with the student, not with a lesson page:

1. A warm welcome in Arabic, with an optional first-name field and a friendly “How are you today?” check-in.
2. A short introduction to the scientific adventure and the central question.
3. An engaging introduction to the unit, learning objectives, expected outcomes, and three learning axes.
4. A diagnostic pre-assessment before instruction.
5. Concept-level analysis of the student's answers.
6. Recommendation of one of exactly two main learning pathways.
7. Lessons, simulations, activities, and continuous feedback.
8. Final post-assessment and a personal learning progress report.

Do not require student registration or collect email addresses, phone numbers, or unnecessary personal information. The optional first name and learning progress may be stored locally in the browser only. Explain local storage simply in the interface if relevant.

# 3. Mandatory visual design lock — first screenshot is the primary reference

The **first uploaded colorful dashboard screenshot** (the pastel blue / white / lavender / mint design with three illustrated pathway cards, a diagnostic score panel, a large top banner, and a friendly robot assistant) is the mandatory primary visual reference.

The screenshot is not a loose inspiration. Reproduce its visual identity, composition, color relationships, rounded-card language, illustration style, and visual hierarchy as closely as practical while adapting the layout to the full learning application.

**Do not use the black-background screenshots as the website theme.** Those screenshots are references for instructional sequence and project methodology only.

Required visual characteristics:
- Deep navy-blue horizontal top navigation bar.
- Light blue and white page background with soft pastel gradients.
- Large introductory banner near the top of the dashboard.
- Rounded cards with gentle shadows and subtle borders.
- Blue identity for the basic learning pathway.
- Mint/green identity for the remedial/adaptive pathway.
- Lavender/purple accents for advanced challenges embedded within lessons (not a third pathway).
- Large, friendly, rounded call-to-action buttons.
- Clear Arabic typography, correct RTL layout, generous spacing, and polished responsive composition.
- Consistent, high-quality 3D/cartoon educational illustrations.
- A friendly blue-and-white robot mascot used consistently for the assistant.
- Chemistry glassware, molecules, books, targets, rockets, and science-themed decorative assets where relevant.

Desktop dashboard composition should closely follow the first reference:
- Top horizontal navigation.
- Diagnostic result / learning-needs panel on the left.
- Wide introductory banner.
- Two main pathway cards (basic and remedial/adaptive) as the actual functional pathways. The reference's extra visual card may be adapted into an informational/advanced-challenge feature, but must not create a third main pathway.
- Each pathway card includes a coherent illustration, short explanation, included features, and a working action button.
- Clearly highlight the recommended pathway.
- Persistent assistant access with the robot mascot near the bottom corner.

Responsive behavior:
- On tablets and phones, stack panels and cards cleanly while preserving the same color palette, rounded visual language, typography, and illustration style.
- Do not shrink the desktop layout into an unusable miniature.
- Keep the assistant accessible without covering essential controls.

Illustration requirements:
- Do not substitute generic emoji for the key illustrations.
- Prefer original, visually consistent illustration assets. Create custom SVG illustrations or generate/source suitable assets where the available development environment supports it.
- Store assets in an organized `public/assets/illustrations/` structure.
- Do not use copyrighted textbook illustrations as copied assets. Create original visuals that explain the same concepts.
- Keep image files optimized and provide meaningful alt text.

Visual acceptance test:
- Capture screenshots of the implemented desktop dashboard and mobile dashboard.
- Compare them with the first colorful reference screenshot.
- Correct major differences in palette, card proportions, spacing, hierarchy, buttons, and illustration placement before declaring the visual design complete.
- Do not replace the reference design with a generic SaaS dashboard, dark theme, or plain admin template.

# 4. Learning unit structure

Organize the module into three major learning axes, with six detailed scientific units defined by the scientific specification.

**Axis 1 — Understanding Chemical Equilibrium**
- Reversible reactions and dynamic equilibrium.
- Law of mass action and reaction rates.
- Equilibrium constant `Kc` and its interpretation/calculation where approved.

**Axis 2 — Le Chatelier's Principle and equilibrium disturbances**
- Concentration effects.
- Temperature effects.
- Pressure, volume, partial pressure, and `Kp`.
- Catalyst effects.

**Axis 3 — Investigation and Application**
- Conceptual animations and interactive simulations.
- Scientific investigations and guided prediction.
- Data/graph interpretation.
- Application questions and new situations.

Use the exact six-unit sequence, learning outcomes, examples, source notes, and restrictions in `Chemistry_On_Trial_Scientific_Content_REVISED.md`. Do not duplicate or contradict its scientific content in application code.

The learner's recurring instructional sequence should be:

**Engage → Investigate → Predict → Explain / Model → Calculate (only where approved) → Apply → Assess → Reflect / Verdict.**

# 5. Diagnostic pre-assessment and concept-level analysis

Build a functional diagnostic assessment before the student begins the main instruction.

Requirements:
- Multiple-choice and other approved question formats where suitable.
- Questions mapped to stable concept IDs and learning objectives.
- Record correct/incorrect responses and the concepts each response assesses.
- Calculate an overall result, but never use the total percentage as the only basis for pathway recommendation.
- Identify mastered, developing, and weak concepts.
- Provide clear, supportive feedback.
- Do not reveal answers before submission unless the student intentionally opens a worked-example/revision mode.
- Use approved scientific questions only. Until teacher-approved questions are supplied, clearly label sample/demo items as placeholders and do not present them as official curriculum assessment.

Create reusable question data structures so the teacher can add or revise questions without rewriting UI components.

# 6. Exactly two adaptive learning pathways

The platform must have **exactly two main learning pathways**. Do not create a standalone third enrichment pathway.

## Pathway A — Basic Learning (مسار التعلم الأساسي)

For students who want or need to study the complete unit from the beginning.

Include:
- All lessons in the approved sequence.
- Clear scientific explanations.
- Original diagrams and illustrations.
- Worked examples only where approved.
- Conceptual animations and interactive simulations where appropriate.
- Practice and formative assessments.
- Progress indicators and lesson completion.
- Optional higher-order challenges embedded within relevant lessons for students ready for them. These are activities inside the basic pathway, not a separate pathway.

## Pathway B — Remedial and Adaptive Learning (المسار العلاجي والتكيفي)

For students whose diagnostic results identify specific learning gaps.

The system must:
1. Map incorrect answers to concept IDs and learning objectives.
2. Identify the exact concepts that need support.
3. Recommend only the relevant explanations, lessons, and activities.
4. Provide simplified explanations and guided examples grounded in approved content.
5. Offer the relevant animation or interactive simulation.
6. Provide corrective practice and meaningful feedback.
7. Reassess the concept after remediation.
8. Update the student's progress and recommendations.
9. Allow the student to move into the appropriate point in the basic sequence after demonstrating mastery.

Do not force students to repeat the whole unit if only one concept needs support.

## Recommendation logic

- Keep pathway thresholds and rules configurable in a separate adaptive-learning module.
- Use concept-level evidence, not just a total score.
- Explain the recommendation to the student in encouraging language.
- Allow the student to choose the basic pathway if they prefer a complete review.
- Store progress locally for the initial release.

# 7. Persistent guided AI learning assistant — ARWA AI

The AI assistant is a core feature of the student experience, not an optional decorative widget and not a single-page feature.

**Name:** ARWA AI — المساعد الذكي للكيمياء

**Availability:** Accessible throughout the welcome flow, lessons, assessments (when permitted), pathways, and simulations. Use a persistent floating button with the same friendly blue-and-white robot mascot. Clicking it opens a polished chat panel that matches the pastel visual system. On mobile, use a responsive chat sheet/page that does not obstruct learning controls.

## Student capabilities
The student can ask the assistant to:
- Explain a difficult concept in simpler Arabic.
- Give an additional example from approved content.
- Explain why an answer is incorrect.
- Provide a hint without immediately giving the answer.
- Guide a problem step by step.
- Compare two related concepts.
- Suggest a lesson or activity for a specific difficulty.
- Help interpret a graph or simulation.
- Generate practice only from approved concepts and content.

Suggested starter prompts:
- اشرح لي المفهوم بطريقة أبسط.
- ساعدني أفكر في حل السؤال من غير ما تقول الإجابة فورًا.
- وضّح لي سبب خطأ إجابتي.
- ما الفرق بين تأثير الحرارة والعامل الحفاز؟
- رشّح لي نشاطًا يساعدني أفهم نقطة ضعفي.

## Guided tutoring behavior
The assistant should behave like a patient tutor:
1. Understand the student's question and current lesson context.
2. Ask a short guiding question when useful.
3. Offer a hint or scaffold.
4. Explain the scientific reasoning.
5. Reveal a complete worked answer when pedagogically appropriate or explicitly requested.
6. Check understanding and suggest the next relevant step.

Avoid giving away answers immediately when a hint would support learning, but do not frustrate the student by refusing a clear request for an explanation.

## Context awareness
Where available and permitted, pass the assistant:
- Current unit, lesson, and learning objective.
- Current pathway.
- Relevant diagnostic findings and mastered/weak concepts.
- The current activity or question context.
- Relevant approved content excerpts.

Use this context to recommend relevant support. Do not expose one student's data to another student.

## Scientific grounding and real integration
- The approved scientific content file is the primary knowledge source.
- Do not fabricate scientific facts or claim unapproved material is part of the curriculum.
- If the answer is not supported by the approved knowledge, say so clearly and invite the student to ask the teacher.
- Implement a reusable assistant service and a secure backend integration point for a real AI model.
- Never put API keys or secrets in frontend code or the public repository.
- Do not pretend a live AI model is connected if credentials/backend integration are not configured.
- Until real integration is configured, provide a clearly labelled demo mode with limited, deterministic sample interactions. Make the difference between demo and live AI explicit in the teacher setup notes.

# 8. Animations and interactive simulations — both are required

Include both:

**A. Explanatory animations** to make invisible or dynamic processes easier to understand.

**B. Interactive simulations** in which students control relevant variables, make predictions, observe a conceptual response, and receive an explanation.

Use the exact activity list and scientific restrictions in the revised scientific content file. In particular:
- Replace the old connected-vessel/water-level analogy with the approved molecular dynamic-equilibrium model.
- Show forward and backward processes continuing at equilibrium, with equal rates but not necessarily equal concentrations.
- Use conceptual/qualitative curves and labels unless approved numerical data and a validated model are available.
- Do not show molecules merging/fusing during compression.
- Keep all activities labelled as conceptual/illustrative wherever appropriate.
- Respect all held activities and teacher-confirmation flags.

Every activity should include instructions, a prediction prompt, meaningful controls, visible feedback, a scientific explanation, a reset control, and keyboard/mobile accessibility.

# 9. Assessment, feedback, and student progress report

Implement:
- Diagnostic pre-assessment.
- Formative checks throughout lessons.
- Practice activities.
- Remedial reassessment.
- Optional advanced challenges embedded in the basic pathway.
- Final post-assessment.
- Student reflection / final verdict.

Provide explanatory feedback, not only “correct” or “incorrect”.

The final report should compare pre- and post-assessment results and show:
- Initial and final performance.
- Improvement over the module.
- Mastered concepts.
- Concepts that still need practice.
- Lessons and activities completed.
- Recommended next steps.

Do not imply that a score alone fully measures learning.

# 10. Teacher / researcher evaluation area

Create a separate, clearly distinguished teacher/researcher area to support evaluation and iterative Design-Based Research (DBR). Do not expose this area or its analytics to ordinary students.

Where feasible in the initial local-first version, provide:
- Aggregate or locally stored student learning summaries (without unnecessary personal identifiers).
- Pre/post performance comparison.
- Common misconception patterns based on assessment responses.
- Pathway recommendation and remediation effectiveness.
- Activity completion and engagement indicators.
- Usability feedback collection.
- Notes for future module revisions.

Organize the design cycle around analysis, design, development, implementation, evaluation, and iterative improvement. Clearly state any data-collection limitations of a local-only prototype. Do not claim cross-student analytics or centralized reporting unless a secure backend has actually been implemented.

# 11. Bilingual, accessibility, and interaction requirements

- Provide a persistent Arabic / English language switch.
- Arabic uses correct RTL layout and appropriate Arabic typography; English uses LTR.
- Translate navigation, lessons, instructions, questions, answers, feedback, assistant UI, and accessibility labels.
- Use Cairo or IBM Plex Sans Arabic for Arabic and Inter for English, subject to availability.
- Keep formulas, equations, subscripts, and symbols correctly ordered LTR within Arabic paragraphs.
- Support keyboard navigation, visible focus, meaningful labels, readable contrast, and reduced-motion preferences.
- Ensure all buttons, links, sliders, simulation controls, menus, and reset actions work.
- Do not leave decorative controls that look functional.

# 12. Technical architecture

First inspect the connected GitHub repository, current branch, files, and available runtime environment. Preserve useful work. Do not overwrite files blindly.

If the repository is effectively empty, use a maintainable modern stack:
- React
- Vite
- TypeScript
- Tailwind CSS
- Lucide icons
- Framer Motion only for restrained, purposeful motion
- SVG / Canvas for original diagrams and conceptual simulations

Keep the architecture modular. Separate:
- App shell and navigation.
- Design tokens and shared UI components.
- Student onboarding.
- Unit and lesson content.
- Diagnostic assessment engine.
- Adaptive recommendation engine.
- Basic and remedial pathways.
- Animations and simulations.
- AI assistant UI and service/backend integration.
- Student progress and reports.
- Teacher/researcher evaluation.
- Arabic/English translations.

Suggested structure:

```text
src/
  app/
  components/
  pages/
  onboarding/
  units/
    unit-01-le-chatelier/
    unit-02-mass-action/
    unit-03-kc/
    unit-04-temperature/
    unit-05-pressure-kp/
    unit-06-catalyst/
  pathways/
    basic/
    remedial/
  assessments/
  adaptive/
  simulations/
  assistant/
  teacher/
  content/
  translations/
  data/
  hooks/
  styles/
public/
  assets/
    illustrations/
      robot/
      chemistry/
      pathways/
      backgrounds/
content/
  Claude_Project_Handoff.md
  Chemistry_On_Trial_Scientific_Content_REVISED.md
source/
  [teacher-supplied source files, if available]
```

Store educational content as structured data separate from UI components. Keep assessment questions linked to concept IDs and learning objectives.

For the initial release, local storage may preserve the optional display name, language preference, and learning progress. Do not collect unnecessary student personal data. If a database or hosted AI service is later added, use secure server-side secrets and appropriate privacy controls.

# 13. Development workflow — build the real application in stages

**Stage 1 — Repository and source audit**
- Inspect the repository and current branch.
- Confirm which project documents and source files are actually present.
- Read both Markdown specifications fully.
- Report missing files and unresolved teacher decisions.
- Do not invent missing source content.

**Stage 2 — Visual foundation**
- Establish design tokens from the first colorful reference screenshot.
- Build the navigation, page background, welcome experience, dashboard layout, pathway cards, and robot assistant shell.
- Verify the visual result against the screenshot before proceeding.

**Stage 3 — Learning journey and diagnostic assessment**
- Implement onboarding, unit introduction, learning objectives, diagnostic assessment, concept mapping, and result analysis.

**Stage 4 — Two adaptive pathways**
- Implement the complete sequential basic pathway and concept-targeted remedial pathway.
- Implement recommendation rules and reassessment.

**Stage 5 — Six scientific units and learning activities**
- Implement content from the authoritative scientific specification.
- Add approved examples, equations, original diagrams, and activity instructions.
- Respect every hold and teacher-confirmation flag.

**Stage 6 — Animations and interactive simulations**
- Implement both explanatory animations and learner-controlled simulations.
- Test controls, feedback, reset behavior, scientific logic, and accessibility.

**Stage 7 — ARWA AI assistant**
- Implement the persistent chat interface and guided tutoring flow.
- Implement secure integration architecture.
- Clearly label demo mode until a real AI backend is configured.

**Stage 8 — Assessments, reports, and teacher/researcher evaluation**
- Implement formative and final assessment, pre/post comparison, student reflection, and the separate evaluation area.

**Stage 9 — Quality assurance**
Test navigation, language switching, RTL/LTR, formulas, assessment logic, adaptive recommendations, assistant demo/live states, simulations, mobile/tablet/desktop layouts, keyboard access, reduced motion, console errors, and production build.

**Stage 10 — Handoff and deployment preparation**
- Provide setup instructions and a clear README.
- Explain how to run locally.
- Prepare a production build.
- Deployment to Netlify or any hosting provider must happen only when the project owner explicitly requests it.
- Never claim the site is deployed or live unless deployment actually succeeds.

After each stage, report what was implemented, which files changed, what was tested, and what remains incomplete. Do not stop at a plan, wireframe, or static homepage; continue building the working application in stages.

# 14. Definition of done

The application is not complete until:
- The first colorful reference screenshot's visual identity is faithfully reflected throughout the website.
- Student onboarding and unit introduction work.
- Diagnostic assessment maps responses to concepts.
- Exactly two main learning pathways function.
- The guided ARWA AI assistant is persistently accessible, with its real/demo status honestly represented.
- Both explanatory animations and interactive simulations are implemented where specified.
- All six units follow the revised scientific specification.
- Teacher-confirmation and hold items are respected.
- Formative and final assessments provide meaningful feedback.
- Student progress and pre/post comparison work.
- Arabic and English experiences are usable and correctly directed.
- No visible placeholder buttons or broken interactions remain.
- Responsive layouts and production build pass testing.
- Setup and deployment instructions are documented.

**Project name:** CHEMISTRY ON TRIAL  
**Arabic name:** الكيمياء في قفص الاتهام  
**Project owner:** Miss Arwa Yousef
