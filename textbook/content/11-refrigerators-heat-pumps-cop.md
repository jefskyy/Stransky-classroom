<!--
---
id: m02-t04
title: Refrigerators, Heat Pumps, and Coefficient of Performance
slug: refrigerators-heat-pumps-cop
page_type: topic
visibility: public
nav_order: 40
module: 02-second-law
mlo:
  - MLO2
daily_los:
  - DLO-009
  - DLO-010
  - DLO-011
prerequisites:
  - thermal-energy-reservoirs
  - heat-engines-thermal-efficiency
  - heat-and-work-interactions
estimated_time_minutes: 15
difficulty: intermediate
problem_families:
  - refrigerator-energy-flow
  - heat-pump-energy-flow
  - same-cycle-different-purpose
  - cop-calculation
interactive_elements:
  - refrigerator-heat-pump-purpose-toggle
assets:
  - assets/svg/second-law/refrigerator-heat-pump-energy-flow.svg
key_terms:
  - refrigerator
  - heat pump
  - coefficient of performance
  - refrigeration load
  - heating load
  - work input
  - Clausius statement
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
accessibility_review: pending
technical_review: pending
---
-->
# Refrigerators, Heat Pumps, and Coefficient of Performance

## Learning Objectives

By the end of this topic, you will be able to:

- construct and interpret energy-flow diagrams for refrigerators and heat pumps;
- calculate $Q_H$, $Q_L$, $W_{net,in}$, $COP_R$, or $COP_{HP}$ from the cycle energy balance; and
- explain why the same physical cycle can be evaluated differently for cooling and heating purposes.

## Why This Matters

Refrigerators, air conditioners, and heat pumps move heat from a lower-temperature region to a higher-temperature region. That direction is not spontaneous, so the cycle requires work input. The same hardware may provide either a refrigeration benefit or a heating benefit; the performance metric changes because the desired result changes.

## Prerequisite Check

1. For a heat engine, which direction does $Q_L$ cross the cyclic-device boundary?
2. What does the high-temperature label $T_H$ identify: temperature level, source role, or both?
3. Why must a work-consuming device be included when heat is moved from low temperature to high temperature?

## Core Theoretical Concepts

### Shared Energy-Flow Pattern

A refrigerator and a heat pump use the same basic cyclic-device energy flows:

- $Q_L$ is absorbed from the low-temperature reservoir;
- $W_{net,in}$ is supplied to the cyclic device; and
- $Q_H$ is rejected to the high-temperature reservoir.

Using positive magnitudes:

$$
Q_H=Q_L+W_{net,in}.
$$

The device does not create $Q_H$. It combines the heat absorbed from the low-temperature reservoir with the work input.

### Refrigerator Purpose

A refrigerator is evaluated by its ability to remove heat from a low-temperature space. The desired result is $Q_L$.

Examples include:

- a food refrigerator;
- a freezer;
- an air conditioner evaluated for cooling; and
- a cold-storage system.

The required input is $W_{net,in}$, commonly supplied by an electric motor driving a compressor.

### Heat-Pump Purpose

A heat pump is evaluated by its ability to deliver heat to a high-temperature space. The desired result is $Q_H$.

Examples include:

- a building heat pump in winter;
- a heat-pump water heater; and
- an industrial heat-upgrading system.

The cycle may be physically identical to a refrigeration cycle. The distinction is the useful effect selected by the user or designer.

### Performance Metric: Desired Divided by Required

For a refrigerator:

$$COP_R=\frac{\text{heat removed from the cold space}}{\text{required work input}}=\frac{Q_L}{W_{net,in}}.$$

For a heat pump:

$$COP_{HP}=\frac{\text{heat delivered to the warm space}}{\text{required work input}}=\frac{Q_H}{W_{net,in}}.$$

Coefficient of performance is not a percentage efficiency. A COP can exceed one because the numerator includes heat transported from another reservoir in addition to the work input.

### Clausius Statement

The Clausius statement of the Second Law rules out a device whose sole effect is transferring heat from a cooler body to a warmer body.

Therefore, moving heat from $T_L$ to $T_H$ requires an additional effect. In a refrigerator or heat pump, that effect is net work input.

### Relationship Between Refrigerator and Heat-Pump COP

For the same cycle and operating condition:

$$
Q_H=Q_L+W_{net,in}.
$$

