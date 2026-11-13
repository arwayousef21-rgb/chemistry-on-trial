# CHEMISTRY ON TRIAL
## Revised Scientific Content & Learning Specification
**Arabic title:** الكيمياء في قفص الاتهام  
**Lesson:** Chemical Equilibrium — How Do Reversible Reactions Respond to Change?  
**Audience:** Egyptian secondary-school students  
**Languages:** Arabic and English  
**Status:** Revised draft — teacher confirmation required for explicitly flagged items

---

# 0. Instructions for Claude Code

This is the revised scientific specification for the Chemistry on Trial website. Use it together with `Claude_Project_Handoff.md` for implementation.

## Authority and safety rules

1. This document is the current scientific content specification. Follow its decisions and unresolved-item labels.
2. Do not invent or infer missing temperatures, initial conditions, experimental measurements, equilibrium constants, units, rounding tolerances, or teacher-approved terminology.
3. Do not silently resolve any item labelled **TEACHER CONFIRMATION REQUIRED**.
4. Items labelled **HOLD — NOT FOR STUDENT DISPLAY** must not appear as settled student-facing content, calculations, graph data, or answer keys until confirmed.
5. Distinguish:
   - **Core lesson content:** concepts and rules in the supplied lesson.
   - **Enriched explanation:** explanatory reasoning added to make those concepts understandable.
   - **Conceptual simulation:** qualitative model, not measured experimental data or a validated quantitative simulation.
6. Do not claim a simulation calculates exact rates, concentrations, yields, absorbance, or equilibrium composition unless a validated quantitative model and approved data are supplied.
7. Preserve all chemical formulas, coefficients, charges, phase labels, and numerical values unless this document explicitly flags them for confirmation.
8. Arabic pages must use RTL layout. Chemical equations, formulas, symbols, and mathematical expressions must remain correctly ordered LTR within Arabic text.
9. Build all six units, but do not force a “Calculate” step into units where no approved numerical data are available.
10. Never let visual effects override scientific accuracy.

---

# 1. Lesson overview

The lesson explains how reversible chemical systems reach dynamic equilibrium and how equilibrium responds to changes in concentration, temperature, pressure, volume, and the presence of a catalyst.

The learner journey is:

**Investigate → Predict → Model → Calculate (where appropriate) → Apply → Assess → Verdict**

The website must teach the whole lesson, not merely display definitions or decorative animations.

## Core learning outcomes

Students should be able to:
- Explain dynamic chemical equilibrium.
- State and apply Le Chatelier’s principle.
- Explain the school-level law of mass action used in the lesson.
- Construct and use \(K_c\) expressions.
- Explain the effect of temperature on equilibrium position and equilibrium constant.
- Explain the effect of pressure and volume on gaseous equilibria.
- Construct and use \(K_p\) expressions.
- Explain how a catalyst affects reaction rates and equilibrium.
- Interpret the relevant concentration, rate, temperature, pressure, and energy diagrams.
- Support predictions and calculations with scientific reasoning.

---

# 2. Dynamic chemical equilibrium

## 2.1 Reversible reactions

A reversible reaction can proceed in both the forward and backward directions.

General representation:

\[
aA+bB \rightleftharpoons cC+dD
\]

Use clear direction labels:
- Forward reaction: left to right.
- Backward reaction: right to left.

## 2.2 Dynamic equilibrium

At equilibrium:
- The forward reaction continues.
- The backward reaction continues.
- The forward and backward reaction rates are equal.
- Concentrations remain constant with time, provided the system remains under unchanged conditions.
- Concentrations are not necessarily equal.

**Important enriched explanation:** Equilibrium is dynamic, not static. Equal rates mean that the two opposing processes occur at the same rate; they do not mean that the amounts or concentrations of reactants and products are equal.

## 2.3 Closed-system condition

**Enriched explanation:** The lesson should state that chemical equilibrium is established in a closed system. A closed system prevents substances from entering or leaving in a way that changes the composition of the reacting system.

This helps explain why concentrations can remain constant at equilibrium. If a product gas escapes, the composition may change and the system may no longer remain at the same equilibrium state.

**Teacher confirmation required:** Approve the exact Arabic and English wording of the closed-system definition before publication.

## 2.4 Required dynamic-equilibrium activity

Create a new simulation that starts before equilibrium is established and shows the system approaching equilibrium.

The activity must show:
- Initially, the forward and backward rates are different.
- As the reaction proceeds, the forward rate changes and the backward rate develops/increases.
- The rates eventually become equal.
- Reactant and product concentrations approach constant values.
- The final reactant and product concentrations are not required to be equal.

Use qualitative curves unless teacher-approved numerical data are supplied. Label the graph **conceptual / illustrative**.

The simulation must visually distinguish:
1. Rate-versus-time graph.
2. Concentration-versus-time graph.

Do not invent numerical axis values.

---

# 3. Unit One — Le Chatelier’s Principle

## Learning outcomes

Students should be able to:
- State Le Chatelier’s principle.
- Predict the direction of equilibrium shift after a concentration change.
- Explain the response in terms of opposing the imposed change.

