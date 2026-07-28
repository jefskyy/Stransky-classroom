<!--
---
id: m02-t03
title: Heat Engines and Thermal Efficiency
slug: heat-engines-thermal-efficiency
page_type: topic
visibility: public
nav_order: 30
module: 02-second-law
mlo:
  - MLO2
daily_los:
  - DLO-009
  - DLO-010
  - DLO-011
prerequisites:
  - thermal-energy-reservoirs
  - heat-and-work-interactions
  - thermodynamic-processes-and-cycles
estimated_time_minutes: 15
difficulty: intermediate
problem_families:
  - heat-engine-energy-flow
  - heat-engine-performance
  - kelvin-planck-claim-check
interactive_elements:
  - heat-engine-energy-flow-selector
assets:
  - assets/svg/second-law/heat-engine-energy-flow.svg
key_terms:
  - heat engine
  - power cycle
  - thermal efficiency
  - heat input
  - heat rejection
  - net work output
  - Kelvin-Planck statement
status: draft
version: 0.2.0
last_reviewed: 2026-07-28
authors:
  - name: Jeffrey Stransky
    role: course editor
reviewers: []
license: TBD
source_records:
  - SRC-MCET530-W2-NOTES
  - SRC-MCET530-EXAM1-2024
  - SRC-MCET530-W5-NOTES
accessibility_review: pending
technical_review: pending
---
-->
# Heat Engines and Thermal Efficiency

## Learning Objectives

By the end of this topic, you will be able to:

- construct and interpret an energy-flow diagram for a cyclic heat engine;
- calculate heat input, heat rejection, net work output, or thermal efficiency from the cycle energy balance; and
- interpret thermal efficiency as desired net work output divided by required heat input.

## Why This Matters

Power plants, vehicle engines, and many energy-conversion systems operate by receiving thermal energy at a high temperature, producing useful work, and rejecting the remaining heat at a lower temperature. Thermal efficiency quantifies the fraction of required heat input converted to net work output, but the Second Law prevents that fraction from reaching one for a cyclic heat engine.

## Prerequisite Check

1. Why is $\Delta E_{cycle}=0$ for a complete thermodynamic cycle?
2. Which reservoir is labeled $T_H$ and which is labeled $T_L$?
3. What is the difference between an energy quantity such as $Q_H$ and an energy-transfer rate such as $\dot Q_H$?

## Core Theoretical Concepts

### Required Features of a Heat Engine

A **heat engine** is a cyclic device that converts part of a heat input into net work output. A valid heat-engine model includes all four features:

1. heat received from a high-temperature reservoir;
2. net work produced by the cyclic device;
3. heat rejected to a low-temperature reservoir; and
4. cyclic operation, so the working fluid returns to its initial state.

Using positive magnitudes:

- $Q_H$ enters the heat engine from the high-temperature reservoir;
- $W_{net,out}$ leaves the heat engine as useful work; and
- $Q_L$ leaves the heat engine and enters the low-temperature reservoir.

### The Cycle Energy Balance

Because the working fluid returns to its initial state after a complete cycle, its stored energy has no net change:

$$
\Delta E_{cycle}=0.
$$

The heat received must therefore equal the sum of the net work output and the heat rejected:

$$
Q_H=W_{net,out}+Q_L.
$$

Energy is not destroyed in the conversion. The portion that does not become net work is rejected as heat.

### Thermal Efficiency as Desired Divided by Required

The desired energy result of a heat engine is net work output. The required energy input is heat received from the high-temperature reservoir.

$$\eta_{th}=\frac{\text{desired energy result}}{\text{required energy input}}=\frac{W_{net,out}}{Q_H}.$$

The denominator is not total energy circulating through internal components. It is the external heat input required to operate the cycle.

### Why a Cyclic Heat Engine Must Reject Heat

The Kelvin–Planck statement of the Second Law rules out a cyclic device whose sole effect is receiving heat from one reservoir and converting all of it to net work.

Therefore, for an actual cyclic heat engine:

$$Q_L>0\quad\text{and}\quad\eta_{th}<1.$$

Improved design can reduce irreversibilities and reduce the required heat rejection for a specified heat input and reservoir pair, but it cannot eliminate heat rejection entirely.

### Interpreting the Unconverted Fraction

If $\eta_{th}=0.40$, then $40\%$ of the heat input becomes net work output and $60\%$ is rejected as heat under the stated model:

$$
\frac{Q_L}{Q_H}=1-\eta_{th}=0.60.
$$

The rejected energy has not been destroyed. Its temperature and quality are lower, so it is less capable of producing additional work without another temperature difference and another device.

## Governed Equations

<a id="M02-EQ-002"></a>
### Complete-Cycle Stored-Energy Change - `M02-EQ-002`

$$
\Delta E_{cycle}=0
$$

**Equation type:** complete-cycle property relationship  
**Applicable system:** the complete cyclic device or working fluid after one full cycle  
**Required assumptions:** the final thermodynamic state equals the initial state  
**Units:** energy  
**Physical interpretation:** stored total energy returns to its initial value over a complete cycle  
**Limits or constraints:** heat and work are transfers rather than stored properties, so their net values need not be zero

