# Concept → Objective → Question Mapping (DRAFT for owner review)

**Status:** Draft prepared in Stage 2. Pending review by the project owner.
**Source:** `content/Chemistry_On_Trial_Scientific_Content_REVISED.md` only (section numbers in brackets). No scientific content has been added.

## How to read this document

- **Concept ID** — a stable identifier the system will use to link questions, activities, mastery and recommendations. IDs are structural labels, not scientific content.
- **Learning objective** — quoted or closely paraphrased from the specification's learning outcomes.
- **Status** — taken from the specification's own labels:
  - ✅ **Approved:** core content with no outstanding flag.
  - 🟡 **Pending:** a `TEACHER CONFIRMATION REQUIRED` item applies (the number refers to §15 "Outstanding teacher decisions").
  - ⛔ **Hold:** `HOLD — NOT FOR STUDENT DISPLAY`.
- **Question slots** — the *types* of question planned for each concept, chosen from the assessment blueprint (§12). **No questions have been written yet.** Each slot will be drafted later, kept pending and hidden from students until approved.
  - `MC` multiple choice · `TF` true/false with correction · `PS` predict the shift · `EX` explain the reason · `GR` interpret a rate–time graph · `GC` interpret a concentration–time graph · `KC` construct a K_c expression · `KP` construct a K_p expression · `CALC` calculate with approved values · `CHK` compare an expression with a stated K_c · `PV` pressure/volume prediction by gas-mole count · `EP` interpret a catalyst energy profile
- **Misconceptions** — numbered as in §11 (M1–M18; full list at the end).
- **Activities** — numbered as in §13 (A1–A10), with a proposed classification under decision D11:
  - 🧪 **Virtual lab:** guided procedure, apparatus, observations, data interpretation.
  - 🔬 **Simulation:** conceptual exploration and manipulation of variables.
  - 🧩 **Interactive tool:** guided construction (expression builders).

---

## Unit 0 — Dynamic chemical equilibrium [§2]

