---
id: m01-t02
title: Properties, States, and Equilibrium
slug: properties-states-and-equilibrium
page_type: topic
visibility: public
nav_order: 20
module: 01-foundations
mlo:
  - MLO1
daily_los:
  - DLO-004
  - DLO-005
prerequisites:
  - system-boundary-and-surroundings
estimated_time_minutes: 16
difficulty: introductory
problem_families:
  - property-classification
  - state-fixing
  - state-versus-path-classification
interactive_elements:
  - property-state-sorter
assets:
  - assets/svg/foundations/property-state-sorter.svg
key_terms:
  - thermodynamic property
  - extensive property
  - intensive property
  - specific property
  - state
  - equilibrium
  - state postulate
  - independent properties
  - point function
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
accessibility_review: pending
technical_review: pending
---

# Properties, States, and Equilibrium

## Learning Objectives

By the end of this topic, you will be able to:

- classify thermodynamic quantities as extensive, intensive, specific, or process dependent;
- distinguish a state from a process and an equilibrium state from a nonuniform condition; and
- determine whether a simple compressible state is fixed by two independent intensive properties.

## Why This Matters

Property tables and equations provide values at thermodynamic states. They do not provide a unique answer when the state has not been fixed.

Before looking up enthalpy, internal energy, entropy, or specific volume, an engineer must ask:

- What properties are known?
- Are they intensive?
- Are they independent in the current phase?
- Is the state sufficiently close to equilibrium for state properties to be meaningful?

Skipping these questions is a common cause of wrong-table and wrong-phase errors.

## Prerequisite Check

1. What is inside the selected system boundary?
2. Can a system property cross a boundary by itself, or is it carried through a transfer mechanism?
3. Which system type permits mass to cross its boundary?

## Core Theoretical Concepts

### Thermodynamic Property

A **thermodynamic property** is a measurable or calculable characteristic assigned to a system at a state.

Examples include:

- pressure $P$;
- temperature $T$;
- mass $m$;
- volume $V$;
- internal energy $U$;
- enthalpy $H$;
- specific volume $v$; and
- specific entropy $s$.

A property has a value at a state. It is therefore a **point function** or **state function**.

Heat and work are not properties. They describe energy transfer during a process and cannot be assigned to one isolated state.

### Extensive, Intensive, and Specific Properties

An **extensive property** depends on system size or amount of matter. Dividing the system changes the amount assigned to each part.

Examples include $m$, $V$, $U$, and $H$.

An **intensive property** does not depend directly on system size.

Examples include $P$ and $T$.

A **specific property** is an extensive property divided by mass. Specific properties are intensive.

Examples include:

- $v=V/m$;
- $u=U/m$; and
- $h=H/m$.

The lowercase notation is a course convention for common specific properties. Pressure $P$ and temperature $T$ remain uppercase even though they are intensive.

### State

A **state** is the condition of a system described by a set of property values at an instant.

If any independent property changes, the system moves to another state. State labels such as 1, 2, and 3 distinguish conditions without implying a particular path between them.

### Equilibrium

A system is at **thermodynamic equilibrium** when no unbalanced tendency exists to change its macroscopic condition while it is isolated.

The equilibrium model requires appropriate forms of:

- thermal equilibrium;
- mechanical equilibrium;
- phase equilibrium; and
- chemical equilibrium when reactions or composition changes are relevant.

Introductory property tables describe equilibrium states. A rapidly changing real process may pass through non-equilibrium conditions, but its inlet, outlet, or initial and final states can often still be modeled as equilibrium states.

### State Postulate and Independent Properties

For a **simple compressible system**, two independent intensive properties are normally sufficient to fix a state.

Independence depends on phase. For a saturated liquid-vapor state, $T$ and $P$ are linked by the saturation relation. They count as one independent property, not two.

Examples:

- superheated water with known $P$ and $T$: state fixed;
- saturated water with known $P$ and $T=T_{sat}(P)$: state not fixed without quality or another independent property;
- ideal-gas air with known $P$ and $T$: state fixed for the equation of state.