## Principle

When a system at equilibrium is subjected to a change in concentration, pressure, or temperature, the equilibrium shifts in the direction that tends to oppose the effect of the imposed change.

The system does not necessarily cancel the disturbance completely. It responds and establishes a new equilibrium.

## Concentration effects

For:

\[
aA+bB \rightleftharpoons cC+dD
\]

| Applied change | Direction of shift |
|---|---|
| Increase a reactant concentration | Forward, toward products |
| Decrease a reactant concentration | Backward, toward reactants |
| Increase a product concentration | Backward, toward reactants |
| Decrease a product concentration | Forward, toward products |

Explain each case by showing how the system consumes some of an added substance or replaces some of a removed substance.

## Replacement for the water-vessel analogy

The previous connected-vessel analogy is **removed**. Do not use it in the website: it can incorrectly suggest that equilibrium means equal concentrations and does not adequately show two opposing chemical processes.

Replace it with a molecular dynamic-equilibrium model:
- Show distinct reactant and product particles.
- Show forward and backward conversions continuing.
- Use two clearly labelled directional counters or rate indicators.
- At equilibrium, both directions remain active and their rates are equal.
- The relative numbers of reactant and product particles may be different.
- After a disturbance, show a new balance rather than a return to the original state.

This is a conceptual particle model. Do not imply that particles physically merge or that the displayed particle count is a quantitative experimental result.

## Concentration investigation

Create an interactive concentration lab:
- Start at equilibrium.
- Let the learner add or remove a reactant or product.
- Ask the learner to predict the shift.
- Animate a qualitative response toward a new equilibrium.
- Explain why the system shifts in that direction.
- Keep both forward and backward processes visible.

---

# 4. Unit Two — Law of Mass Action and reaction rates

## Learning outcomes

Students should be able to:
- Relate concentration to reaction rate using the school-level treatment in this lesson.
- Write forward and backward rate expressions for the specified example.
- Explain how equality of rates at equilibrium leads to the equilibrium-constant expression.

## School-level law of mass action example

For:

\[
FeCl_3(aq)+3NH_4SCN(aq)
\rightleftharpoons
Fe(SCN)_3(aq)+3NH_4Cl(aq)
\]

Forward rate expression:

\[
r_f=k_f[FeCl_3][NH_4SCN]^3
\]

Backward rate expression:

\[
r_b=k_b[Fe(SCN)_3][NH_4Cl]^3
\]

At equilibrium:

\[
r_f=r_b
\]

Therefore:

\[
k_f[FeCl_3][NH_4SCN]^3
=
k_b[Fe(SCN)_3][NH_4Cl]^3
\]

Rearranging:

\[
K_c=\frac{k_f}{k_b}
=
\frac{[Fe(SCN)_3][NH_4Cl]^3}
{[FeCl_3][NH_4SCN]^3}
\]

Explain:
- Square brackets represent concentration in the lesson’s notation.
- \(k_f\) is the forward rate constant.
- \(k_b\) is the backward rate constant.
- The balanced-equation coefficients appear as powers in this school-level treatment.

**Scientific limitation:** Do not present this coefficient-based rate expression as a universal rate law for every reaction mechanism. Describe it as the school-level treatment used for this lesson’s example.

## Fe(III)-thiocyanate colour investigation

Retain the lesson’s school-level equation as the model:

\[
FeCl_3(aq)+3NH_4SCN(aq)
\rightleftharpoons
Fe(SCN)_3(aq)+3NH_4Cl(aq)
\]

Qualitative lesson model:
- Adding \(FeCl_3\) increases a reactant concentration and shifts the equilibrium forward.
- The red colour becomes deeper in the model.
- Adding \(NH_4Cl\) increases a product concentration and shifts the equilibrium backward.
- The red colour becomes paler in the model.

**Teacher awareness:** In aqueous chemistry, the coloured species is commonly represented by an iron(III)-thiocyanate complex, often written \([Fe(SCN)]^{2+}\), while ammonium and chloride ions are spectator ions. Chloride complexation can affect the observed colour when ammonium chloride is added. Keep the lesson’s supplied equation as the school-level model unless the teacher explicitly approves a different treatment. Do not teach the simplified equation as a complete description of all aqueous speciation.

**Teacher confirmation required:** Confirm the exact colour descriptions used in the taught lesson before making colour labels more specific than “deeper red” and “paler red”.

## Rate and concentration graphs

Teach both types of graphs before assessing them.

### Rate-versus-time graph

Show the forward and backward rates approaching equality. At equilibrium:
- Both rates are non-zero.
- The rates are equal.
- The reaction continues in both directions.

Use qualitative curves unless approved numerical data are supplied.

### Concentration-versus-time graph for HI removal

**HOLD — NOT FOR STUDENT DISPLAY UNTIL THE HI DATA ISSUE IN SECTION 6 IS RESOLVED.**

