<!--
---
id: m01-t06
title: Property Model and Table Selection
slug: property-model-and-table-selection
page_type: topic
visibility: public
nav_order: 60
module: 01-foundations
mlo:
  - MLO1
daily_los:
  - DLO-005
prerequisites:
  - properties-states-and-equilibrium
  - pure-substances-phases-and-property-diagrams
estimated_time_minutes: 26
difficulty: introductory
problem_families:
  - property-source-selection
  - ideal-gas-state
  - compressed-liquid-approximation
  - linear-interpolation
interactive_elements:
  - property-model-decision-tree
assets:
  - assets/svg/foundations/property-model-decision-tree.svg
key_terms:
  - property table
  - saturated table
  - superheated table
  - compressed-liquid table
  - ideal gas
  - incompressible liquid
  - equation of state
  - linear interpolation
  - independent properties
status: draft
version: 0.2.0
last_reviewed: 2026-07-28
authors:
  - name: Jeffrey Stransky
    role: course editor
reviewers: []
license: TBD
source_records:
  - SRC-MCET530-EXAM1-2024
  - SRC-MCET530-W1-NOTES
accessibility_review: pending
technical_review: pending
---
-->

# Property Model and Table Selection

## Learning Objectives

By the end of this topic, you will be able to:

- select an appropriate equation of state, approximation, or property-table family from the substance, phase, and known properties;
- determine when ideal-gas and incompressible-liquid models are appropriate; and
- perform linear interpolation without silently averaging or extrapolating beyond available data.

## Why This Matters

Thermodynamic equations do not supply all required properties by themselves. Engineers often need enthalpy, internal energy, entropy, density, or specific volume at states that must be evaluated from data or a model.

The correct sequence is:

1. identify the substance;
2. fix the state using independent intensive properties;
3. classify the phase;
4. select the property source; and
5. interpolate only within the valid data region when necessary.

Choosing a table before identifying the phase reverses the logic and increases the chance of a plausible but incorrect result.

## Prerequisite Check

1. What does it mean for a state to be fixed?
2. Where is vapor quality defined?
3. How do $T$ and $P$ compare with saturation values in compressed-liquid and superheated-vapor regions?

## Core Theoretical Concepts

### Property-Source Decision

Use the following decision sequence.

#### 1. Identify the Substance

Examples include water, a specified refrigerant, air, nitrogen, or another gas or liquid.

Do not apply water data to a refrigerant or an ideal-gas table to a phase-changing state.

#### 2. Determine Whether the State Is Fixed

For a simple compressible equilibrium state, two independent intensive properties are normally required.

At saturation, $P$ and $T$ are dependent, so another property such as $x$, $v$, $u$, $h$, or $s$ is needed.

#### 3. Identify the Phase or Model Region

For a phase-changing pure substance, classify the state as:

- compressed liquid;
- saturated liquid;
- saturated mixture;
- saturated vapor; or
- superheated vapor.

For a gas, determine whether the ideal-gas approximation is justified over the stated pressure and temperature range.

#### 4. Select the Source

| State or model | Typical property source |
|---|---|
| Saturated state specified by $T$ | saturation data organized by temperature |
| Saturated state specified by $P$ | saturation data organized by pressure |
| Saturated mixture | saturation data plus quality or another mixture property |
| Superheated vapor | superheated-vapor data |
| Compressed liquid | compressed-liquid data or a documented approximation |
| Ideal gas | equation of state plus ideal-gas property data when $u$, $h$, or $s$ are needed |
| Real gas outside ideal range | real-gas equation, compressibility data, or validated software/data source |

The open textbook should use permission-cleared or openly licensed property data. Proprietary table numbers are not treated as universal identifiers.

### Ideal-Gas Model

An ideal gas follows a simple equation of state relating pressure, temperature, and specific volume.

Use absolute pressure and absolute temperature. The approximation is most reliable at relatively low density, away from saturation and critical conditions.

The phrase “gas” does not by itself justify ideal-gas behavior. Pressure, temperature, and the required accuracy matter.

