---
id: m01-t03
title: Thermodynamic Processes, Paths, and Cycles
slug: thermodynamic-processes-and-cycles
page_type: topic
visibility: public
nav_order: 30
module: 01-foundations
mlo:
  - MLO1
daily_los:
  - DLO-004
prerequisites:
  - properties-states-and-equilibrium
estimated_time_minutes: 16
difficulty: introductory
problem_families:
  - process-classification
  - path-interpretation
  - cycle-identification
interactive_elements:
  - process-path-cycle-diagram
assets:
  - assets/svg/foundations/process-path-cycle-diagram.svg
key_terms:
  - process
  - process path
  - quasi-equilibrium process
  - cycle
  - isobaric
  - isothermal
  - isochoric
  - polytropic
  - state function
  - path function
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

# Thermodynamic Processes, Paths, and Cycles

## Learning Objectives

By the end of this topic, you will be able to:

- distinguish a state, process, process path, and thermodynamic cycle;
- interpret common process constraints such as constant pressure, constant volume, constant temperature, and polytropic behavior; and
- explain why properties have zero net change over a complete cycle while heat and work may have nonzero net values.

## Why This Matters

A state identifies a condition. A process connects states. A cycle returns to its initial state.

Confusing these levels causes recurring errors, including:

- assigning heat or work to a state;
- assuming a path is known when only endpoints are known;
- setting every process quantity to zero because a cycle returns to its initial state; and
- using a process-specific equation without evidence that the process follows that path.

## Prerequisite Check

1. What makes a quantity a thermodynamic property?
2. What information is required to fix a simple compressible state?
3. Are heat and work properties or process-dependent transfers?

## Core Theoretical Concepts

### Process

A **thermodynamic process** is a change from one state to another. A process is often labeled by its endpoints, such as $1\to2$.

The initial and final states do not necessarily identify the intermediate behavior. More than one path can connect the same two states.

### Process Path

A **process path** is the sequence of intermediate states followed during a process.

- If the path is known and represented by equilibrium states, it can be plotted as a continuous line on a property diagram.
- If only endpoints are known, do not invent a path.
- Heat and work can depend on the path even when the property change is fixed by the endpoints.

### Quasi-Equilibrium Process

A **quasi-equilibrium** process proceeds slowly enough that the system passes through states that remain infinitesimally close to equilibrium.

This idealization can make pressure, temperature, and other state properties meaningful throughout the path. It may also permit boundary-work integration when the system pressure is well defined.

Quasi-equilibrium is not identical to reversibility. Friction, finite-temperature heat transfer, mixing, or other irreversibilities may still be present.

### Common Process Constraints

| Process name | Constraint | What the constraint does not imply |
|---|---|---|
| Isochoric or isometric | $V=\text{constant}$ | no heat transfer |
| Isobaric | $P=\text{constant}$ | constant temperature for every substance and phase |
| Isothermal | $T=\text{constant}$ | adiabatic behavior |
| Adiabatic | $Q=0$ | constant temperature or reversibility |
| Isentropic | $s=\text{constant}$ | merely insulated operation; additional conditions are required |
| Polytropic | $PV^n=\text{constant}$ | one universal value of $n$ |

The process label is a model condition. It must come from the problem statement, a governing relationship, or a justified approximation.

### Thermodynamic Cycle

A system completes a **thermodynamic cycle** when it returns to its initial state after a sequence of processes.

Therefore, every state property has zero net change over the complete cycle. Heat and work may remain nonzero because they are not properties.

A cycle can be represented by:

- a closed mass that returns to its initial state; or
- a collection of steady-flow components through which a working fluid circulates.

Do not infer system type solely from the word cycle. Select a boundary appropriate to the analysis.

### Clockwise and Counterclockwise Paths

On a $P-v$ or $P-V$ diagram, the enclosed area can represent net boundary work for an appropriate quasi-equilibrium closed-system cycle.

- A clockwise loop commonly represents net work output.
- A counterclockwise loop commonly represents net work input.