| Concept ID | Concept | Learning objective | Status | Question slots | Misconceptions | Activities |
|---|---|---|---|---|---|---|
| `U0.reversible` | Reversible reactions: forward (left→right) and backward (right→left) | Explain dynamic chemical equilibrium [§1] | ✅ (opening wording: 🟡 #33) | MC, TF | — | A1 |
| `U0.dynamic` | At equilibrium both reactions continue at equal rates | Explain dynamic chemical equilibrium [§1, §2.2] | ✅ | MC, TF, EX, GR | M1 | A1 🔬 (🟡 #7) |
| `U0.rates-not-conc` | Equal rates ≠ equal concentrations; concentrations constant under unchanged conditions | Explain dynamic chemical equilibrium [§2.2] | ✅ | MC, TF, GC | M2 | A1 |
| `U0.closed-system` | Equilibrium is established in a closed system | Explain dynamic chemical equilibrium [§2.3, enriched] | 🟡 #3 | MC, EX | M3 | — |

Note: §2.4 requires A1 to show the rate–time and concentration–time graphs qualitatively ("conceptual / illustrative"). Whether rate graphs are taught before they are assessed is pending (🟡 #8).

## Unit 1 — Le Chatelier's principle [§3]

| Concept ID | Concept | Learning objective | Status | Question slots | Misconceptions | Activities |
|---|---|---|---|---|---|---|
| `U1.principle` | Statement of Le Chatelier's principle | State Le Chatelier's principle | ✅ | MC, TF | — | — |
| `U1.conc-shift` | Direction of shift after adding or removing a reactant or product | Predict the direction of equilibrium shift after a concentration change | ✅ | PS, MC | — | A2 🔬, A3 🧪 |
| `U1.oppose` | The shift opposes the change (consumes added / replaces removed substance) | Explain the response in terms of opposing the imposed change | ✅ | EX, TF | — | A2 |
| `U1.new-equilibrium` | The disturbance is not cancelled completely; a new equilibrium forms | Explain the response… [§3 principle] | ✅ | TF, EX | M4 | A2 |

Notes:
- The connected-vessel analogy is removed [§3]. It is replaced by the molecular dynamic-equilibrium model, part of A2.
- **A2 is proposed as a 🔬 simulation**, under the definitions you approved in D11 (particles, add/remove, predict, observe). My earlier plan called it a lab; please confirm.

## Unit 2 — Law of mass action and reaction rates [§4]

| Concept ID | Concept | Learning objective | Status | Question slots | Misconceptions | Activities |
|---|---|---|---|---|---|---|
| `U2.rate-conc` | Concentration and reaction rate (school-level treatment) | Relate concentration to reaction rate using the school-level treatment | ✅ (limitation note applies) | MC, TF | — | — |
| `U2.rate-expressions` | Forward and backward rate expressions for the FeCl₃ example | Write forward and backward rate expressions for the specified example | ✅ (#35: keep as school-level model) | MC, KC-style | M5 | — |
| `U2.kc-from-rates` | r_f = r_b at equilibrium leads to K_c = k_f / k_b | Explain how equality of rates leads to the equilibrium-constant expression | ✅ | MC, EX | — | — |
| `U2.rate-graph` | Rate–time graph: both rates non-zero and equal at equilibrium | Interpret the relevant rate diagrams [§1] | ✅ (🟡 #8 teaching order) | GR | M1 | A1 |
| `U2.fescn-colour` | Adding FeCl₃ → deeper red; adding NH₄Cl → paler red (lesson model) | Predict / explain concentration effects | ✅ wording limited to "deeper red / paler red" (🟡 #21) | PS, EX | — | A3 🧪 |
| `U2.hi-graph` | HI removal concentration–time graph | Interpret concentration diagrams | ⛔ HOLD (#1, #22, #42) | GC — not drafted while on hold | — | A4 ⛔ |

## Unit 3 — Equilibrium constant K_c [§5–§6]

| Concept ID | Concept | Learning objective | Status | Question slots | Misconceptions | Activities |
|---|---|---|---|---|---|---|
| `U3.kc-construct` | Products over reactants, coefficients as powers | Construct K_c expressions from balanced equations; use coefficients as powers | ✅ | KC, MC | M5 | A5 🧩 |
| `U3.phases` | Omit pure solids and liquids; include vapour (v) and aqueous species | Exclude pure solids and pure liquids in the lesson's equilibrium expressions | ✅ rule · 🟡 #4 explanation wording · 🟡 #5 state-symbol glossary | KC, TF, MC | M6, M7 | A5 |
| `U3.kc-calc` | Substitute equilibrium concentrations and calculate K_c | Substitute equilibrium concentrations and calculate K_c | ⛔ no approved numerical data (HI on hold) | CALC — not drafted | — | A6 ⛔ |
| `U3.eq-check` | Compare a current expression with a stated K_c | Decide whether the mixture is at equilibrium | ⛔ (HI data; 🟡 #16, #27) | CHK — not drafted | — | A6 ⛔ |
| `U3.kc-meaning` | Very large / very small K_c and equilibrium composition | Interpret K_c (qualitative) | 🟡 #10 | MC, TF (after approval) | M8, M9 | — |
| `U3.reverse-multiply` | K_reverse = 1/K_forward; K_new = (K_original)ⁿ | Apply the reversal and coefficient-multiplication rules | ✅ rules · 🟡 #26 worked examples | MC (rule recognition) | — | — |

## Unit 4 — Temperature and equilibrium [§7]

| Concept ID | Concept | Learning objective | Status | Question slots | Misconceptions | Activities |
|---|---|---|---|---|---|---|
| `U4.exo-endo` | Exothermic / endothermic forward reactions; heat side; sign of ΔH | Identify exothermic and endothermic forward reactions; represent heat on the correct side | ✅ rules · 🟡 #25 ΔH wording · 🟡 #36 "+Heat" with ΔH | MC, TF | — | A7 🧪 |
| `U4.temp-shift` | Effect of raising or lowering temperature on equilibrium position | Predict the effect of increasing or decreasing temperature | ✅ | PS, EX | — | A7 |
| `U4.temp-k` | Temperature changes K; concentration at constant temperature does not | Explain the effect of temperature on the equilibrium constant | ✅ rules · 🟡 #6 explanation | MC, TF, EX | M10, M11 | — |
| `U4.rate-vs-position` | Heating speeds up both reactions — a different effect from the shift in position | Distinguish reaction-rate changes from equilibrium-position changes | ✅ (🟡 #24 wording) | TF, EX | M17 | — |

Note: A7 uses the three-position selector at 0, 25 and 100 °C (🟡 #9). The 0 °C description ("colourless" vs "almost colourless") is pending (🟡 #37).

## Unit 5 — Pressure, volume, partial pressure and K_p [§8]

| Concept ID | Concept | Learning objective | Status | Question slots | Misconceptions | Activities |
|---|---|---|---|---|---|---|
| `U5.pv` | For a fixed amount of gas at constant temperature, smaller volume → higher pressure | Explain the relationship between pressure and volume | 🟡 #18 (enriched) | MC, TF | — | A8 🔬 |
| `U5.gas-moles` | Compression favours fewer gaseous moles; count gaseous species only | Predict the effect of compression or expansion; compare gaseous moles | ✅ (🟡 #19 reasoning wording) | PV, PS, EX | M12, M13 | A8 |
| `U5.equal-moles` | Equal gaseous moles: no shift, but concentrations / partial pressures still change | Recognise equal-gas-mole cases | ✅ rule · 🟡 #20 explanation | PV, TF | M14 | A8 |
| `U5.no-k-change` | Pressure or volume change does not change K_c or K_p at constant temperature | (part of §8 outcomes) | ✅ | TF, MC | — | — |
| `U5.total-pressure` | P_total = sum of partial pressures | Calculate total pressure from partial pressures | ✅ (supplied example 2 + 5 + 7 = 14 atm) | CALC | — | A9 🧩 |
| `U5.kp-construct` | K_p expression from partial pressures, coefficients as powers | Construct K_p expressions | ✅ (🟡 #28 phase step) | KP | M5 | A9 |
| `U5.kp-calc` | Calculate K_p | Use K_p expressions | ✅ N₂/O₂/NO₂ example (K_p = 20) · 🟡 #13, #14, #29 HCl example · 🟡 #11, #12 units and rounding | CALC (approved example only; no auto-grading of units or rounding) | — | A9 |

Note: gas added at constant volume is out of scope unless approved (🟡 #39).

## Unit 6 — The role of a catalyst [§9]

| Concept ID | Concept | Learning objective | Status | Question slots | Misconceptions | Activities |
|---|---|---|---|---|---|---|
| `U6.pathway` | Alternative pathway with lower activation energy | Explain that a catalyst provides an alternative pathway with lower activation energy | ✅ | MC, EP | — | A10 🔬 |
| `U6.both-rates` | Increases both forward and backward rates; both barriers lowered by the same amount | Explain that it increases forward and backward reaction rates | ✅ (🟡 #23 wording) | MC, EP, TF | M16 | A10 |
| `U6.no-shift` | No change to equilibrium position, K, ΔH or energy levels | Explain why it does not change the equilibrium position or constant | ✅ | TF, EX | M15 | A10 |
| `U6.faster` | Equilibrium is reached sooner | Explain that equilibrium is reached faster | ✅ | MC, TF | M17 | A10 |

Note: the reaction named in A10 is pending (🟡 #15, #32). The SO₃ example is not assigned to it.

---

## Activities summary (proposed classification)

| # | Activity [§13] | Proposed type | Main concepts | Status |
|---|---|---|---|---|
| A1 | Dynamic equilibrium from reaction start | 🔬 Simulation | U0.dynamic, U0.rates-not-conc, U2.rate-graph | 🟡 #7 |
| A2 | Le Chatelier concentration model / lab | 🔬 Simulation | U1.* | ✅ |
| A3 | FeCl₃ / thiocyanate colour investigation | 🧪 Virtual lab | U1.conc-shift, U2.fescn-colour | ✅ (🟡 #21 colour wording) |
| A4 | HI concentration–time graph | — | U2.hi-graph | ⛔ HOLD |
| A5 | K_c expression builder | 🧩 Interactive tool | U3.kc-construct, U3.phases | ✅ |
| A6 | K_c guided calculator / equilibrium check | 🧩 Interactive tool | U3.kc-calc, U3.eq-check | ⛔ HOLD |
| A7 | NO₂ / N₂O₄ temperature investigation (0, 25, 100 °C) | 🧪 Virtual lab | U4.* | 🟡 #9, #37 |
| A8 | Piston pressure model | 🔬 Simulation | U5.pv, U5.gas-moles, U5.equal-moles | ✅ |
| A9 | K_p builder and calculator | 🧩 Interactive tool | U5.total-pressure, U5.kp-* | ✅ (HCl mode 🟡) |
| A10 | Catalyst energy-profile explorer | 🔬 Simulation | U6.* | 🟡 #15, #32 |

## Misconceptions (from §11)

M1 Equilibrium does not mean the reaction has stopped · M2 Equal rates ≠ equal concentrations · M3 Equilibrium requires a closed system · M4 A shift does not completely cancel the disturbance · M5 Coefficients become exponents · M6 Pure solids and liquids are omitted · M7 Vapour is a gas and is included · M8 No universal K_c > 1 cutoff · M9 Size of K does not mean fast or slow · M10 Concentration change does not change K_c · M11 Temperature can change K · M12 Pressure rules apply to gaseous equilibria and volume-caused changes · M13 Count only gaseous species · M14 Equal gas moles: no shift, but concentrations can change · M15 A catalyst does not shift equilibrium or change K · M16 A catalyst lowers both barriers · M17 Rate and equilibrium position are different ideas · M18 Particles must not merge in animations (design rule, not assessed)

## Summary

- **Concepts mapped:** 35 (Unit 0: 4 · Unit 1: 4 · Unit 2: 6 · Unit 3: 6 · Unit 4: 4 · Unit 5: 7 · Unit 6: 4).
- **Assessable now (approved, or approved with only a wording flag):** most concepts. **Not assessable while on hold:** `U2.hi-graph`, `U3.kc-calc`, `U3.eq-check`.
- **Unit 3 has no approved numerical K_c example.** Its "Calculate" stage is skipped until the HI data are resolved, as the specification requires (§0 rule 9, §12).

## Next step: mastery criteria (not yet proposed)

After you approve this mapping, I will propose weak / developing / mastered criteria for your review. **No percentages or minimum question counts have been chosen.** The proposal will explain:
- How many questions each concept needs for a dependable rating, given how many concepts the pre-test must cover in a reasonable time.
- How question difficulty and misconception-revealing wrong answers are treated.
- How newer formative evidence relates to the pre-test result.
- How the criteria interact with the approved pathway thresholds (D4) without changing them.

## Questions for the owner

1. Are these concepts the right grain? Should any be merged or split?
2. Confirm the activity classifications, especially A2 as a simulation (not a lab) and A5/A6/A9 as "interactive tools".
3. Should `U0.closed-system` and `U5.pv` (pending wording) be assessed in the diagnostic once their wording is approved?