### Compressed-Liquid Model

Liquid specific volume changes weakly with pressure over many engineering ranges. A compressed liquid may therefore be approximated using saturated-liquid properties at the same temperature when the required accuracy permits.

A compressed-liquid table or validated property source is preferred when:

- pressure effects are important;
- the state is near a region where the approximation degrades;
- the problem requires high accuracy; or
- compressed-liquid data are readily available.

Do not apply one universal pressure threshold to every fluid and temperature range.

### Linear Interpolation

When a desired value lies between two tabulated entries and the data vary approximately linearly over that interval, use linear interpolation.

Do not use simple averaging unless the target lies exactly halfway between the two entries.

Do not extrapolate beyond the table range unless a separate model explicitly permits it and the uncertainty is documented.

For two-dimensional tables, interpolation may be performed sequentially in one variable and then the other, using a consistent bracketing rectangle.

### Property Software and Data Files

Software can reduce lookup time but does not replace phase and model selection. Before accepting a result, record:

- substance and composition;
- input properties and units;
- phase or region returned;
- data source or software version;
- reference state when relevant; and
- whether the result required extrapolation.

## Governed Equations

<a id="M01-EQ-012"></a>
### Ideal-Gas Equation of State - `M01-EQ-012`

$$
Pv=RT
$$

or, for a closed mass,

$$
PV=mRT
$$

where:

- $P$ is absolute pressure;
- $v$ is specific volume;
- $V$ is total volume;
- $R$ is the specific gas constant;
- $T$ is absolute temperature; and
- $m$ is mass.

**Equation type:** equation of state  
**Applicable system:** gas adequately modeled as ideal  
**Required assumptions:** ideal-gas behavior; consistent units; absolute $P$ and $T$  
**Units:** $Pv$ and $RT$ must have identical energy-per-mass dimensions  
**Physical interpretation:** the state variables are linked through the gas constant  
**Limits or constraints:** not reliable near saturation or critical conditions without validation

<a id="M01-EQ-013"></a>
### Compressed-Liquid Approximation - `M01-EQ-013`

For a compressed liquid at temperature $T$ and pressure $P$,

$$
\begin{aligned}
v(T,P)&\approx v_f(T),\\
u(T,P)&\approx u_f(T),\\
h(T,P)&\approx h_f(T)+v_f(T)\left[P-P_{sat}(T)\right].
\end{aligned}
$$

where the subscript $f$ denotes saturated-liquid data at the same temperature.

**Equation type:** approximation  
**Applicable system:** compressed liquid with weak pressure dependence over the modeled range  
**Required assumptions:** liquid remains single phase; saturated-liquid properties at the same temperature are representative; required accuracy permits the approximation  
**Units:** convert $v\Delta P$ to energy per mass consistently  
**Physical interpretation:** liquid properties depend more strongly on temperature than pressure in many engineering ranges  
**Limits or constraints:** use compressed-liquid data when pressure effects or accuracy requirements are significant

<a id="M01-EQ-014"></a>
### Linear Interpolation - `M01-EQ-014`

For a target $x$ between $x_A$ and $x_B$,

$$y(x)\approxy_A+\frac{x-x_A}{x_B-x_A}\left(y_B-y_A\right)$$

where $y_A=y(x_A)$ and $y_B=y(x_B)$.

**Equation type:** numerical approximation  
**Applicable system:** tabulated data over a sufficiently small interval with approximately linear variation  
**Required assumptions:** $x_A\le x\le x_B$; entries bracket the target; units and the held-constant variable are consistent  
**Units:** $y$ retains the units of $y_A$ and $y_B$  
**Physical interpretation:** the target is placed at the same fractional distance between property values as between the bracketing independent-variable values  
**Limits or constraints:** interpolation is not extrapolation; nonlinear regions may require denser data or another method

## Interactive Diagram Specifications

![A decision tree for selecting thermodynamic property models and tables](assets/svg/foundations/property-model-decision-tree.svg)