When approved, the conceptual sequence should show:
- A sudden decrease in \([HI]\) at the instant HI is removed.
- \([H_2]\) and \([I_2]\) do not undergo the same sudden removal.
- The forward reaction becomes temporarily favoured because removing HI slows the backward reaction.
- During the response, \([H_2]\) and \([I_2]\) decrease gradually as they are consumed.
- \([HI]\) gradually increases from its post-removal value.
- The forward and backward rates become equal again at the new equilibrium.

For the reaction:

\[
H_2(g)+I_2(g)\rightleftharpoons2HI(g)
\]

The stoichiometric changes during the forward reaction are in the ratio:
- 1 unit decrease in \(H_2\)
- 1 unit decrease in \(I_2\)
- 2 units increase in HI

Do not assign numerical graph values until the teacher confirms which approved data set to use. If a purely illustrative graph is used, label it clearly as illustrative and do not connect it to the unresolved worked-example values.

---

# 5. Unit Three — Equilibrium constant \(K_c\)

## Learning outcomes

Students should be able to:
- Construct \(K_c\) expressions from balanced equations.
- Use coefficients as powers.
- Exclude pure solids and pure liquids in the lesson’s equilibrium expressions.
- Substitute equilibrium concentrations and calculate \(K_c\).
- Compare a calculated reaction expression with the stated equilibrium constant to decide whether the mixture is at equilibrium.
- Apply the reversal and coefficient-multiplication rules.

## General expression

For:

\[
aA+bB \rightleftharpoons cC+dD
\]

\[
K_c=\frac{[C]^c[D]^d}{[A]^a[B]^b}
\]

Construction steps:
1. Put products in the numerator.
2. Put reactants in the denominator.
3. Use each balanced-equation coefficient as the power.
4. Omit pure solids and pure liquids, according to the lesson convention.
5. Substitute equilibrium concentrations.
6. Show the arithmetic and final answer.

## Why pure solids and pure liquids are omitted

**Enriched explanation:** The concentration of a pure solid or pure liquid remains effectively constant while that pure phase is present. Its constant contribution is incorporated into the equilibrium constant, so it is not written as a variable concentration term in the expression.

**Teacher confirmation required:** Approve the exact school-level wording before publication.

## State symbols

Include a small reference glossary:
- (s): solid
- (l): liquid
- (g): gas
- (aq): aqueous solution
- (v): vapour

Explain that (v) denotes the vapour phase. For equilibrium-expression construction, a vapour is gaseous and is included in the expression; a pure liquid is omitted under the lesson convention.

## Examples of \(K_c\) expressions

### Example A — Water vapour decomposition

\[
2H_2O(v)\rightleftharpoons2H_2(g)+O_2(g)
\]

\[
K_c=\frac{[H_2]^2[O_2]}{[H_2O]^2}
\]

Water is written as vapour, so it is included in this expression.

### Example B — Ammonia vaporization

\[
NH_3(l)\rightleftharpoons NH_3(g)
\]

Under the lesson convention, the pure liquid is omitted:

\[
K_c=[NH_3]
\]

### Example C — Iodine reaction

\[
3I_2(s)+3H_2O(l)
\rightleftharpoons
5I^-(aq)+IO_3^-(aq)+6H^+(aq)
\]

\[
K_c=[I^-]^5[IO_3^-][H^+]^6
\]

Pure solid iodine and pure liquid water are omitted.

## HI numerical example

**HOLD — NOT FOR STUDENT DISPLAY UNTIL TEACHER CONFIRMS THE TEMPERATURE / DATASET.**

Reaction:

\[
H_2(g)+I_2(g)\rightleftharpoons2HI(g)
\]

One supplied worked example gives:

\[
[H_2]=0.221\,M,\quad [I_2]=0.221\,M,\quad [HI]=1.563\,M
\]

\[
K_c=\frac{[HI]^2}{[H_2][I_2]}
=\frac{(1.563)^2}{(0.221)(0.221)}
\approx50.02\approx50
\]

A separate equilibrium-check example uses a stated \(K_c=55.16\) and gives:

\[
[H_2]=1.0\times10^{-3}\,M
\]

\[
[I_2]=1.5\times10^{-3}\,M
\]

\[
[HI]=5.0\times10^{-3}\,M
\]

The calculated expression is:

\[
\frac{[HI]^2}{[H_2][I_2]}
=
\frac{(5.0\times10^{-3})^2}
{(1.0\times10^{-3})(1.5\times10^{-3})}
=16.67
\]

Since \(16.67\ne55.16\), the mixture is not at equilibrium according to the supplied comparison.

**Unresolved inconsistency:** The two examples use different \(K_c\) values for the same reaction, and neither supplied example states its temperature. Since \(K_c\) depends on temperature, do not present both values as belonging to the same temperature. The teacher has selected “review”: retain both data sets in the internal content record, but hold both HI activities and worked examples from student-facing publication until the source data and temperature conditions are checked.

**No invented resolution:** Do not invent a temperature, replace either constant, or merge the examples.

## Meaning of \(K_c\)

The original shortcut “\(K_c>1\) means products predominate” is not reliable as a universal rule, particularly when stoichiometric coefficients differ and concentration units affect the numerical value.