Dividing by $W_{net,in}$ gives:

$$
COP_{HP}=COP_R+1.
$$

The heat-pump COP is exactly one greater because the heating benefit includes both the absorbed low-temperature heat and the work input.

## Governed Equations

<a id="M02-EQ-006"></a>
### Refrigerator and Heat-Pump Cycle Energy Balance — `M02-EQ-006`

$$
Q_H=Q_L+W_{net,in}
$$

Equivalent rate form:

$$
\dot Q_H=\dot Q_L+\dot W_{net,in}
$$

where:

- $Q_H$ or $\dot Q_H$ is heat rejected to the high-temperature reservoir;
- $Q_L$ or $\dot Q_L$ is heat absorbed from the low-temperature reservoir; and
- $W_{net,in}$ or $\dot W_{net,in}$ is the net work supplied to the cycle.

**Equation type:** First-Law energy balance for a cycle  
**Applicable system:** the complete refrigerator or heat-pump cycle  
**Required assumptions:** cyclic operation; positive-magnitude notation; all external energy interactions represented  
**Units:** consistent energy units or consistent power units  
**Physical interpretation:** delivered high-temperature heat equals absorbed low-temperature heat plus work input  
**Limits or constraints:** the equation does not by itself determine whether the claimed COP is below the Second-Law limit

<a id="M02-EQ-007"></a>
### Refrigerator Coefficient of Performance — `M02-EQ-007`

$$COP_R=\frac{Q_L}{W_{net,in}}=\frac{Q_L}{Q_H-Q_L}$$

**Equation type:** performance-metric definition combined with the cycle balance  
**Applicable system:** refrigerator, freezer, air conditioner, or other cycle evaluated for cooling  
**Required assumptions:** the desired result is heat removal from the low-temperature region  
**Units:** dimensionless; numerator and denominator must use the same energy or power basis  
**Physical interpretation:** units of cooling effect delivered per unit of required work input  
**Limits or constraints:** $COP_R>0$ for an operating refrigerator; the reversible maximum depends on $T_H$ and $T_L$

<a id="M02-EQ-008"></a>
### Heat-Pump Coefficient of Performance — `M02-EQ-008`

$$COP_{HP}=\frac{Q_H}{W_{net,in}}=\frac{Q_H}{Q_H-Q_L}$$

**Equation type:** performance-metric definition combined with the cycle balance  
**Applicable system:** cycle evaluated for heating  
**Required assumptions:** the desired result is heat delivery to the high-temperature region  
**Units:** dimensionless  
**Physical interpretation:** units of heating effect delivered per unit of required work input  
**Limits or constraints:** $COP_{HP}>1$ for the idealized cycle balance whenever $Q_L>0$; the reversible maximum depends on $T_H$ and $T_L$

<a id="M02-EQ-009"></a>
### Same-Cycle COP Relationship — `M02-EQ-009`

$$
COP_{HP}=COP_R+1
$$

**Equation type:** derived relationship  
**Applicable system:** the same cycle evaluated at the same operating condition for both cooling and heating purposes  
**Required assumptions:** identical $Q_H$, $Q_L$, and $W_{net,in}$ for both metrics  
**Physical interpretation:** heating benefit includes the refrigeration benefit plus the work input  
**Limit:** do not compare different devices or operating points with this equation

## Interactive Diagram Specifications

![The same cyclic device shown as a refrigerator or heat pump with selectable purpose](assets/svg/second-law/refrigerator-heat-pump-energy-flow.svg)

- **Asset:** `assets/svg/second-law/refrigerator-heat-pump-energy-flow.svg`
- **Viewport:** responsive `viewBox`; default aspect ratio approximately `4:3`
- **Primary elements:** high-temperature reservoir, low-temperature reservoir, cyclic device, $Q_L$ arrow, $Q_H$ arrow, $W_{net,in}$ arrow, purpose toggle, numerator and denominator slots
- **Required labels:** $T_H$, $T_L$, $Q_H$, $Q_L$, $W_{net,in}$, `Refrigerator`, `Heat pump`, `desired result`, `required input`, $COP_R$, $COP_{HP}$
- **Interaction:** the learner first selects arrow directions, then selects the device purpose, then assigns numerator and denominator; numerical fields calculate both COPs from any two independent energy quantities
- **Accessible title:** `Same cycle, different purpose`
- **Accessible description:** `Work enters a cyclic device that absorbs heat Q L from a low-temperature reservoir and rejects heat Q H to a high-temperature reservoir. The desired result is Q L for a refrigerator and Q H for a heat pump.`
- **Keyboard behavior:** all selections use radio buttons or select controls; no drag-only interaction; updates are announced in a live region
- **Non-color cues:** arrow direction, explicit labels, numerator brackets, and icons with text distinguish cooling and heating purposes
- **Mobile behavior:** purpose controls appear before the diagram; numerator and denominator choices stack below it
- **Text fallback:** $Q_L$ and $W_{net,in}$ enter the device; $Q_H$ leaves; $COP_R=Q_L/W_{net,in}$ and $COP_{HP}=Q_H/W_{net,in}$