- **Asset:** `assets/svg/foundations/property-model-decision-tree.svg`
- **Viewport:** responsive `viewBox`; default aspect ratio approximately `16:10`
- **Primary elements:** substance node, state-fixed node, phase nodes, table-family nodes, ideal-gas branch, compressed-liquid branch, interpolation check
- **Required labels:** `substance`, `independent properties`, `phase`, `saturated`, `superheated`, `compressed liquid`, `ideal gas`, `interpolate?`
- **Interaction:** the learner enters a short state description and selects decisions; the diagram returns the required property source and flags inconsistent choices
- **Accessible title:** `Thermodynamic property model selection tree`
- **Accessible description:** `A branching decision tree moves from substance and state fixing to phase classification, property source, and interpolation.`
- **Keyboard behavior:** every branch is a radio-button or select control; no drag interaction
- **Non-color cues:** shapes and explicit yes/no labels distinguish decisions and outputs
- **Mobile behavior:** the tree becomes a step-by-step wizard below 600 CSS pixels
- **Text fallback:** identify substance, confirm independent properties, determine phase, choose a matching table or equation, then interpolate only within valid bounds

## Interpret the Diagram

The decision tree does not begin with “Which table number?” It begins with substance and state.

If a learner selects a saturated table for a state where $T>T_{sat}(P)$, the model reports a phase mismatch. If the learner selects an ideal-gas equation for a two-phase state, the model reports an invalid equation of state.

The interpolation step appears only after the correct property source and bracketing entries have been identified.

## Engineering Application

At the outlet of a throttling valve, known pressure and temperature may identify a superheated state. Superheated data provide outlet enthalpy. The steady throttling model then sets inlet enthalpy equal to outlet enthalpy, and saturated data at the inlet pressure can be used to determine quality.

See [[worked-throttling-valve-state-model]].

## Common Misconceptions

### Table Selection Comes Before Phase Identification

- **Plausible incorrect idea:** Use whichever table contains the known pressure.
- **Why it fails:** Several table families can contain the same pressure but represent different phases.
- **Correct reasoning:** Fix and classify the state before selecting a property source.

### Any Gas Is an Ideal Gas

- **Plausible incorrect idea:** The ideal-gas equation applies whenever the phase is vapor or gas.
- **Why it fails:** Real-gas departures can be important near saturation, high density, and critical conditions.
- **Correct reasoning:** Justify the ideal-gas approximation from state range and accuracy requirements.

### Compressed Liquid Means Use Saturated Data at the Same Pressure

- **Plausible incorrect idea:** Approximate a compressed liquid with saturated-liquid properties at the same pressure.
- **Why it fails:** The common approximation uses saturated-liquid properties at the same temperature.
- **Correct reasoning:** Use compressed-liquid data when available or use a clearly stated same-temperature approximation.

### Interpolation Is Averaging

- **Plausible incorrect idea:** The unknown value is always the arithmetic average of two table entries.
- **Why it fails:** Averaging is correct only at the midpoint.
- **Correct reasoning:** Use the target’s fractional position between the bracketing independent-variable values.

## Check Your Understanding

### 1. Superheated Table Selection

Water is at a pressure where $T_{sat}=150^\circ\text{C}$. The state temperature is $230^\circ\text{C}$. Which property source is appropriate?

- A. Saturated-liquid data
- B. Saturated-mixture relation
- C. Superheated-vapor data
- D. Compressed-liquid approximation

<!--
item_id: m01-t06-cy01
item_type: single_select
correct_response: C
principle: "At a fixed pressure, temperature above saturation identifies a superheated-vapor state."
feedback:
  incorrect: "Classify the phase before selecting the table family."
-->

### 2. Saturated State Information

Water is specified by $P$ and $T=T_{sat}(P)$. Which additional data could fix the state? Select all that apply.

- A. Quality $x$
- B. Specific volume $v$
- C. Specific enthalpy $h$
- D. The same pressure repeated
- E. The same saturation temperature repeated

<!--
item_id: m01-t06-cy02
item_type: multi_select
correct_response:
  - A
  - B
  - C
