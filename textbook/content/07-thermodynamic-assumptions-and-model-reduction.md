<!--
---
id: m01-t07
title: Thermodynamic Assumptions and Model Reduction
slug: thermodynamic-assumptions-and-model-reduction
page_type: topic
visibility: public
nav_order: 70
module: 01-foundations
mlo:
  - MLO1
daily_los:
  - DLO-005
prerequisites:
  - system-boundary-and-surroundings
  - heat-and-work-interactions
  - property-model-and-table-selection
estimated_time_minutes: 22
difficulty: introductory
problem_families:
  - assumption-selection
  - equation-reduction
  - invalid-inference-diagnosis
interactive_elements:
  - assumption-equation-reducer
assets:
  - assets/svg/foundations/assumption-equation-reducer.svg
key_terms:
  - assumption
  - steady state
  - steady flow
  - uniform flow
  - single inlet single outlet
  - adiabatic
  - negligible kinetic energy change
  - negligible potential energy change
  - incompressible
  - ideal gas
  - constant specific heats
  - internally reversible
  - isentropic
status: draft
version: 0.2.0
last_reviewed: 2026-07-28
authors:
  - name: Jeffrey Stransky
    role: course editor
reviewers: []
license: TBD
source_records:
  - SRC-MCET530-W1-NOTES
  - SRC-MCET530-ASSUMPTIONS-2025
  - SRC-MCET530-EXAM1-2024
accessibility_review: pending
technical_review: pending
---
-->
# Thermodynamic Assumptions and Model Reduction

## Learning Objectives

By the end of this topic, you will be able to:

- translate common thermodynamic assumptions into explicit mathematical consequences;
- distinguish evidence-based simplifications from invalid keyword shortcuts; and
- reduce mass and energy balances while preserving every term not removed by a justified assumption.

## Why This Matters

Assumptions control the model. They should not be copied from a memorized device list.

For each assumption, an engineering solution should make clear:

1. **Evidence:** What wording, geometry, data, or scale supports it?
2. **Consequence:** Which variable, derivative, or equation term changes?
3. **Limit:** When could the assumption fail?

A correct reduced equation with no justification is incomplete. An incorrect assumption can erase the quantity the problem is asking you to determine.

## Prerequisite Check

1. Which energy-balance term represents accumulation in a control volume?
2. Which terms represent kinetic and potential energy carried by a flowing stream?
3. What is the difference between a property model and a process assumption?

## Core Theoretical Concepts

### Steady State and Steady Flow

At **steady state**, properties stored within the control volume do not change with time at fixed locations.

Therefore:

$$
\frac{dm_{cv}}{dt}=0,
\qquad
\frac{dE_{cv}}{dt}=0.
$$

Steady state does not imply:

- zero mass flow;
- zero heat transfer;
- zero work;
- equilibrium throughout the device;
- adiabatic behavior; or
- reversibility.

### Single Inlet, Single Outlet and Multiple Streams

A **single-inlet, single-outlet** model has one inlet and one outlet. Under steady state:

$$
\dot m_1=\dot m_2=\dot m.
$$

A multiple-inlet or multiple-outlet system requires sums. Do not cancel or equate stream flow rates without applying mass conservation.

### Uniform One-Dimensional Flow

The uniform-flow approximation treats properties and normal velocity as representative average values across an inlet or outlet area.

It permits mass flow to be evaluated from density, average speed, and area. It does not mean the entire control volume has uniform properties.

### Adiabatic

An **adiabatic** process has negligible heat transfer across the selected boundary:

$$
Q=0
\quad\text{or}\quad
\dot Q=0.
$$

Evidence may include effective insulation, a sufficiently short process time, or a stated negligible heat loss. Adiabatic does not mean isothermal or reversible.

### No Work Interaction

A no-work assumption removes the relevant work term only when no identified work mechanism crosses the selected boundary.

- A nozzle or heat exchanger commonly has no shaft work.
- A rigid closed tank has no moving-boundary work but may still have paddle-wheel or electrical work.
- Enthalpy already accounts for flow work in the control-volume energy equation.

### Negligible Kinetic-Energy Change