For the student-facing explanation:
- Explain that \(K_c\) describes the equilibrium composition at a specified temperature.
- A very large value generally indicates a product-favoured equilibrium.
- A very small value generally indicates a reactant-favoured equilibrium.

**Teacher confirmation required:** Confirm whether this qualitative “very large / very small” interpretation is approved for the course, and whether the “near 1” statement should be omitted. Do not use a hard universal cutoff at exactly 1 without teacher approval.

Do not tell students that \(K_c\) alone predicts the immediate direction after a disturbance. That requires comparing the current composition with the equilibrium condition. The reaction quotient \(Q\) is not automatically part of this lesson.

## Comparing a reaction expression with \(K_c\)

Teach the supplied equilibrium-check method:
- Calculate the concentration expression using the current mixture.
- Compare it with the stated \(K_c\) at the same temperature.
- If the values are unequal, the mixture is not at equilibrium.

Do not add a direction prediction or introduce \(Q\) unless the teacher approves it as an extension.

## Reversing and multiplying an equation

If the reaction is reversed:

\[
K_{reverse}=\frac{1}{K_{forward}}
\]

If all coefficients are multiplied by \(n\):

\[
K_{new}=(K_{original})^n
\]

Teach the operations separately. Include worked examples only after teacher-approved values and examples are supplied. Do not invent new constants for the activity.

## Interactive \(K_c\) builder

The builder must:
- Place products in the numerator and reactants in the denominator.
- Apply coefficients as powers.
- Omit pure solids and pure liquids.
- Include vapour-phase substances.
- Explain each decision.
- Provide a guided substitution mode only with approved numerical data.
- Include an equilibrium-check mode only with approved \(K_c\), temperature context, and concentration data.

---

# 6. HI data and notation — explicit teacher hold

This section records the teacher’s selected decision: **review the HI example, do not discard it and do not assume it is correct as a complete dataset.**

## Confirmed mathematical points

For:

\[
H_2(g)+I_2(g)\rightleftharpoons2HI(g)
\]

The correct equilibrium expression is:

\[
K_c=\frac{[HI]^2}{[H_2][I_2]}
\]

The exponent 2 comes from the coefficient of HI. The arithmetic in the worked example recalculates to approximately 50.02.

## Unresolved points

1. The worked example gives \(K_c\approx50\).
2. The equilibrium-check example uses \(K_c=55.16\).
3. Neither example supplies the temperature.
4. The source material must be checked to determine whether the values refer to different temperatures, separate datasets, or a transcription/context difference.

**Do not publish the HI worked calculation, equilibrium-check activity, or HI concentration graph as finalized student content until the teacher confirms the intended context.**

## State notation decision

Use (g) consistently for gases in the website’s standard notation. Explain that (v) means vapour and represents the gas phase. If the teacher requires preserving (v) in a specific textbook equation, retain it there and explain it in the state-symbol glossary.

Do not imply that (g) and (v) are different physical phases.

---

# 7. Unit Four — Temperature and equilibrium

## Learning outcomes

Students should be able to:
- Identify exothermic and endothermic forward reactions.
- Represent heat on the product or reactant side as appropriate.
- Predict the effect of increasing or decreasing temperature on equilibrium position.
- Explain the effect of temperature on the equilibrium constant.
- Distinguish reaction-rate changes from equilibrium-position changes.

## Heat representation

For an exothermic forward reaction, heat is represented on the product side.

For an endothermic forward reaction, heat is represented on the reactant side.

A negative \(\Delta H\) indicates an exothermic forward reaction: heat is released. A positive \(\Delta H\) indicates an endothermic forward reaction.

**Teacher confirmation required:** Decide whether the ammonia example should display both “+ Heat” and \(\Delta H=-92\,kJ\), or use one representation to avoid students thinking heat is counted twice. Confirm the unit convention used in the course.

## Temperature shift rules

| Forward reaction | Increase temperature | Decrease temperature |
|---|---|---|
| Exothermic | Shifts backward | Shifts forward |
| Endothermic | Shifts forward | Shifts backward |

## Temperature and equilibrium constant

- Increasing temperature decreases \(K_c\) for an exothermic forward reaction.
- Increasing temperature increases \(K_c\) for an endothermic forward reaction.
- Changing concentration at constant temperature does not change the value of \(K_c\).
- Changing temperature can change \(K_c\).

**Enriched explanation:** The forward and backward rate constants are temperature-dependent. At a fixed temperature, their ratio for the equilibrium system determines \(K_c\). Changing concentration changes the reaction mixture and can shift the equilibrium, but does not change \(K_c\) if temperature is unchanged. Changing temperature changes the rate constants and therefore can change \(K_c\).

The “heat as reactant/product” model helps predict the direction of shift. Do not use it to imply that heat behaves exactly like an ordinary concentration change: changing temperature changes the equilibrium constant itself.

## Temperature and reaction rate

Heating generally increases both forward and backward reaction rates. This is separate from the equilibrium-position rule:
- The system can reach equilibrium faster.
- The equilibrium position shifts toward the endothermic direction.

Teach these as two distinct effects.

## Example — ammonia synthesis

\[
N_2(g)+3H_2(g)\rightleftharpoons2NH_3(g)+Heat
\]