principle: "A saturated state requires another independent property beyond the dependent pressure-temperature pair."
feedback:
  incorrect: "Choose a quantity that identifies position within the saturation region rather than repeating dependent information."
-->

### 3. Ideal-Gas State

Air is modeled as an ideal gas at $P=200\ \text{kPa}$ and $T=400\ \text{K}$ with $R=0.287\ \text{kPa\,m}^3\text{/(kg\,K)}$. Enter $v$.

- $v=\underline{\hspace{2.2cm}}\ \text{m}^3\text{/kg}$

<!--
item_id: m01-t06-cy03
item_type: numeric
response_fields:
  - id: m01-t06-cy03-v
    label: ideal-gas specific volume
    correct_response: 0.574
    tolerance_absolute: 0.002
    units: m^3/kg
principle: "Use v=RT/P with absolute temperature and consistent pressure-volume units."
feedback:
  m01-t06-cy03-v: "Multiply R by 400 K and divide by 200 kPa."
-->

### 4. Linear Interpolation

A table gives $y_A=40$ at $x_A=10$ and $y_B=70$ at $x_B=25$. Enter the linearly interpolated value at $x=16$.

- $y=\underline{\hspace{2.2cm}}$

<!--
item_id: m01-t06-cy04
item_type: numeric
response_fields:
  - id: m01-t06-cy04-y
    label: interpolated property value
    correct_response: 52
    tolerance_absolute: 0.01
    units: dimensionless_or_source_units
principle: "The target is 6/15 of the interval from A to B, so y=40+(6/15)(30)."
feedback:
  m01-t06-cy04-y: "Use the fractional position (16-10)/(25-10), not a simple average."
-->

### 5. Compressed-Liquid Approximation

Which statement is most defensible?

- A. Every compressed liquid can be modeled exactly with saturated-liquid properties.
- B. A same-temperature saturated-liquid approximation may be used when pressure effects are small relative to required accuracy.
- C. Compressed-liquid properties should always be taken at the same pressure from a saturated table.
- D. Quality should be used for every compressed-liquid state.

<!--
item_id: m01-t06-cy05
item_type: single_select
correct_response: B
principle: "The compressed-liquid approximation is conditional and uses same-temperature saturated-liquid data."
feedback:
  incorrect: "Treat the approximation as a model with an accuracy requirement, not as an exact universal rule."
-->

### 6. Notes for Discussion - Not Automatically Evaluated

State what metadata should accompany a property value obtained from software so another engineer can reproduce and audit the result.

## Problem-Solving Connection

- Worked example: [[worked-throttling-valve-state-model]]
- Completion problem: [[completion-property-table-selection]]
- Guided practice: [[guided-property-model-decision-tree]]
- Independent practice: [[independent-property-source-audit]]

## Concept Cross-References

- **Prerequisite:** [[pure-substances-phases-and-property-diagrams]]
- **Next:** [[thermodynamic-assumptions-and-model-reduction]]
- **Apply:** [[worked-throttling-valve-state-model]]
- **Reference:** [[property-data-sources]]
- **Extend:** [[rankine-cycle-performance]]

## Key Takeaways

- Property selection begins with substance, state fixing, and phase.
- Saturated, superheated, compressed-liquid, ideal-gas, and real-gas models are not interchangeable.
- Ideal-gas equations require absolute pressure and temperature.
- Compressed-liquid approximations are conditional and should be checked against accuracy needs.
- Interpolation uses bracketing data and fractional position; it is not arbitrary averaging or extrapolation.

## Sources and Attribution

- `SRC-MCET530-EXAM1-2024` - state-fixing, phase-based table selection, ideal-gas equation, compressed-liquid approximation, and interpolation workflow; rewritten and technically refined.
- `SRC-MCET530-W1-NOTES` - throttling and condenser property-lookup contexts; numerical examples retained only as source records, not reproduced as proprietary problems.

See `validation/source-manifest.md` and `validation/technical-issue-register.md`.