Use $\Delta ke\approx0$ when inlet and outlet speeds are sufficiently similar or when the kinetic-energy change is small relative to retained terms.

Do not use this assumption for a nozzle or diffuser merely because it is common elsewhere; changing speed is often the purpose of those devices.

### Negligible Potential-Energy Change

Use $\Delta pe\approx0$ when elevation differences are small enough that $g\Delta z$ is negligible relative to retained terms.

A horizontal device often supports this approximation, but geometry and scale should still be checked.

### Incompressible Liquid

An incompressible model treats density or specific volume as approximately constant. It is often appropriate for liquids over moderate ranges.

Incompressible does not mean constant pressure or constant temperature.

### Ideal Gas and Constant Specific Heats

The ideal-gas assumption supplies an equation of state. The constant-specific-heat assumption further approximates $c_p$ and $c_v$ as constant over a temperature interval.

These are separate assumptions. An ideal gas can be analyzed with variable specific heats.

### Internally Reversible and Isentropic

An **internally reversible** process has no irreversibilities inside the selected system.

An **isentropic** process has constant entropy. For a closed system or steady-flow stream, an adiabatic internally reversible process is isentropic under the standard introductory model.

Do not infer isentropic behavior from insulation alone. Actual adiabatic devices can generate entropy through friction and other irreversibilities.

### Assumption-to-Term Map

| Assumption | Mathematical consequence | Does not automatically imply |
|---|---|---|
| Steady state | storage derivatives are zero | no heat, work, or flow |
| SISO and steady | $\dot m_1=\dot m_2$ | equal inlet and outlet properties |
| Adiabatic | $Q=0$ or $\dot Q=0$ | $\Delta T=0$ or $\Delta s=0$ |
| Rigid closed boundary | moving-boundary work is zero | all work is zero |
| No shaft work | $W_s=0$ or $\dot W_s=0$ | no flow work; flow work is in $h$ |
| Negligible $\Delta ke$ | speed term removed | velocity is zero |
| Negligible $\Delta pe$ | elevation term removed | elevation is zero |
| Incompressible | $v\approx\text{constant}$ | constant $P$ or $T$ |
| Internally reversible + adiabatic | $s_2=s_1$ | actual device performance |

## Governed Equations

<a id="M01-EQ-016"></a>
### Uniform-Flow Mass-Flow Rate - `M01-EQ-016`

$$\dot m =\rho V_{flow}A=\frac{V_{flow}A}{v}$$

where:

- $\rho$ is density;
- $v=1/\rho$ is specific volume;
- $V_{flow}$ is average velocity normal to area $A$; and
- $A$ is inlet or outlet flow area.

**Equation type:** flow relationship  
**Applicable system:** one-dimensional uniform flow through a defined area  
**Required assumptions:** representative average density and normal velocity; area is normal to the modeled flow component  
**Units:** mass per time  
**Physical interpretation:** mass-flow rate equals density times volumetric-flow rate  
**Limits or constraints:** nonuniform profiles may require integration or correction factors

<a id="M01-EQ-015"></a>
### Reduced Steady-Flow SISO Energy Balance - `M01-EQ-015`

