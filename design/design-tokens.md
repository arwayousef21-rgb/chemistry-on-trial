# Design Tokens (Stage 2)

**Source of truth in code:** `src/styles/tokens.ts`. Tailwind reads it (`tailwind.config.ts`), so components never hard-code colours.
**Live view:** open the app and use the "Design system" link in the footer (`#/design-system`).

All colours were sampled from `public/reference/primary-dashboard-reference.jpg`. Each value is the most frequent colour in its region, accurate to about ±4 per colour channel because of JPEG compression.

## Colours

| Token | HEX | Where it comes from in the reference |
|---|---|---|
| `navy.900` | `#183660` | Top navigation bar |
| `navy.700` | `#1E3C66` | Navigation variation / hover |
| `ink.strong` | `#1C1650` | Banner headline |
| `ink.DEFAULT` | `#0C2858` | Panel and section headings, score number |
| `ink.body` | `#100C2C` | Body text |
| `ink.muted` | `#4A5578` | Captions (derived; not in reference) |
| `surface.DEFAULT` | `#FFFFFF` | Page, white cards |
| `surface.tint` | `#EAF0FC` | Band under the navigation bar |
| `surface.info` | `#DEEAFC` | Note card, score-card header |
| `surface.wave` | `#C6DEFC` | Background waves |
| `border.soft` | `#DCE0FC` | Banner and panel borders |
| `banner.start` / `banner.end` | `#C0D8FC` → `#DEDEFC` | Banner gradient (blue on the reading-start side, lavender on the reading-end side) |

### Pathways (approved mapping, D3)

| Token | Remedial (blue) | Corrective (green) | Enrichment (purple) |
|---|---|---|---|
| `solid` (pill) | `#1866B4` | `#00845A` | `#784EAE` |
| `button` | `#186CC0` | `#00845A` ✱ | `#6C4890` |
| `tint` (card) | `#EAF0FC` | `#EAF6F0` | `#F0EAFC` |
| `strip` | `#CCE4FC` | `#C0F0E4` | `#E4DEFC` |
| `border` | `#E4ECF8` | `#98E8D0` (recommended emphasis `#2C9878`) | `#E6DEFA` |

✱ Accessibility adjustment approved by the owner (sampled `#008A60`).

### Status and accents

| Token | HEX | Note |
|---|---|---|
| `status.ring` | `#049870` | Progress ring ✱ (accessibility-adjusted) |
| `status.ringHighlight` | `#04AC7C` | Ring highlight (original reference colour) |
| `status.check` | `#08A074` | Check marks |
| `status.track` | `#CCD8E8` | Ring track |
| `status.danger` | `#E84C58` | "Needs support" markers |
| `status.warning` | `#F2A93B` | "Developing" marker (derived from gold; not in reference) |
| `status.gold` | `#FCBC40` | Star, sparkles, rays |
| `assistant.cta` | `#2472D2` | "Ask EQUI" button |
| `assistant.eye` | `#4CECF8` | Robot eyes |

## Typography

| Use | Size / line height | Weight | Font |
|---|---|---|---|
| Display (banner) | 36 / 44 px | 800 | Cairo (Arabic) · Inter (English) |
| Pathway title pill | 21–23 px, tight leading | 700 | ″ |
| H2 | 26 / 34 px | 700 | ″ |
| H3 | 20 / 28 px | 700 | ″ |
| Body | 17 / 28 px | 500 | ″ |
| Small | 15 / 24 px | 500 | ″ |
| Score | 44 / 48 px | 800 | ″ |
| Equations | KaTeX, always left-to-right | — | KaTeX fonts |

Fonts are bundled with the site (no requests to Google from students' browsers).

## Shape, depth, layout

| Token | Value |
|---|---|
| `radius.card` | 24 px |
| `radius.panel` | 18 px |
| `radius.strip` | 12 px |
| `radius.pill` | fully rounded |
| `shadow.card` | `0 8px 24px rgba(24,54,96,0.08)` |
| `shadow.raised` | `0 12px 32px rgba(24,54,96,0.12)` |
| `shadow.button` | `0 4px 12px rgba(24,54,96,0.14)` |
| Navigation height | 72 px |
| Side column | 300 px |
| Max page width | 1440 px |
| Gutters | 32 px desktop · 16 px mobile |

## Accessibility contrast (WCAG AA)

White text on: navy 12.1 · remedial 5.8 / 5.3 · corrective `#00845A` 4.7 · enrichment 6.0 / 7.1 · assistant 4.8. Ring `#049870` on white 3.7 (graphics need 3.0).