This geometric interpretation is conditional. It does not apply to arbitrary device work or to a path that does not represent quasi-equilibrium boundary work.

## Governed Equations

<a id="M01-EQ-004"></a>
### Complete-Cycle Property Change - `M01-EQ-004`

$$
\Delta B_{cycle}
=
\oint dB
=
0
$$

where $B$ is any thermodynamic property of the system.

Examples include:

$$
\Delta U_{cycle}=0,
\qquad
\Delta H_{cycle}=0,
\qquad
\Delta S_{cycle}=0.
$$

**Equation type:** property relationship for a complete cycle  
**Applicable system:** a system that returns to its initial state  
**Required assumptions:** the initial and final states are identical; $B$ is a property  
**Units:** the units of property $B$  
**Physical interpretation:** a property has no net change when the system returns to the same state  
**Limits or constraints:** this relation does not set net heat or net work to zero

### Common Process Constraints

$$
\begin{aligned}
V&=\text{constant} && \text{isochoric},\\
P&=\text{constant} && \text{isobaric},\\
T&=\text{constant} && \text{isothermal},\\
PV^n&=\text{constant} && \text{polytropic}.
\end{aligned}
$$

**Equation type:** process-path constraints  
**Applicable system:** only when the named process is stated or justified  
**Required assumptions:** depend on the selected process model  
**Physical interpretation:** each constraint limits how states can be connected  
**Limits or constraints:** a constraint does not automatically establish reversibility or determine heat transfer

## Interactive Diagram Specifications

![States connected by alternative paths and a complete thermodynamic cycle](assets/svg/foundations/process-path-cycle-diagram.svg)

- **Asset:** `assets/svg/foundations/process-path-cycle-diagram.svg`
- **Viewport:** responsive `viewBox`; default aspect ratio approximately `4:3`
- **Primary elements:** $P-v$ axes, states 1 and 2, two alternative paths, dashed unknown path, clockwise loop, counterclockwise loop
- **Required labels:** `state`, `process`, `path known`, `path unknown`, `cycle`, $P$, $v$
- **Interaction:** selecting a path reveals which quantities are determined by endpoints and which can depend on the path; cycle direction can be toggled
- **Accessible title:** `Thermodynamic processes, paths, and cycles`
- **Accessible description:** `A pressure-specific-volume diagram shows two states connected by alternative paths and separate clockwise and counterclockwise cycles.`
- **Keyboard behavior:** paths and cycle direction controls are selectable with buttons
- **Non-color cues:** solid, dashed, and patterned lines distinguish known paths, unknown paths, and cycles
- **Mobile behavior:** the diagram remains legible at 360 CSS pixels with labels moved outside the plotting area
- **Text fallback:** endpoint property changes are path independent; heat and work may depend on the path; all property changes are zero over a complete cycle

## Interpret the Diagram

The two paths between states 1 and 2 have the same $\Delta U$, $\Delta H$, and other property changes because the endpoints are identical. The heat and work interactions may differ.

The closed loop returns to its initial state, so the net change of every property is zero. The loop can still represent net heat and net work transfer.

A dashed connection means the path is unknown. Do not calculate path-dependent boundary work from the area under a path that has not been established.

## Engineering Application

A piston-cylinder may move from the same initial state to the same final state through constant-pressure, polytropic, or other paths. The internal-energy change is the same for all paths, but moving-boundary work and required heat transfer can differ.

See [[worked-alternative-process-paths]].

## Common Misconceptions

### Zero Property Change Means No Energy Transfer

- **Plausible incorrect idea:** Because $\Delta U_{cycle}=0$, both net heat and net work must be zero.
- **Why it fails:** Heat and work are not properties; they may have equal nonzero net values over a cycle.
- **Correct reasoning:** Apply the cycle energy balance after using the zero property change.

### Adiabatic Means Isothermal

- **Plausible incorrect idea:** If $Q=0$, temperature cannot change.
- **Why it fails:** Work and property changes can alter temperature without heat transfer.
- **Correct reasoning:** Adiabatic specifies one boundary interaction, not the full state response.