<a id="M02-EQ-004"></a>
### Heat-Engine Cycle Energy Balance — `M02-EQ-004`

$$
Q_H=W_{net,out}+Q_L
$$

Equivalent rate form:

$$
\dot Q_H=\dot W_{net,out}+\dot Q_L
$$

where:

- $Q_H$ or $\dot Q_H$ is heat received from the high-temperature reservoir;
- $W_{net,out}$ or $\dot W_{net,out}$ is net work produced; and
- $Q_L$ or $\dot Q_L$ is heat rejected to the low-temperature reservoir.

**Equation type:** First-Law energy balance for a cycle  
**Applicable system:** the complete cyclic heat engine  
**Required assumptions:** the working fluid completes a cycle; quantities use positive magnitudes with directional subscripts; no unaccounted external energy interactions  
**Units:** use energy units consistently in the amount form or power units consistently in the rate form  
**Physical interpretation:** heat input is partitioned into net work output and heat rejection  
**Limits or constraints:** this balance alone does not impose the Second-Law upper limit

<a id="M02-EQ-005"></a>
### Thermal Efficiency Definition — `M02-EQ-005`

$$\eta_{th}=\frac{W_{net,out}}{Q_H}=1-\frac{Q_L}{Q_H}$$

where:

- $\eta_{th}$ is the dimensionless thermal efficiency;
- $W_{net,out}$ is the desired net work output;
- $Q_H$ is the required heat input; and
- $Q_L$ is the heat rejected.

**Equation type:** performance-metric definition combined with the cycle energy balance  
**Applicable system:** a cyclic heat engine  
**Required assumptions:** the same time basis or cycle basis is used for all quantities  
**Units:** numerator and denominator must have identical energy or power units; $\eta_{th}$ is dimensionless  
**Physical interpretation:** fraction of required heat input converted to net work output  
**Limits or constraints:** $0\le\eta_{th}<1$ for an actual heat engine; a tighter upper limit is established by reservoir temperatures on [[reversibility-irreversibility-carnot-limits]]

## Interactive Diagram Specifications

![Heat engine between high- and low-temperature reservoirs with selectable heat and work arrows](assets/svg/second-law/heat-engine-energy-flow.svg)

- **Asset:** `assets/svg/second-law/heat-engine-energy-flow.svg`
- **Viewport:** responsive `viewBox`; default aspect ratio approximately `4:3`
- **Primary elements:** high-temperature reservoir, cyclic heat engine, low-temperature reservoir, three selectable energy arrows, numerical labels, efficiency meter
- **Required labels:** $T_H$, $T_L$, $Q_H$, $Q_L$, $W_{net,out}$, $\eta_{th}$
- **Interaction:** the learner selects each arrow direction and then enters any two independent energy quantities; the diagram calculates the third quantity and thermal efficiency after the model is correct
- **Accessible title:** `Heat-engine energy-flow diagram`
- **Accessible description:** `Heat Q H enters a cyclic heat engine from a high-temperature reservoir. Net work W net out leaves the engine, and heat Q L leaves the engine for a low-temperature reservoir.`
- **Keyboard behavior:** arrows are selected through labeled button groups; numeric inputs have explicit unit selectors; result feedback is announced in a live region
- **Non-color cues:** arrowheads, labels, placement, and line patterns distinguish heat input, heat rejection, and work output
- **Mobile behavior:** reservoirs and device stack vertically; work output is placed below or beside the device without overlapping labels
- **Text fallback:** $Q_H$ enters the device; $W_{net,out}$ and $Q_L$ leave; $Q_H=W_{net,out}+Q_L$

## Interpret the Diagram

Read the diagram from the cyclic device boundary:

- the arrow labeled $Q_H$ crosses into the device;
- the arrow labeled $W_{net,out}$ crosses out of the device; and
- the arrow labeled $Q_L$ crosses out of the device.

The high-temperature reservoir is the heat source and the low-temperature reservoir is the heat sink for this device. If any arrow is reversed, the model no longer represents a heat engine.

## Engineering Application

A steam power plant receives heat in its boiler, produces turbine-generator work, consumes some internal pump work, and rejects heat through its condenser. When the entire working-fluid cycle is selected as the system, the turbine and pump contributions combine into $W_{net,out}$, and the boiler and condenser interactions become $Q_H$ and $Q_L$.

See [[community-power-plant-performance]] and later [[rankine-cycle-performance]].

## Common Misconceptions

### Heat Is Fully Converted to Work in a Well-Designed Engine

- **Plausible incorrect idea:** A sufficiently advanced cyclic engine can make $Q_L=0$.
- **Why it fails:** The Kelvin–Planck statement requires heat rejection for a cyclic heat engine.
- **Correct reasoning:** Design can improve performance, but $\eta_{th}=1$ is impossible for a heat engine operating between finite reservoir temperatures.

### The Rejected Fraction Is Destroyed Energy

- **Plausible incorrect idea:** The fraction $1-\eta_{th}$ has disappeared.
- **Why it fails:** The cycle energy balance accounts for it as $Q_L$.
- **Correct reasoning:** The energy is rejected at a lower temperature and lower quality.

