# 3D Illustration Style Guide and Asset Prompts (DRAFT for owner review)

**Status:** Draft prepared in Stage 2. Pending review by the project owner.
**Reference:** `public/reference/primary-dashboard-reference.jpg` (mandatory, ARCHITECTURE_DECISIONS D12).
**Rule:** The main mascot and educational illustrations must be glossy, dimensional 3D-style raster assets with transparent backgrounds. Flat SVG drawings must not substitute for them. SVG is used only for simple interface icons and decorations (sparkles, rays, waves).

---

## 1. Workflow

| Step | Who | Output |
|---|---|---|
| 1. Approve this guide and the prompts | Owner | Approved guide |
| 2. Generate images, attaching the reference image as the style reference | Owner or a designer, using an image generator whose terms allow educational/commercial use | Candidate images, 2048 px |
| 3. Select the best candidate per asset | Owner (Claude can give a consistency opinion) | One master per asset |
| 4. Remove the background (if the tool cannot export transparency), clean edges, check colours against the palette | Claude | Transparent master PNG |
| 5. Export web versions (WebP + PNG fallback, 1× and 2×), write Arabic and English alt text, record provenance | Claude | Files in `public/assets/illustrations/…` and `assets-manifest.json` |
| 6. Consistency check: contact sheet of all assets next to the reference; regenerate outliers | Claude + owner | Approved set |
| 7. Scientific accuracy check for every chemistry illustration | Owner (teacher) | Approved for student display |

Masters (2048 px) are kept outside the website build. The website uses optimised exports only, about 150 KB or less per asset.

## 2. Visual style ("style bible")

**Overall look:** friendly, polished 3D cartoon renders of educational objects, like the books, rocket, dartboard, robot and flasks in the reference. Rounded, slightly chunky proportions; soft and approachable, never realistic or gritty.

| Attribute | Specification |
|---|---|
| Rendering | Soft 3D render, smooth subdivided shapes, subtle bevels on every edge. No outlines or cel-shading. |
| Materials | Glossy plastic or ceramic for objects; clear glass with soft reflections for glassware; slightly matte paper for book pages. Gentle specular highlights. |
| Lighting | Soft key light from the **upper left**, gentle fill from the right, faint rim light. Soft ambient occlusion where shapes meet. No harsh shadows. |
| Shadow / grounding | Very soft contact shadow, or a small cloud base in light blue `#9CD0FC` / white (as under the reference's target and rocket). |
| Camera | Three-quarter view, slightly above, about 15–25°. Object centred with comfortable padding. |
| Background | **Transparent.** No scene, no floor, no gradient. |
| Colour palette | Use only these: blues `#1866B4` `#186CC0` `#3C98F0` `#58B0F4` `#9CD0FC` · greens `#00845A` `#08A074` `#94D0C0` · purples `#784EAE` `#6C4890` · gold `#FCBC40` · coral red `#E84C58` / `#C03030` · pink `#F080B0` · navy `#183660` · white. |
| Detail level | Medium. Readable at 140 px wide on a phone; no tiny text or fine patterns. |
| Text in images | **None.** No letters, numbers or labels; all text is added by the website in Arabic or English. |
| Consistency | Same lighting direction, camera height, material finish and saturation across every asset. |

**Avoid (negative prompt):** photorealism, flat vector style, outlines, cel-shading, harsh shadows, dark or black backgrounds, neon, grunge, busy backgrounds, text or letters, watermarks, logos, extra limbs, distorted hands, unsafe lab practice, molecules merging together.

## 3. EQUI mascot specification

Based on the reference robot. EQUI must look the same in every pose.

- **Body:** glossy white, rounded capsule head and torso, short rounded arms with simple mitten hands, small legs.
- **Face:** large dark navy visor (`#183660`) with two friendly cyan oval eyes (`#4CECF8`) and a small curved cyan smile.
- **Accents:** blue (`#2472D2` / `#3C98F0`) headphones on both sides of the head, a blue chest panel, blue joints.
- **Proportions:** head about 45 % of total height; friendly and gender-neutral.
- **Personality:** warm, encouraging, curious. Never scary, never sad.

## 4. First six assets — exact delivery specification

These six fill the dashboard slots that already exist in the code (`src/assets/illustrations.ts`). Each slot has a fixed aspect ratio, so deliver images at exactly these proportions. Keep about 8–10 % empty transparent margin around the object, and rest the object on the bottom third (except the rocket, which flies upward).

| # | Asset | Slot / file name | Master to deliver | Aspect | Largest display size (CSS px) |
|---|---|---|---|---|---|
| 1 | EQUI robot, pointing toward the speech bubble | `robot/equi-pointing` | **2048 × 2048** | 1 : 1 | 158 × 158 (dashboard), 48 × 48 (chat avatar) |
| 2 | Remedial — stack of books on a cloud base | `pathways/remedial-books` | **2048 × 1152** | 16 : 9 | 230 × 129 |
| 3 | Corrective — dartboard target with dart, on a cloud base (also used in the banner) | `pathways/corrective-target` | **2048 × 1152** | 16 : 9 | 230 × 129 (card), 170 × 96 (banner) |
| 4 | Enrichment — rocket launching, cloud trail | `pathways/enrichment-rocket` | **2048 × 1152** | 16 : 9 | 230 × 129 |
| 5 | Laboratory glassware — blue Erlenmeyer + pink round-bottom flask (decorative, no experiment) | `chemistry/lab-glassware` | **2048 × 1365** | 3 : 2 | 190 × 127 |
| 6 | Decorative science elements — mint leaves with a few small floating molecules / sparkles | `ui/science-decor` | **1365 × 2048** | 2 : 3 | 72 × 108 |

**Format for every master:** PNG-24 with transparent background (alpha), sRGB colour profile, no text, no watermark. Larger masters are fine if the aspect ratio is kept. JPEG is not accepted, because it cannot carry transparency.

**What Claude produces from each master:** `<name>.webp` (display size × 1), `<name>@2x.webp` (× 2) and `<name>.png` (fallback), placed under `public/assets/illustrations/`. The slot is then switched on in `src/assets/illustrations.ts`, with no layout change.

Note: in the reference, the robot's direction follows the Arabic layout. EQUI points toward the speech bubble on its reading-start side (to the viewer's right in Arabic). Please generate EQUI **pointing to the viewer's right**; the English layout uses a mirrored copy.