### Slow Means Reversible

- **Plausible incorrect idea:** Every slow process is reversible.
- **Why it fails:** Friction and finite driving forces can persist at low speed.
- **Correct reasoning:** Quasi-equilibrium addresses closeness to equilibrium, while reversibility requires absence of all relevant irreversibilities.

## Check Your Understanding

### 1. State, Process, or Cycle

A gas begins at state 1, expands to state 2, is cooled to state 3, and is compressed back to state 1. What does the full sequence represent?

- A. One state
- B. One property
- C. A thermodynamic cycle
- D. An isolated system

<!--
item_id: m01-t03-cy01
item_type: single_select
correct_response: C
principle: "A sequence that returns the system to its initial state is a thermodynamic cycle."
feedback:
  incorrect: "Track the final state of the complete sequence and compare it with the initial state."
-->

### 2. Path Dependence

Two different processes connect the same equilibrium states 1 and 2. Which quantities must be the same for both processes? Select all that apply.

- A. $\Delta U$
- B. $\Delta H$
- C. Heat transfer $Q$
- D. Work $W$
- E. $\Delta S$

<!--
item_id: m01-t03-cy02
item_type: multi_select
correct_response:
  - A
  - B
  - E
principle: "Changes in properties depend only on endpoint states; heat and work may depend on the path."
feedback:
  incorrect: "Classify each quantity as a property change or a process-dependent transfer."
-->

### 3. Process Constraint

A rigid sealed tank is heated. Which process constraint follows directly from the word rigid?

- A. $P=\text{constant}$
- B. $T=\text{constant}$
- C. $V=\text{constant}$
- D. $Q=0$

<!--
item_id: m01-t03-cy03
item_type: single_select
correct_response: C
principle: "A rigid boundary fixes total volume; it does not by itself determine pressure, temperature, or heat transfer."
feedback:
  incorrect: "Translate the physical boundary description into the variable it constrains."
-->

### 4. Complete Cycle

For a complete cycle, enter the net change in specific enthalpy.

- $\Delta h_{cycle}=\underline{\hspace{2.0cm}}\ \text{kJ/kg}$

<!--
item_id: m01-t03-cy04
item_type: numeric
response_fields:
  - id: m01-t03-cy04-delta-h
    label: complete-cycle specific-enthalpy change
    correct_response: 0
    tolerance_absolute: 0
    units: kJ/kg
principle: "Specific enthalpy is a property, so its net change is zero when the final state equals the initial state."
feedback:
  m01-t03-cy04-delta-h: "Use the fact that all state properties return to their initial values over a complete cycle."
-->

### 5. Notes for Discussion - Not Automatically Evaluated

Describe a process that could be quasi-equilibrium but still irreversible. Identify the source of irreversibility.

## Problem-Solving Connection

- Worked example: [[worked-alternative-process-paths]]
- Guided practice: [[guided-process-constraint-selection]]
- Independent practice: [[independent-cycle-property-audit]]

## Concept Cross-References

- **Prerequisite:** [[properties-states-and-equilibrium]]
- **Next:** [[heat-and-work-interactions]]
- **Compare:** [[reversibility-irreversibility-carnot-limits]]
- **Apply:** [[heat-engines-thermal-efficiency]]
- **Reference:** [[thermodynamic-sign-conventions]]

## Key Takeaways

- A process connects states; a process path specifies the intermediate behavior.
- Properties depend on states, while heat and work may depend on the path.
- Process labels impose specific constraints and no more.
- Quasi-equilibrium is not sufficient for reversibility.
- Every property has zero net change over a complete cycle, but net heat and work may be nonzero.

## Sources and Attribution

- `SRC-MCET530-EXAM1-2024` - state, process, path, quasi-equilibrium, process types, and cycle definitions; rewritten and technically refined.
- `SRC-MCET530-W1-NOTES` - common process labels and cycle context; rewritten.

See `validation/source-manifest.md` for rights status.