The forward reaction is exothermic. The supplied enthalpy value is:

\[
\Delta H=-92\,kJ
\]

- Increasing temperature shifts equilibrium backward and decreases the equilibrium yield of ammonia.
- Decreasing temperature shifts equilibrium forward and increases the equilibrium yield of ammonia.

## Example — nitrogen dioxide / dinitrogen tetroxide

\[
2NO_2(g)\rightleftharpoons N_2O_4(g)+Heat
\]

- \(NO_2\) is reddish-brown.
- \(N_2O_4\) is colourless.
- Heating favours the endothermic reverse direction and produces more reddish-brown \(NO_2\).
- Cooling favours the exothermic forward direction and produces more \(N_2O_4\).

The supplied qualitative observations are:
- \(0^\circ C\): described in the source as colourless.
- \(25^\circ C\): pale brown.
- \(100^\circ C\): reddish-brown.

**Teacher confirmation required:** Confirm whether the student-facing phrase at \(0^\circ C\) should remain “colourless” or be changed to “almost colourless”. If the particle model is used, it should still show a small amount of \(NO_2\) if the teacher approves that interpretation.

## Temperature simulation

Use a three-position selector, not an unrestricted continuous slider:
- \(0^\circ C\)
- \(25^\circ C\)
- \(100^\circ C\)

Show only the supplied qualitative colour descriptions at these three positions. Do not invent intermediate colour values. If a continuous slider is later desired, all intermediate colours must be labelled illustrative and must not be presented as measured observations.

---

# 8. Unit Five — Pressure, volume, partial pressure and \(K_p\)

## Learning outcomes

Students should be able to:
- Explain the relationship between pressure and volume for a gas at constant temperature and fixed amount of gas.
- Predict the effect of compression or expansion on gaseous equilibrium.
- Compare the total number of gaseous moles on both sides.
- Recognize equal-gas-mole cases where pressure/volume change does not shift equilibrium.
- Calculate total pressure from partial pressures.
- Construct and use \(K_p\) expressions.

## Pressure-volume relationship

**Enriched explanation:** For a fixed amount of gas at constant temperature, decreasing the container volume increases the gas pressure; increasing the volume decreases the pressure.

## Effect on gaseous equilibrium

- Increasing pressure by decreasing volume shifts equilibrium toward the side with fewer gaseous moles.
- Decreasing pressure by increasing volume shifts equilibrium toward the side with more gaseous moles.
- If the total number of gaseous moles is equal on both sides, changing pressure by changing volume does not shift the equilibrium position.

Count only gaseous species. Do not count solids, liquids, or aqueous species.

## Why compression favours fewer gaseous moles

**Enriched explanation:** When a gaseous equilibrium is compressed, the pressure rises. A shift toward the side with fewer gaseous molecules tends to oppose that pressure increase. This is the basis of the school-level prediction rule.

## What pressure change does not do

At constant temperature, changing pressure or volume does not change the value of the equilibrium constant \(K_c\) or \(K_p\).

A compression can increase the concentrations/partial pressures of gases even in a case where the equilibrium position does not shift. Therefore “no shift” does not mean “nothing changes”.

**Scope limitation:** The pressure rules in this unit concern pressure changes caused by changing volume. Adding an inert or reactive gas at constant volume is not included unless the teacher explicitly approves it.

## Example — ammonia synthesis

\[
N_2(g)+3H_2(g)\rightleftharpoons2NH_3(g)
\]

There are four gaseous moles on the left and two on the right.
- Compression / increased pressure favours products.
- Expansion / decreased pressure favours reactants.

## Equal gaseous-mole example

\[
CO(g)+NO_2(g)\rightleftharpoons CO_2(g)+NO(g)
\]

There are two gaseous moles on each side. Changing pressure by changing volume does not shift the equilibrium position. Compression still changes gas concentrations/partial pressures.

## Partial pressure and total pressure

\[
P_{total}=P_1+P_2+\cdots+P_n
\]

Supplied example:

\[
P_{total}=2+5+7=14\,atm
\]

A partial pressure is the pressure contribution of one gas in a mixture.

## Equilibrium constant \(K_p\)

For:

\[
aA(g)+bB(g)\rightleftharpoons cC(g)+dD(g)
\]

\[
K_p=\frac{(P_C)^c(P_D)^d}{(P_A)^a(P_B)^b}
\]

Use partial pressures and the balanced-equation coefficients as powers.

## Worked example — HCl equilibrium

Reaction:

\[
2HCl(g)\rightleftharpoons H_2(g)+Cl_2(g)
\]

Supplied values:

\[
K_p=2.45\times10^{-7}
\]

\[
P_{HCl}=7\,atm
\]

Expression:

\[
K_p=\frac{P_{H_2}P_{Cl_2}}{(P_{HCl})^2}
\]

Therefore:

\[
P_{H_2}P_{Cl_2}
=K_p(P_{HCl})^2
\]

\[
=(2.45\times10^{-7})(7)^2
\]

\[
\approx1.2\times10^{-5}\,atm^2
\]

