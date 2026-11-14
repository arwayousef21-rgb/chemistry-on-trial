# Stage 3 — MVP plan (zero cost)

**Decisions:** `content/ARCHITECTURE_DECISIONS.md` D15 (architecture and student access), D16 (EQUI), D17 (milestone authorisation).
**Status:** M0 and M1 complete (local development, synthetic data). Later milestones need the owner's explicit approval. Nothing is deployed.

## 1. Architecture

| Part | Choice | Cost |
|---|---|---|
| Website + API | One Cloudflare Worker: serves the approved Stage 2 site from `dist/` and the API under `/api/` | Free plan, no card |
| Database | Cloudflare D1 (SQLite), reachable **only** through the Worker | Free plan, no card |
| Public address | `*.workers.dev` (or `*.pages.dev`), chosen at go-live | Free |
| EQUI | Content-based search in the browser over approved materials only (D16) | Free |
| Excel / CSV | Built in the teacher's browser (ExcelJS) | Free |
| CI | GitHub Actions on the public repository | Free |

Development and CI run the whole stack locally with `wrangler dev --local` and synthetic data. No Cloudflare account is needed until go-live.

## 2. Student access flow (built in M1)

| Situation | Behaviour |
|---|---|
| **First registration** | Full name, email address, Egyptian mobile number (11 digits starting 010/011/012/015; Arabic or Western digits; +20 forms accepted). Creates **one** student record and starts a persistent device session in this browser. |
| **Same device** | The saved device session recognises the student and restores the profile and progress. No new registration. |
| **New device** | A **"لدي حساب بالفعل / I already have an account"** option asks for **email and phone only**. If both match one record, that record is resumed with its progress. If not, a clear error asks the student to check the details or contact the teacher. **Resuming never creates a record.** |
| **Shared device** | A visible **"لست أنت؟ / Not you?"** button clears the local session and returns to the welcome screen. |

- No passwords, no email verification, no return codes.
- No other personal information is collected.
- Email is unique per record; a phone number shared by two records is flagged for the teacher.
- The device session is a long random key kept in the browser; the database stores only its hash.
- The resume check answers only "match" or "no match". It never returns another student's details, and repeated failed attempts are rate-limited.
- The teacher account is separately protected: one strong password kept as a server-side secret, a 12-hour session, and sign-in rate limiting (D18).

### Limitation (shown to the owner and documented)

Matching email + phone **is not identity verification**:
- Anyone who knows a student's email and phone can resume that record.
- Anyone can register with false details.

Assessments are for **learning and research under supervision**, not for high-stakes formal grading.

## 3. Simple data model (✅ = built)

| Table | Holds |
|---|---|
| `students` ✅ | ID, research code (e.g. `S-0042`), full name, email (unique), phone, consent time, registered, last active, duplicate-phone flag |
| `device_sessions` ✅ | Session-key hash, student, created, last used |
| `teacher_sessions` ✅ | Session-key hash, created, expires |
| `rate_limits` ✅ | Attempt counters for registration, resume and teacher sign-in |
| `attempts` | Student, type (pre / post / checkpoint), form, times, score, pathway assigned, thresholds used |
| `answers` | Attempt, question, answer, correct, concept |
| `progress` | Student, lesson/activity, status, saved position, updated |
| `pathway_history` | Student, pathway, source, reason, thresholds, time |
| `settings` | Threshold versions (lower 50 / upper 80; validated, editable) |
| `answer_keys` | Server-only correct answers and concept links |

`app_meta` (schema version, dataset label) exists since M0.

## 4. Teacher Excel export (M4)

One button in the teacher dashboard produces an `.xlsx` workbook with these sheets:
- **Students:** name, email, phone, research code, registered, last active, participation.
- **Results:** pre-test, post-test, gain, pathway.
- **Pathway history.**
- **Progress:** lessons and activities.
- **Concepts:** per-concept performance where available.

A **research export** contains the same sheets with research codes only (no name, email or phone). Regular Excel downloads are part of the backup routine, together with D1 Time Travel (7-day restore).

## 5. Milestones

| # | Milestone | Status |
|---|---|---|
| M0 | Local setup and CI: Worker + D1 locally, migrations, synthetic seed, switchable data layer, API health check, design-protection tests | ✅ Complete |
| M1 | Student access (flow above) + teacher sign-in (student register) | ✅ Complete |
| M2 | Pre-test, server grading, pathway assignment (50 / 80), live dashboard | Needs approval |
| M3 | Unit 0–1 lessons, simulations, checkpoints, progress; EQUI search | Needs approval |
| M4 | Teacher dashboard, Excel / CSV / research export, backup reminder | Needs approval |
| M5 | Post-test and learning gains | Needs approval |
| M6 | Go-live: owner creates a free Cloudflare account; deployment only on request | Needs approval |
| M7 | Units 2–6 (approved content only) | Needs approval |

## 6. Free-platform limitations

- Student data is stored externally with Cloudflare.
- If a daily free quota were exceeded, the site would return errors until midnight UTC (no cost, no data loss).
- Free terms can change; the data can always be exported.
- Built-in restore goes back 7 days, so weekly Excel downloads matter.
- There is no service-level guarantee.
- There is no email-based recovery; the teacher handles student support.