### Efficiency Uses Gross Turbine Work

- **Plausible incorrect idea:** $\eta_{th}=W_{turbine,out}/Q_H$ for every power cycle.
- **Why it fails:** Other work-consuming components may operate within the cycle.
- **Correct reasoning:** Use net work output, $W_{net,out}=W_{out}-W_{in}$.

### A Low Efficiency Automatically Means Poor Engineering

- **Plausible incorrect idea:** A $40\%$ efficient engine is always poorly designed because it is far from $100\%$.
- **Why it fails:** The relevant ideal comparison is the reversible limit between the same reservoir temperatures.
- **Correct reasoning:** Compare actual efficiency with $\eta_{th,Carnot}$, not only with one.

## Check Your Understanding

### 1. Energy-Flow Directions

Which set of interactions describes a heat engine?

- A. $Q_H$ out, $Q_L$ in, $W_{net,in}$ in
- B. $Q_H$ in, $Q_L$ out, $W_{net,out}$ out
- C. $Q_H$ out, $Q_L$ in, $W_{net,out}$ out
- D. $Q_H$ in, $Q_L$ out, $W_{net,in}$ in

<!--
item_id: m02-t03-cy01
item_type: single_select
correct_response: B
principle: "A heat engine receives heat from the high-temperature reservoir, produces net work, and rejects heat to the low-temperature reservoir."
feedback_if_incorrect: "Identify the device purpose first: a heat engine is work-producing."
-->

### 2. Power-Plant Performance Set

A power plant produces $\dot W_{net,out}=600\ \text{MW}$ with $\eta_{th}=0.40$. Enter both required values.

- $\dot Q_H=\underline{\hspace{2.5cm}}\ \text{MW}$
- $\dot Q_L=\underline{\hspace{2.5cm}}\ \text{MW}$

<!--
item_id: m02-t03-cy02
item_type: multi_part_numeric
response_fields:
  - id: m02-t03-cy02-qdot-h
    label: heat-input rate
    correct_response: 1500
    tolerance_absolute: 1
    units: MW
  - id: m02-t03-cy02-qdot-l
    label: rejected-heat rate
    correct_response: 900
    tolerance_absolute: 1
    units: MW
calculation: "Qdot_H = 600/0.40 = 1500 MW; Qdot_L = 1500 - 600 = 900 MW."
principle: "Use the efficiency definition first, then close the complete-cycle energy balance."
feedback:
  m02-t03-cy02-qdot-h: "Solve eta_th = Wdot_net_out/Qdot_H for Qdot_H."
  m02-t03-cy02-qdot-l: "Use Qdot_H = Wdot_net_out + Qdot_L after finding Qdot_H."
-->

### 3. First-Law Versus Second-Law Check

A proposed cyclic engine receives $100\ \text{kJ}$ from a single hot reservoir, produces $100\ \text{kJ}$ of net work, and rejects no heat. Which statement is correct?

- A. It violates the First Law only.
- B. It satisfies the First Law but violates the Second Law.
- C. It satisfies both laws because $Q_H=W_{net,out}$.
- D. It is a reversible heat engine.

<!--
item_id: m02-t03-cy03
item_type: single_select
correct_response: B
principle: "The arithmetic can satisfy the cycle energy balance, but complete conversion of heat from one reservoir into cyclic net work violates the Kelvin-Planck statement."
feedback_if_incorrect: "Perform separate First-Law and Second-Law checks rather than combining them into one test."
-->

### 4. Notes for Discussion—Not Automatically Evaluated

Explain why a community might care about $\dot Q_L$ even when its primary goal is electrical power production.

## Problem-Solving Connection

- Worked example: [[worked-power-plant-heat-rejection]]
- Completion problem: [[completion-heat-engine-performance]]
- Independent practice: [[independent-heat-engine-claim-check]]

## Concept Cross-References

- **Prerequisite:** [[thermal-energy-reservoirs]]
- **Compare:** [[refrigerators-heat-pumps-cop]]
- **Apply:** [[community-power-plant-performance]]
- **Extend:** [[rankine-cycle-performance]]
- **Next:** [[refrigerators-heat-pumps-cop]]

## Key Takeaways

- A heat engine receives $Q_H$, produces $W_{net,out}$, rejects $Q_L$, and operates on a cycle.
- The complete-cycle energy balance is $Q_H=W_{net,out}+Q_L$.
- Thermal efficiency is desired net work output divided by required heat input.
- Rejected heat is conserved energy at lower quality, not destroyed energy.
- A cyclic heat engine cannot have $\eta_{th}=1$.

## Sources and Attribution

- `SRC-MCET530-W2-NOTES` — heat-engine definition, energy-flow model, performance equation, and power-plant example; rewritten and checked for this draft.
- `SRC-MCET530-EXAM1-2024` — work-producing device description and desired-over-required framing; terminology corrected so COP is not called thermal efficiency.
- `SRC-MCET530-W5-NOTES` — connection to vapor power plants and net cycle work.

Rights and publication status are recorded in `validation/source-manifest.md`.