If the two product partial pressures are equal:

\[
P_{H_2}=P_{Cl_2}
=\sqrt{1.2\times10^{-5}}
\]

\[
P_{H_2}=P_{Cl_2}
\approx3.46\times10^{-3}\,atm
\]

**Teacher confirmation required before student publication:**
- Confirm the exact question wording.
- Confirm that \(7\,atm\) is the equilibrium partial pressure of HCl.
- Confirm the initial mixture condition. Equality of the two product partial pressures requires an appropriate starting condition, such as starting with pure HCl and no initial products.
- Confirm whether students are also expected to calculate total pressure.
- Ensure the value \(2.45\times10^{-7}\) is attached only to the reaction direction written above.

The reverse reaction:

\[
H_2(g)+Cl_2(g)\rightleftharpoons2HCl(g)
\]

has the reciprocal equilibrium constant. Do not attach \(2.45\times10^{-7}\) to this reverse direction.

## Worked example — \(K_p\) calculation

For:

\[
N_2(g)+2O_2(g)\rightleftharpoons2NO_2(g)
\]

Given:
- \(P_{N_2}=0.2\,atm\)
- \(P_{O_2}=1\,atm\)
- \(P_{NO_2}=2\,atm\)

\[
K_p=\frac{(P_{NO_2})^2}{P_{N_2}(P_{O_2})^2}
\]

\[
K_p=\frac{(2)^2}{(0.2)(1)^2}=20
\]

## \(K_p\) units and rounding

**TEACHER CONFIRMATION REQUIRED — DO NOT GRADE UNIT FORMATS OR ROUNDING AUTOMATICALLY UNTIL CONFIRMED.**

The source specification does not establish:
- Whether the course writes \(K_c\) and \(K_p\) with units or without units.
- The required rounding convention.
- The acceptable numerical tolerance for auto-marking.

Until confirmed:
- Show units attached to supplied pressures and concentrations during substitution.
- Do not impose a universal unit on the final equilibrium constant.
- Accept exact arithmetic where possible.
- Do not reject a numerically equivalent rounded answer using an invented tolerance.
- Mark numerical auto-grading for these examples as teacher-configurable / pending.

## Pressure simulation

Create a piston-and-cylinder model:
- Use named reactions explicitly.
- Use \(N_2+3H_2\rightleftharpoons2NH_3\) for the unequal gas-mole case.
- Use \(CO+NO_2\rightleftharpoons CO_2+NO\) for the equal gas-mole case.
- Show compression and expansion.
- Keep forward and backward reaction events active at equilibrium.
- Show changes in relative populations without particles merging or fusing.
- In the equal-mole case, show concentrations/partial pressures changing while the equilibrium position does not shift.

The particle animation is conceptual, not quantitative.

---

# 9. Unit Six — The role of a catalyst

## Learning outcomes

Students should be able to:
- Explain that a catalyst provides an alternative pathway with lower activation energy.
- Explain that it increases forward and backward reaction rates.
- Explain why it does not change the equilibrium position or equilibrium constant.
- Explain that equilibrium is reached faster.

## Core explanation

A catalyst:
- Provides an alternative reaction pathway.
- Lowers activation energy.
- Increases the rates of both forward and backward reactions.
- Does not change reactant or product energy levels.
- Does not change \(\Delta H\).
- Does not change the equilibrium constant or equilibrium position.
- Allows equilibrium to be reached sooner.

## Energy-profile diagram

Show both pathways on one diagram:
- Same reactant energy level.
- Same product energy level.
- Higher activation-energy peak without catalyst.
- Lower activation-energy peak with catalyst.
- The catalyst lowers the forward and backward activation-energy barriers by the same amount.
- The energy difference between reactants and products remains unchanged.

This explains why both rates increase but the equilibrium position does not change.

## Sulfur trioxide example

Preserve the equation:

\[
SO_3(g)\rightleftharpoons SO_2(g)+\frac{1}{2}O_2(g)
\]

The supplied lesson identifies the forward reaction as endothermic.

**Teacher confirmation required:** Confirm the intended teaching use of this reaction. If it is used for the energy-profile diagram, products must be shown at a higher energy level than reactants for the endothermic forward direction. Do not create a \(K\) expression with a fractional exponent or a new worked calculation unless the teacher confirms that this is required.

## Catalyst simulation

Create a toggle:
- Catalyst off: higher activation-energy peak and slower approach to equilibrium.
- Catalyst on: lower activation-energy peak and faster approach to equilibrium.
- Keep reactant/product energy levels fixed.
- Keep final equilibrium composition unchanged.
- Label any timeline values illustrative unless approved values are supplied.

**Teacher confirmation required:** Confirm which reaction, if any, should be named in the catalyst simulation. Do not silently assign the SO₃ example to the animation.

---

# 10. Additional reaction examples — teacher approval required for student use

The following equations were included in the content inventory. Their presence here does not automatically approve them for student-facing practice.

### Nitrogen and oxygen forming nitric oxide

\[
N_2(g)+O_2(g)+Heat\rightleftharpoons2NO(g)
\]