## Interpret the Diagram

Do not change the arrows when switching between “refrigerator” and “heat pump.” The energy-flow diagram remains the same. Only the desired result changes:

- refrigerator: keep the low-temperature space cold by removing $Q_L$;
- heat pump: keep the high-temperature space warm by delivering $Q_H$.

This is why device purpose must be identified before choosing a COP numerator.

## Engineering Application

An HVAC heat-pump system with a reversing valve may operate as a cooling device in summer and as a heating device in winter. The compressor-driven cycle still transports heat from the lower-temperature side to the higher-temperature side, but the building owner values a different side of the cycle in each season.

See [[cold-storage-and-heat-pump-performance]].

## Common Misconceptions

### A Refrigerator Produces Cold

- **Plausible incorrect idea:** The device supplies a substance called “cold” to the refrigerated space.
- **Why it fails:** Cold is not an energy transfer.
- **Correct reasoning:** The refrigerator removes heat $Q_L$ from the low-temperature region.

### A Heat Pump Creates More Energy Than It Uses

- **Plausible incorrect idea:** $COP_{HP}>1$ means the device creates energy.
- **Why it fails:** $Q_H$ includes both $Q_L$ absorbed from outside and $W_{net,in}$ supplied to the cycle.
- **Correct reasoning:** Use $Q_H=Q_L+W_{net,in}$.

### COP Is a Percentage Efficiency

- **Plausible incorrect idea:** A COP of 4 means $4\%$ efficiency or $400\%$ energy conversion.
- **Why it fails:** COP compares a transported heat quantity with work input; it is not a conversion fraction bounded by one.
- **Correct reasoning:** Interpret COP as units of desired heating or cooling per unit of work input.

### Refrigerator and Heat Pump Require Different Energy-Flow Diagrams

- **Plausible incorrect idea:** The arrows must reverse when the label changes.
- **Why it fails:** The same operating cycle can serve both purposes.
- **Correct reasoning:** Keep the arrows and change the desired-effect numerator.

### $COP_{HP}=COP_R+1$ for Any Two Devices

- **Plausible incorrect idea:** Add one to the COP of any refrigerator to predict any heat pump.
- **Why it fails:** The relationship requires the same cycle at the same operating condition.
- **Correct reasoning:** Confirm identical $Q_H$, $Q_L$, and $W_{net,in}$ first.

## Check Your Understanding

### 1. Energy-Flow Directions

Which set of interactions describes either a refrigerator or a heat pump?

- A. $Q_H$ in, $Q_L$ out, $W_{net,out}$ out
- B. $Q_H$ out, $Q_L$ in, $W_{net,in}$ in
- C. $Q_H$ in, $Q_L$ out, $W_{net,in}$ in
- D. $Q_H$ out, $Q_L$ in, $W_{net,out}$ out

<!--
item_id: m02-t04-cy01
item_type: single_select
correct_response: B
principle: "A work-consuming refrigeration cycle absorbs Q L from the low-temperature reservoir and rejects Q H to the high-temperature reservoir."
feedback_if_incorrect: "Begin with the nonspontaneous cold-to-hot heat-transfer direction and identify the required work input."
-->

### 2. Same-Cycle Performance Set

A cycle absorbs $\dot Q_L=12\ \text{kW}$ and requires $\dot W_{net,in}=3\ \text{kW}$. Enter all three results.

- $\dot Q_H=\underline{\hspace{2.2cm}}\ \text{kW}$
- $COP_R=\underline{\hspace{2.2cm}}$
- $COP_{HP}=\underline{\hspace{2.2cm}}$