### Property Values Versus Property Changes

A property change depends only on the two endpoint states:

$$
\Delta B=B_2-B_1.
$$

The actual path may affect heat and work, but not the difference between the endpoint property values.

## Governed Equations

<a id="M01-EQ-002"></a>
### Specific-Property Definition - `M01-EQ-002`

$$
b=\frac{B}{m}
$$

where:

- $B$ is an extensive property;
- $m$ is system mass; and
- $b$ is the corresponding specific property.

Examples include $v=V/m$, $u=U/m$, and $h=H/m$.

**Equation type:** definition  
**Applicable system:** any system with defined mass and extensive property $B$  
**Required assumptions:** $m>0$; the property and mass refer to the same system  
**Units:** units of $B$ per unit mass  
**Physical interpretation:** specific properties permit comparison independent of system size  
**Limits or constraints:** not every intensive property is formed by dividing an extensive property by mass

<a id="M01-EQ-003"></a>
### Simple-Compressible State Postulate - `M01-EQ-003`

$$
\text{simple compressible equilibrium state}
\quad\Longleftrightarrow\quad
\text{two independent intensive properties}
$$

**Equation type:** state postulate or model rule  
**Applicable system:** simple compressible equilibrium system  
**Required assumptions:** effects such as electric, magnetic, surface, motion, and gravity do not require additional independent properties for the selected state model  
**Units:** not an algebraic equation  
**Physical interpretation:** a complete state description requires enough independent information, not merely two listed numbers  
**Limits or constraints:** $P$ and $T$ are not independent in a two-phase saturated state

## Interactive Diagram Specifications

![A sorter for extensive, intensive, specific, and process-dependent quantities](assets/svg/foundations/property-state-sorter.svg)

- **Asset:** `assets/svg/foundations/property-state-sorter.svg`
- **Viewport:** responsive `viewBox`; default aspect ratio approximately `3:2`
- **Primary elements:** property cards, four classification regions, state panel, process arrow, independence indicator
- **Required labels:** `extensive`, `intensive`, `specific`, `process dependent`, `state 1`, `state 2`, `independent?`
- **Interaction:** the learner assigns quantities to categories and tests whether selected property pairs fix a state in a stated phase
- **Accessible title:** `Thermodynamic property and state classifier`
- **Accessible description:** `Cards for mass, pressure, temperature, volume, specific volume, internal energy, heat, and work are sorted by property type. A second panel checks whether two properties are independent.`
- **Keyboard behavior:** cards can be selected and assigned using buttons; no drag-only interaction
- **Non-color cues:** category names, icons, and border patterns distinguish classifications
- **Mobile behavior:** classification regions collapse into labeled selection menus below 480 CSS pixels
- **Text fallback:** properties have values at states; heat and work are process-dependent transfers; two independent intensive properties fix a simple compressible state

## Interpret the Diagram

A quantity belongs in the property region only if it can be assigned at one state. Heat and work appear on the process arrow because they describe interactions during the transition.

The independence indicator changes with phase. A $P,T$ pair can fix a superheated-vapor state but does not fix a saturated mixture because $P$ and $T$ are linked on the saturation curve.

## Engineering Application

Property evaluation at the outlet of a throttling valve begins with a state-fixing question. When $P_2$ and $T_2$ identify a superheated state, the remaining properties can be obtained from an appropriate superheated table. At a saturated state, another independent property would be required.

See [[worked-throttling-valve-state-model]].

## Common Misconceptions

### Any Two Properties Fix a State

- **Plausible incorrect idea:** Knowing temperature and pressure always fixes a pure-substance state.
- **Why it fails:** In the saturated liquid-vapor region, $T$ and $P$ are dependent.
- **Correct reasoning:** Confirm both the phase and independence of the property pair.

### Heat Is Stored in a System

- **Plausible incorrect idea:** A hot object contains heat.
- **Why it fails:** Heat is energy transfer caused by a temperature difference; internal energy is a stored property.
- **Correct reasoning:** Describe the object as having internal energy and temperature, and describe heat only while energy crosses a boundary.