Potential use: endothermic temperature reasoning.

### Hydrogen and chlorine forming hydrogen chloride

\[
H_2(g)+Cl_2(g)\rightleftharpoons2HCl(g)
\]

Potential use: reversible gaseous reaction and reaction-direction comparison. Ensure the associated equilibrium constant is reciprocal to the constant for the reverse reaction.

### Silver chloride equilibrium

\[
AgCl(s)\rightleftharpoons Ag^+(aq)+Cl^-(aq)
\]

Potential use: omission of a pure solid from an equilibrium expression.

### Calcium hydrogen carbonate decomposition

\[
Ca(HCO_3)_2(aq)\rightleftharpoons CaCO_3(s)+CO_2(g)+H_2O(l)
\]

Potential use: phase identification and equilibrium-expression construction. If used, explain that a gas may escape from an open system; equilibrium discussion requires the appropriate closed-system conditions.

### Nitrogen pentoxide decomposition

\[
2N_2O_5(g)\rightleftharpoons4NO_2(g)+O_2(g)
\]

Potential use: gaseous equilibrium and coefficient/exponent practice.

**Teacher confirmation required:** Approve which of these examples are student-facing, teacher-only, or excluded.

---

# 11. Scientific misconceptions to prevent

1. Equilibrium does not mean that the reaction has stopped.
2. Equal forward and backward rates do not mean equal concentrations.
3. Equilibrium requires a closed system under the conditions described in the lesson.
4. A shift does not completely cancel the disturbance; the system approaches a new equilibrium.
5. A coefficient becomes an exponent in the equilibrium expression.
6. Pure solids and pure liquids are omitted under the lesson convention because their concentrations are constant while the pure phase is present.
7. Vapour is a gas phase and is included in the equilibrium expression.
8. Do not use a universal \(K_c>1\) cutoff to claim products predominate without teacher-approved qualification.
9. A large or small equilibrium constant describes equilibrium composition; it does not by itself mean a reaction is fast or slow.
10. Changing concentration at constant temperature does not change \(K_c\).
11. Changing temperature can change the equilibrium constant.
12. Pressure/volume rules here apply to gaseous equilibria and pressure changes caused by volume changes.
13. Count only gaseous species when comparing gaseous mole numbers.
14. Equal gaseous mole counts mean no equilibrium-position shift due to a volume-induced pressure change, but gas concentrations/partial pressures can still change.
15. A catalyst does not shift equilibrium and does not change the equilibrium constant.
16. A catalyst lowers both forward and backward activation-energy barriers.
17. Reaction rate and equilibrium position are different ideas.
18. Conceptual particle animations are not molecular dynamics simulations; particles must not merge or fuse during compression.

---

# 12. Assessment blueprint

Build bilingual assessment across all six units.

Question types:
- Multiple choice.
- True/false with correction.
- Predict the equilibrium shift.
- Explain the scientific reason.
- Interpret rate-versus-time graphs.
- Interpret concentration-versus-time graphs.
- Construct \(K_c\) expressions.
- Construct \(K_p\) expressions.
- Calculate \(K_c\) and \(K_p\) using approved values.
- Compare a current concentration expression with a stated \(K_c\).
- Predict pressure/volume effects using gas-mole counts.
- Interpret catalyst energy profiles.

Each question should include:
- Stable question ID.
- Unit and learning outcome.
- Arabic and English wording.
- Question type and difficulty.
- Correct answer.
- Concise scientific explanation.
- Mark allocation where applicable.

Do not assess:
- HI numerical examples or HI graph values until the teacher resolves the data/temperature inconsistency.
- K units or rounding tolerances until approved.
- Unapproved additional reactions.
- Reaction quotient \(Q\) or direction prediction from \(Q\) unless approved.
- Constant-volume gas-addition scenarios unless approved.
- Numerical simulation values that have not been supplied or approved.

For units without approved calculations, skip the “Calculate” stage rather than inventing numbers.

---

# 13. Required interactive activities

1. Dynamic equilibrium from reaction start to equilibrium: show forward/backward rates and concentrations.
2. Le Chatelier concentration lab: add/remove reactants or products and predict the shift.
3. FeCl₃ / thiocyanate colour investigation: qualitative colour response, using the lesson’s school-level model.
4. HI concentration-time graph: keep hidden until the HI dataset and temperature are confirmed.
5. \(K_c\) expression builder: species placement, powers, phase rules.
6. \(K_c\) guided calculator: use only approved numerical examples; include equilibrium-check mode when approved.
7. \(NO_2/N_2O_4\) temperature investigation: three-position control at 0, 25 and 100 °C.
8. Piston pressure lab: compression/expansion, unequal and equal gas-mole cases.
9. \(K_p\) expression builder and calculator: include partial-pressure calculations; unknown-pressure mode only after teacher confirms the HCl question assumptions.
10. Catalyst energy-profile explorer: compare activation-energy pathways and time to equilibrium.

Each activity must include:
- Clear task and prediction prompt.
- Meaningful controls.
- Immediate explanatory feedback.
- Reset option.
- Arabic and English content.
- Keyboard and mobile accessibility.
- A visible conceptual/illustrative label wherever the display is not based on approved quantitative data.