## 5. Asset list with prompts

Every prompt starts with the **shared style block**:

> *Friendly glossy 3D cartoon render in the style of the attached reference image, soft subdivided shapes with subtle bevels, glossy plastic materials, soft key light from upper left, gentle rim light, soft ambient occlusion, three-quarter view slightly from above, isolated object on a fully transparent background, no text, no letters, colour palette limited to soft blues, mint green, lavender purple, warm gold, coral red and white.*

### Priority 1 — needed for the dashboard (matches the reference)

| File | Prompt (after the shared style block) |
|---|---|
| `pathways/remedial-books.png` (Remedial, blue) | *A neat stack of three thick closed books, the top book golden yellow with a lighter label area, the lower books in two shades of blue (#1866B4, #58B0F4), small open book pages visible on one side, sitting on a soft light-blue cloud base with two small gold four-point sparkles.* |
| `pathways/corrective-target.png` (Corrective, green) | *A round dartboard target with white and coral-red rings and a red bullseye, a blue dart arrow with navy fletching stuck exactly in the centre, the target sitting on a soft light-blue cloud base with two small gold four-point sparkles.* |
| `pathways/enrichment-rocket.png` (Enrichment, purple) | *A cute cartoon rocket launching diagonally upward to the right, white and blue body with a round window, red-coral fins, soft orange-gold flame, small puffy white-blue cloud trail below, two small gold sparkles.* |
| `ui/science-decor.png` | *A small vertical cluster of three soft mint-green leaves (#94D0C0) with two or three tiny glossy molecule spheres in blue and white and two small gold sparkles floating beside them.* Decorative only. |
| `robot/equi-pointing.png` | *The EQUI robot (spec in section 3) standing, three-quarter view, one hand raised with the index finger pointing up and to the viewer's right as if presenting a speech bubble, cheerful smile.* |
| `chemistry/lab-glassware.png` | *Two glass laboratory flasks side by side: an Erlenmeyer flask with bright blue liquid (#58B0F4) and a smaller round-bottom flask with pink liquid (#F080B0), small bubbles, a few soft mint-green leaves behind them on one side.* **Decorative — not tied to any experiment.** |

### Priority 2 — EQUI poses (assistant states)

| File | Prompt (after the shared style block + EQUI spec) |
|---|---|
| `robot/equi-waving.png` | *EQUI waving hello with one hand, welcoming expression.* |
| `robot/equi-thinking.png` | *EQUI with one hand on its chin, eyes looking up, thinking.* |
| `robot/equi-explaining.png` | *EQUI holding a small blank tablet screen facing the viewer, explaining.* |
| `robot/equi-celebrating.png` | *EQUI with both arms raised in celebration, small gold sparkles around.* |
| `robot/equi-encouraging.png` | *EQUI giving a thumbs-up, gentle encouraging smile.* |
| `robot/equi-paused.png` | *EQUI sitting calmly with eyes closed in a relaxed "resting" pose and a small blue pause symbol floating above (no text)* — used while EQUI is switched off during formal tests. |
| `robot/equi-avatar.png` | *Head-and-shoulders portrait of EQUI facing forward, smiling, for a round chat avatar.* |

### Priority 3 — interface and progress illustrations

| File | Prompt (after the shared style block) |
|---|---|
| `ui/lightbulb.png` | *A glowing glossy yellow light bulb with soft rays.* |
| `ui/clipboard.png` | *A clipboard with a blank sheet and three blue check marks (no text) — represents tests.* |
| `ui/chart.png` | *A small 3D bar chart with three rounded bars in blue, green and purple, rising — represents progress reports.* |
| `ui/trophy.png` | *A shiny gold trophy cup with a blue base.* |
| `ui/medal.png` | *A gold medal with a blue ribbon.* |
| `ui/magnifier.png` | *A magnifying glass with a blue handle.* |
| `ui/certificate.png` | *A rolled certificate with a blue ribbon and gold seal (no text).* |

### Priority 4 — chemistry illustrations (⚠ teacher approval required BEFORE generation)

These depict chemistry and must match the approved scientific content. Do **not** generate them until the related content is approved. Some prompts depend on pending decisions in the scientific specification.

| File | Purpose | Prompt (after the shared style block) | Dependency |
|---|---|---|---|
| `chemistry/beaker.png` | Generic apparatus | *A glass laboratory beaker with clear graduation marks (no numbers), half filled with pale blue liquid.* | None (generic) |
| `chemistry/test-tube-rack.png` | A3 FeCl₃ lab apparatus | *A rack holding three glass test tubes containing red solutions in three different depths of red (pale, medium, deep).* | 🟡 Colour wording limited to "deeper red / paler red" until #21 is confirmed |
| `chemistry/gas-syringe.png` | A8 piston model | *A transparent gas syringe / piston cylinder with a blue plunger, containing a few small spheres representing gas particles spaced apart; no particles touching or merging.* | Must respect M18 (no merging) |
| `chemistry/thermometer.png` | A7 temperature lab | *A glass laboratory thermometer with a red liquid column (no numbers).* | None (generic) |
| `chemistry/sealed-tubes-no2.png` | A7 NO₂/N₂O₄ lab | *Three sealed glass tubes side by side showing gas colours: almost colourless, pale brown, and reddish-brown.* | 🟡 #9 three-position control, #37 "colourless" vs "almost colourless" at 0 °C |
| `chemistry/ice-bath.png`, `chemistry/hot-water-bath.png` | A7 conditions | *A glass bowl of ice cubes and water* / *a glass bowl of steaming hot water.* | None (generic) |
| `chemistry/molecules.png` | Decorative molecule cluster | *A few glossy ball-and-stick molecule models in blue, white and coral red, floating loosely.* | Decorative only; must not represent a specific reaction unless approved |
| `chemistry/catalyst.png` | A10 explorer icon | *A small glossy chip-shaped catalyst pellet with a gentle glow.* | 🟡 #15, #32 (reaction not yet named) |

## 6. Technical delivery specification

- **Master:** PNG, 2048 × 2048 px (or the generator's maximum), sRGB, transparent background (alpha channel).
- **Web exports (Claude):** WebP and PNG fallback at 1× and 2× display size. File names in lower case with hyphens, as listed above.
- **Folders:** `public/assets/illustrations/{robot,pathways,chemistry,ui,backgrounds}/`.
- **Alt text:** written in Arabic and English for every asset; decorative assets marked as decorative.

## 7. Provenance record (one entry per asset in `public/assets/illustrations/assets-manifest.json`)

```json
{
  "file": "pathways/books.png",
  "purpose": "Remedial pathway card illustration",
  "tool": "<image generator name and version>",
  "prompt": "<exact prompt used>",
  "referenceImageUsed": true,
  "licence": "<terms that allow educational/commercial use>",
  "createdBy": "<owner or designer>",
  "createdOn": "YYYY-MM-DD",
  "editedBy": "Claude (background removal, colour check, export)",
  "scientificReview": "not required | approved by <name> on YYYY-MM-DD",
  "altText": { "ar": "…", "en": "…" }
}
```

## 8. Consistency checklist (applied to every candidate)

- [ ] Light comes from the upper left; shadows are soft.
- [ ] Glossy finish matches the reference books, rocket and target.
- [ ] Colours stay within the palette (checked by sampling).
- [ ] Transparent background with clean edges (no white halo).
- [ ] No text, letters, numbers or watermarks.
- [ ] Proportions are rounded and friendly, matching the other assets.
- [ ] EQUI matches the mascot specification exactly (visor, eyes, headphones).
- [ ] Chemistry assets: scientifically approved before use.

## 9. Questions for the owner

1. Which image generator will you use? Its licence terms go into the provenance record.
2. Is the Priority 1 list complete for the first visual review?
3. Should EQUI hold any chemistry object in its poses (e.g. a flask), or stay neutral?
4. Optional: may I test Blender (free 3D software) for simple chemistry objects such as glassware and the piston, rendered to this same style?