### Lowercase Always Means Intensive

- **Plausible incorrect idea:** Every lowercase symbol is a specific property and every uppercase symbol is extensive.
- **Why it fails:** Symbol conventions have exceptions, and the physical definition controls the classification.
- **Correct reasoning:** Use the notation dictionary and the quantity definition, not capitalization alone.

## Check Your Understanding

### 1. Property Classification

Which quantities are extensive properties? Select all that apply.

- A. Mass $m$
- B. Temperature $T$
- C. Total internal energy $U$
- D. Specific volume $v$
- E. Total volume $V$

<!--
item_id: m01-t02-cy01
item_type: multi_select
correct_response:
  - A
  - C
  - E
principle: "Extensive properties scale with system size; temperature and specific volume do not."
feedback:
  incorrect: "Ask whether doubling an otherwise identical system doubles the quantity."
-->

### 2. State or Process Quantity

Which pair contains only quantities that can be assigned at a single equilibrium state?

- A. Heat and work
- B. Pressure and specific enthalpy
- C. Heat and internal energy
- D. Work and temperature

<!--
item_id: m01-t02-cy02
item_type: single_select
correct_response: B
principle: "Pressure and specific enthalpy are state properties; heat and work are process-dependent transfers."
feedback:
  incorrect: "Remove any option containing heat or work, because neither is a property at one state."
-->

### 3. Independent Properties

Water is known to be a saturated liquid-vapor mixture at $P=200\ \text{kPa}$. Which additional quantity can fix the state?

- A. The saturation temperature at $200\ \text{kPa}$
- B. Vapor quality $x$
- C. A second statement that the pressure is $200\ \text{kPa}$
- D. The word water

<!--
item_id: m01-t02-cy03
item_type: single_select
correct_response: B
principle: "At saturation, temperature and pressure are dependent; quality provides an independent property for the mixture state."
feedback:
  incorrect: "Choose information that identifies position between saturated liquid and saturated vapor."
-->

### 4. Specific Property

A closed system has $U=1200\ \text{kJ}$ and $m=4.0\ \text{kg}$. Enter its specific internal energy.

- $u=\underline{\hspace{2.2cm}}\ \text{kJ/kg}$

<!--
item_id: m01-t02-cy04
item_type: numeric
response_fields:
  - id: m01-t02-cy04-u
    label: specific internal energy
    correct_response: 300
    tolerance_absolute: 0.5
    units: kJ/kg
principle: "A specific property equals the corresponding extensive property divided by system mass."
feedback:
  m01-t02-cy04-u: "Divide the total internal energy by the mass and retain units of kJ/kg."
-->

### 5. Notes for Discussion - Not Automatically Evaluated

Give one example of a real process whose intermediate conditions are not at equilibrium but whose initial and final states can still be modeled with equilibrium properties.

## Problem-Solving Connection

- Worked example: [[worked-state-fixing-and-property-classification]]
- Guided practice: [[guided-independent-property-selection]]
- Independent practice: [[independent-state-postulate-audit]]

## Concept Cross-References

- **Prerequisite:** [[system-boundary-and-surroundings]]
- **Next:** [[thermodynamic-processes-and-cycles]]
- **Apply:** [[pure-substances-phases-and-property-diagrams]]
- **Apply:** [[property-model-and-table-selection]]
- **Prepare for MLO2:** [[purpose-second-law-energy-quality]]

## Key Takeaways

- Properties describe states; heat and work describe transfers during processes.
- Extensive properties scale with system size; specific properties are intensive.
- A simple compressible equilibrium state normally requires two independent intensive properties.
- Property independence depends on phase.
- A property change depends on endpoint states, not the path between them.

## Sources and Attribution

- `SRC-MCET530-EXAM1-2024` - property, state, equilibrium, extensive/intensive/specific, and state-fixing concepts; rewritten and technically refined.

See `validation/source-manifest.md` for rights status.