---

# 14. Arabic scientific glossary — draft for teacher approval

Use this as a draft glossary only. The teacher must approve the exact terms to match the Egyptian textbook and classroom usage.

| English term | Draft Arabic equivalent |
|---|---|
| Chemical equilibrium | الاتزان الكيميائي |
| Dynamic equilibrium | الاتزان الديناميكي |
| Reversible reaction | التفاعل الانعكاسي |
| Forward reaction | التفاعل الطردي |
| Backward / reverse reaction | التفاعل العكسي |
| Equilibrium position | موضع الاتزان |
| Le Chatelier’s principle | مبدأ لوشاتيليه |
| Law of mass action | قانون فعل الكتلة |
| Equilibrium constant | ثابت الاتزان |
| Concentration | التركيز |
| Molar concentration | التركيز المولاري |
| Partial pressure | الضغط الجزئي |
| Total pressure | الضغط الكلي |
| Catalyst | العامل الحفاز |
| Activation energy | طاقة التنشيط |
| Exothermic reaction | تفاعل طارد للحرارة |
| Endothermic reaction | تفاعل ماص للحرارة |
| Closed system | نظام مغلق |
| Vapour | بخار |
| Aqueous solution | محلول مائي |

Equations and mathematical expressions must remain LTR within Arabic text. Direction labels must consistently define forward as left-to-right for the displayed equation.

---

# 15. Outstanding teacher decisions — do not guess

The following decisions remain open. Keep associated features configurable or on hold until answered.

## High priority
1. Confirm the temperature/data context for the two HI equilibrium constants (approximately 50 and 55.16).
2. Approve the final Arabic glossary and direction terminology.
3. Approve the closed-system explanation.
4. Approve the explanation for excluding pure solids and liquids.
5. Approve the state-symbol glossary, including (v).
6. Approve the explanation of why temperature changes \(K\) but concentration does not.
7. Approve the dynamic-equilibrium activity and qualitative rate graph.
8. Confirm that the assessment will teach rate graphs before testing them.
9. Approve the three-position NO₂/N₂O₄ temperature control.

## Medium priority
10. Confirm the interpretation of very large/very small \(K_c\) and whether “near 1” is used.
11. Confirm units convention for \(K_c\) and \(K_p\).
12. Confirm rounding and acceptable answer tolerance.
13. Confirm the exact HCl worked-question wording and initial conditions.
14. Confirm how the reverse HCl reaction is labelled.
15. Confirm the teaching purpose of the SO₃ reaction and whether it is used in the catalyst energy diagram.
16. Confirm whether the not-at-equilibrium example stops at that conclusion or teaches direction using \(Q\).
17. Approve which additional reactions in Section 10 are student-facing.
18. Add the pressure-volume reasoning.
19. Add why compression favours fewer gas moles.
20. Explain that pressure changes can alter concentrations without shifting equilibrium.
21. Confirm the colour description and coloured species in the Fe(III)-thiocyanate model.
22. Add the full qualitative HI graph only after the HI data hold is resolved.
23. Explain equal changes in forward/backward activation-energy barriers for a catalyst.
24. Explain temperature effects on rate separately from position.
25. Explain the sign of \(\Delta H\).
26. Supply approved worked examples for reversing/multiplying equilibrium equations, or keep these as teacher-led explanation.
27. Add an activity for the equilibrium-check calculation.
28. Decide whether the Kp builder should include non-gaseous phases or remove any irrelevant phase-identification step.
29. Decide whether to add an unknown-pressure mode for \(K_p\).
30. Do not force calculations into units without approved numerical data.
31. Approve the reaction/value pool for unfamiliar application questions.
32. Name the reaction used in each simulation.

## Low priority
33. Improve the opening definition of reversible reactions.
34. Include aqueous species in the pressure-mole-count misconception statement.
35. Retain the FeCl₃ equation as a school-level model with teacher-awareness note.
36. Confirm whether both \(\Delta H\) and “+ Heat” appear together.
37. Confirm “colourless” versus “almost colourless” at 0 °C.
38. Confirm whether irreversible reactions are contrasted in this lesson.
39. Confirm whether pressure change at constant volume is in scope.
40. Clarify that adding a pure solid/liquid does not shift equilibrium if the pure phase is already present, subject to the lesson’s scope.
41. Keep the piston model dynamically active at equilibrium.
42. Confirm the source of any numerical values used in the HI graph.

---

# 16. Final implementation instruction

Build a scientifically coherent, bilingual, interactive lesson. The learner must be able to observe the system, predict its response, understand the mechanism, construct the correct equilibrium expression, perform approved calculations, and explain the result.

Do not publish unresolved HI values, unapproved units, unapproved rounding rules, or teacher-pending statements as settled facts.

When an item is pending, either:
- keep the relevant component hidden from students,
- display a teacher-review placeholder in the development environment, or
- use a qualitative activity that does not depend on the unresolved data.

Scientific accuracy, conceptual clarity, and faithful teaching of the approved lesson take priority over visual effects.