Starting from [[heat-and-work-interactions#M01-EQ-007|M01-EQ-007]], steady state and one inlet/one outlet give

$$\dot Q-\dot W_s=\dot m\left[(h_2-h_1)+\frac{V_{flow,2}^{2}-V_{flow,1}^{2}}{2}+g(z_2-z_1)\right].$$

Dividing by $\dot m$ gives

$$q-w_s=(h_2-h_1)+\Delta ke+\Delta pe.$$

Additional assumptions remove only their corresponding terms. For an adiabatic device with negligible kinetic- and potential-energy changes:

$$-w_s=h_2-h_1.$$

If shaft work is also zero:

$$
h_2=h_1.
$$

**Equation type:** conservation law specialized by assumptions  
**Applicable system:** steady, single-inlet, single-outlet control volume  
**Required assumptions:** steady state, SISO, uniform properties at ports; further reductions require additional stated assumptions  
**Units:** rate form uses power; specific form uses energy per mass  
**Physical interpretation:** every removed term must correspond to a documented physical simplification  
**Limits or constraints:** do not use the fully reduced form for devices where speed, elevation, heat transfer, or shaft work is important

## Interactive Diagram Specifications

![An energy equation whose terms are removed only by selected justified assumptions](assets/svg/foundations/assumption-equation-reducer.svg)

- **Asset:** `assets/svg/foundations/assumption-equation-reducer.svg`
- **Viewport:** responsive `viewBox`; default aspect ratio approximately `16:9`
- **Primary elements:** full control-volume energy equation, assumption controls, evidence prompts, crossed-out terms, warning panel
- **Required labels:** `steady`, `adiabatic`, `no shaft work`, `negligible kinetic energy`, `negligible potential energy`, `SISO`, `uniform flow`
- **Interaction:** selecting an assumption requires selecting supporting evidence before the corresponding term is removed; incompatible selections generate feedback
- **Accessible title:** `Thermodynamic assumption and equation reduction tool`
- **Accessible description:** `The full steady-flow energy balance is shown with controls that remove terms only after the learner identifies supporting physical evidence.`
- **Keyboard behavior:** all controls are checkboxes or select menus with visible focus and status announcements
- **Non-color cues:** strike-through, collapse animation with pause, text status, and icons indicate removed and retained terms
- **Mobile behavior:** equation and assumption cards stack vertically below 600 CSS pixels
- **Text fallback:** each assumption is listed with its exact mathematical consequence in the table above

## Interpret the Diagram

The full equation remains visible until assumptions are justified. Selecting “steady” removes accumulation but leaves heat, work, and stream terms. Selecting “adiabatic” removes only $\dot Q$. Selecting “negligible kinetic-energy change” removes the velocity-difference term but does not set either velocity to zero.

A warning appears when a learner selects assumptions based only on device name. For example, a nozzle should not automatically receive a negligible kinetic-energy assumption because velocity change is often its intended effect.

## Engineering Application

For a throttling valve, a common model is steady, SISO, adiabatic, with no shaft work and negligible kinetic- and potential-energy changes. The reduced equation is $h_2=h_1$.

For a turbine, the same no-heat and negligible-energy-change assumptions retain shaft work, giving $w_{out}=h_1-h_2$ under a positive-output magnitude convention.

See [[worked-throttling-valve-state-model]] and [[worked-steady-flow-device-assumption-audit]].

## Common Misconceptions

### Steady Means Equilibrium

- **Plausible incorrect idea:** A steady-flow device is in thermodynamic equilibrium.
- **Why it fails:** Steady means no time variation at fixed locations; gradients and irreversible processes may persist.
- **Correct reasoning:** Use steady state to remove accumulation only.

### Insulated Means Isentropic

- **Plausible incorrect idea:** Every adiabatic turbine has $s_2=s_1$.
- **Why it fails:** Entropy can be generated by internal irreversibilities even when $Q=0$.
- **Correct reasoning:** Isentropic behavior requires the appropriate adiabatic and internally reversible model.

### Typical Assumptions Are Automatic

- **Plausible incorrect idea:** Every turbine is adiabatic and every nozzle has negligible kinetic-energy change.
- **Why it fails:** Actual problem conditions and device purpose determine relevant terms.
- **Correct reasoning:** Read the scenario, compare scales, and justify each removed term.

### No Boundary Work Means No Work

- **Plausible incorrect idea:** A rigid system cannot receive paddle-wheel or electrical work.
- **Why it fails:** Rigidity affects moving-boundary work only.
- **Correct reasoning:** Identify and retain other work modes.

## Check Your Understanding

### 1. Meaning of Steady State

Which conclusion follows directly from steady state for a control volume?

- A. $\dot Q=0$
- B. $\dot W_s=0$
- C. $dE_{cv}/dt=0$
- D. $\dot m=0$ at every port

<!--
item_id: m01-t07-cy01
item_type: single_select
correct_response: C
principle: "Steady state removes time accumulation of stored quantities; it does not remove transfers or through-flow."
feedback:
  incorrect: "Identify the derivative of a stored control-volume quantity rather than a boundary interaction."
-->

### 2. Adiabatic Inference

A compressor is well insulated. Which term can be set to zero from that statement alone?

- A. $\dot Q$
- B. $\dot W_s$
- C. $h_2-h_1$
- D. $s_2-s_1$

<!--
item_id: m01-t07-cy02
item_type: single_select
correct_response: A
principle: "Insulation supports an adiabatic model, which removes heat transfer but not work, enthalpy change, or entropy generation."
feedback:
  incorrect: "Translate insulation only into the heat-transfer term."
-->

### 3. Throttling Reduction

A valve is modeled as steady, SISO, adiabatic, with no shaft work and negligible kinetic- and potential-energy changes. Which relation follows?

- A. $P_2=P_1$
- B. $T_2=T_1$
- C. $h_2=h_1$
- D. $s_2=s_1$

<!--
item_id: m01-t07-cy03
item_type: single_select
correct_response: C
principle: "The stated assumptions reduce the steady-flow energy balance to constant enthalpy."
feedback:
  incorrect: "Remove only the terms named by the assumptions; pressure, temperature, and entropy are not constrained to remain constant."
-->

### 4. Uniform-Flow Mass Rate

Water with $\rho=1000\ \text{kg/m}^3$ flows through a $0.010\ \text{m}^2$ area at an average normal speed of $2.0\ \text{m/s}$. Enter $\dot m$.

- $\dot m=\underline{\hspace{2.2cm}}\ \text{kg/s}$

<!--
item_id: m01-t07-cy04
item_type: numeric
response_fields:
  - id: m01-t07-cy04-mdot
    label: mass-flow rate
    correct_response: 20
    tolerance_absolute: 0.1
    units: kg/s
principle: "For uniform one-dimensional flow, mass-flow rate equals density times average normal speed times area."
feedback:
  m01-t07-cy04-mdot: "Multiply 1000 kg/m^3 by 2.0 m/s and 0.010 m^2."
-->

### 5. Isentropic Model

Which combination is sufficient under the introductory model to describe an isentropic process?

- A. Adiabatic only
- B. Internally reversible only
- C. Adiabatic and internally reversible
- D. Steady and SISO

<!--
item_id: m01-t07-cy05
item_type: single_select
correct_response: C
principle: "An adiabatic internally reversible process has no entropy transfer by heat and no entropy generation, so entropy remains constant."
feedback:
  incorrect: "Separate absence of heat transfer from absence of irreversibility; both are required for this inference."
-->

### 6. Notes for Discussion - Not Automatically Evaluated

Choose one steady-flow device and identify one assumption that is often reasonable and one that must not be made automatically. State the evidence needed for each.

## Problem-Solving Connection

- Worked example: [[worked-steady-flow-device-assumption-audit]]
- Completion problem: [[completion-equation-reduction]]
- Guided practice: [[guided-assumption-evidence-matching]]
- Independent practice: [[independent-assumption-audit]]

## Concept Cross-References

- **Prerequisite:** [[heat-and-work-interactions]]
- **Prerequisite:** [[property-model-and-table-selection]]
- **Next:** [[thermodynamic-problem-solving-process]]
- **Prepare for MLO2:** [[reversibility-irreversibility-carnot-limits]]
- **Extend:** [[isentropic-processes]]
- **Extend:** [[isentropic-efficiency]]

## Key Takeaways

- Every assumption needs evidence, a mathematical consequence, and a limitation.
- Steady state removes accumulation but not flow or boundary transfers.
- Adiabatic means no heat transfer, not constant temperature or entropy.
- Rigid removes moving-boundary work, not every work mode.
- Ideal-gas and constant-specific-heat assumptions are separate.
- Isentropic behavior requires more than insulation.

## Sources and Attribution

- `SRC-MCET530-W1-NOTES` - steady-flow balances and device assumptions; rewritten and corrected where the raw notes could imply steady, reversible, and adiabatic are equivalent.
- `SRC-MCET530-ASSUMPTIONS-2025` - assumption names and keyword cues used only after independent correction; corrupted equations were not reused.
- `SRC-MCET530-EXAM1-2024` - assumption-selection and problem-solving guidance; rewritten.

See `validation/source-manifest.md` and `validation/technical-issue-register.md`.