<!--
item_id: m02-t04-cy02
item_type: multi_part_numeric
response_fields:
  - id: m02-t04-cy02-qdot-h
    label: heat delivered to the high-temperature reservoir
    correct_response: 15
    tolerance_absolute: 0.02
    units: kW
  - id: m02-t04-cy02-cop-r
    label: refrigerator coefficient of performance
    correct_response: 4
    tolerance_absolute: 0.02
    units: dimensionless
  - id: m02-t04-cy02-cop-hp
    label: heat-pump coefficient of performance
    correct_response: 5
    tolerance_absolute: 0.02
    units: dimensionless
calculation: "Qdot_H = 12 + 3 = 15 kW; COP_R = 12/3 = 4; COP_HP = 15/3 = 5."
principle: "Close the cycle energy balance, then choose the desired effect for each COP."
feedback:
  m02-t04-cy02-qdot-h: "Add Qdot_L and Wdot_net_in."
  m02-t04-cy02-cop-r: "Use Qdot_L as the refrigerator numerator."
  m02-t04-cy02-cop-hp: "Use Qdot_H as the heat-pump numerator."
-->

### 3. Desired Result and Required Input

Match each device purpose to its performance ratio.

- Refrigerator: [select $Q_L/W_{net,in}$ or $Q_H/W_{net,in}$]
- Heat pump: [select $Q_L/W_{net,in}$ or $Q_H/W_{net,in}$]

<!--
item_id: m02-t04-cy03
item_type: multi_part_matching
response_fields:
  - id: m02-t04-cy03-refrigerator
    label: refrigerator performance ratio
    correct_response: Q_L/W_net_in
  - id: m02-t04-cy03-heat-pump
    label: heat-pump performance ratio
    correct_response: Q_H/W_net_in
principle: "The same cycle uses different numerators because the desired effect differs."
feedback:
  m02-t04-cy03-refrigerator: "For refrigeration, identify the heat removed from the low-temperature space as the desired result."
  m02-t04-cy03-heat-pump: "For heating, identify the heat delivered to the high-temperature space as the desired result."
-->

### 4. Why COP Can Exceed One

Which statement best explains why a heat pump can have $COP_{HP}=5$ without violating the First Law?

- A. Work is multiplied into a larger amount of energy.
- B. The device converts heat to work with more than $100\%$ efficiency.
- C. The delivered heat equals absorbed environmental heat plus work input.
- D. Coefficient of performance ignores energy conservation.

<!--
item_id: m02-t04-cy04
item_type: single_select
correct_response: C
principle: "A heat pump transports heat; Q H is supplied by both Q L and W net in."
feedback_if_incorrect: "Write Q H = Q L + W net in and identify the source of each term."
-->

### 5. Notes for Discussion—Not Automatically Evaluated

Describe one situation in which the same physical system should be evaluated using $COP_R$ at one time and $COP_{HP}$ at another.

## Problem-Solving Connection

- Worked example: [[worked-same-cycle-different-purpose]]
- Guided practice: [[guided-thermal-device-performance]]
- Independent practice: [[independent-refrigerator-heat-pump-cop]]

## Concept Cross-References

- **Prerequisite:** [[thermal-energy-reservoirs]]
- **Compare:** [[heat-engines-thermal-efficiency]]
- **Apply:** [[cold-storage-and-heat-pump-performance]]
- **Extend:** [[vapor-compression-refrigeration-cycle]]
- **Next:** [[reversibility-irreversibility-carnot-limits]]

## Key Takeaways

- Refrigerators and heat pumps absorb $Q_L$, require $W_{net,in}$, and reject $Q_H$.
- The cycle balance is $Q_H=Q_L+W_{net,in}$.
- Refrigerator COP uses $Q_L$ as the desired result; heat-pump COP uses $Q_H$.
- COP can exceed one because the device transports heat rather than converting work alone into the desired heat transfer.
- For the same cycle and condition, $COP_{HP}=COP_R+1$.

## Sources and Attribution

- `SRC-MCET530-W2-NOTES` — refrigerator and heat-pump energy flows, COP definitions, and same-cycle/different-purpose distinction; rewritten for this draft.
- `SRC-MCET530-EXAM1-2024` — desired-over-required framing and cyclic-device energy balances; terminology corrected so COP is not labeled thermal efficiency.

Rights and publication status are recorded in `validation/source-manifest.md`.
