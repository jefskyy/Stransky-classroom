<!--
---
id: m02-t02
title: Thermal Energy Reservoirs
slug: thermal-energy-reservoirs
page_type: topic
visibility: public
nav_order: 20
module: 02-second-law
mlo:
  - MLO2
daily_los:
  - DLO-007
  - DLO-009
prerequisites:
  - purpose-second-law-energy-quality
  - system-boundary-and-surroundings
  - heat-and-work-interactions
estimated_time_minutes: 10
difficulty: introductory
problem_families:
  - reservoir-model-validity
  - identify-source-and-sink
  - interpret-energy-flow
interactive_elements:
  - source-device-sink-reservoir-selector
assets:
  - assets/svg/second-law/source-device-sink-reservoirs.svg
key_terms:
  - thermal energy reservoir
  - thermal capacitance
  - source
  - sink
  - high-temperature reservoir
  - low-temperature reservoir
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
# Thermal Energy Reservoirs

## Learning Objectives

By the end of this topic, you will be able to:

- determine whether a body can reasonably be modeled as a thermal energy reservoir for a specified interaction;
- distinguish a thermal source from a thermal sink based on heat-transfer direction; and
- identify the high- and low-temperature reservoirs used to model a heat engine, refrigerator, or heat pump.

## Why This Matters

Carnot limits and cyclic-device diagrams assume heat exchange with bodies whose temperatures remain effectively constant. Engineers must decide when that assumption is reasonable. A large lake may behave as a reservoir for one device and not for an entire industrial region. Reservoir behavior is therefore a model choice tied to system scale, exchanged heat, time interval, and acceptable temperature change.

## Prerequisite Check

1. What physical variable drives spontaneous heat transfer?
2. What distinguishes the system from its surroundings?
3. Does the label “source” identify an object permanently, or does it describe the object's role in a particular interaction?

## Core Theoretical Concepts

### Reservoir Definition

A **thermal energy reservoir** is an idealized body that can absorb or supply a finite amount of heat while undergoing negligible temperature change for the analysis being performed.

The defining approximation is:

$$
T_R\approx \text{constant during the interaction}.
$$

The body does not need to be literally infinite. It needs sufficient effective thermal capacitance relative to the heat exchanged and the allowable temperature variation.

Examples that may be treated as reservoirs at an appropriate scale include:

- atmospheric air;
- oceans, lakes, and large rivers;
- the ground;
- a large furnace or combustion environment maintained near a specified temperature;
- a controlled phase-change bath maintained near its saturation temperature.

Whether any example is valid depends on the problem scale and assumptions.

### Thermal Capacitance and Temperature Change

A body's effective thermal capacitance $C_R$ measures the energy required to change its temperature by one degree over the modeled range.

For a body with approximately constant mass and specific heat:

$$
C_R\approx m_R c_R.
$$

A body behaves more nearly as a reservoir when its predicted temperature change is small compared with the tolerance of the analysis.

### Source and Sink Are Interaction Roles

A reservoir is a **thermal source** when it supplies heat to the selected system. It is a **thermal sink** when it absorbs heat from the selected system.

The same physical body can serve either role in different analyses. Outdoor air can absorb rejected heat from an air conditioner in summer and supply heat to a heat pump in winter.

### High- and Low-Temperature Reservoirs

For a two-reservoir cyclic device:

$$
T_H>T_L.
$$

- The high-temperature reservoir is labeled $T_H$.
- The low-temperature reservoir is labeled $T_L$.

These labels identify relative temperature levels. They do not by themselves determine the heat-arrow directions. The device purpose determines those directions:

- heat engine: $Q_H$ enters the device and $Q_L$ leaves;
- refrigerator or heat pump: $Q_L$ enters the device and $Q_H$ leaves.

## Governed Equations

<a id="M02-EQ-003"></a>
### Reservoir Temperature-Change Estimate — `M02-EQ-003`

$$\left|\Delta T_R\right|\approx\frac{\left|Q_R\right|}{C_R}$$

where:

- $\Delta T_R$ is the reservoir temperature change;
- $Q_R$ is the heat transferred to or from the reservoir during the interaction; and
- $C_R$ is the effective thermal capacitance of the reservoir.

For an approximately constant-specific-heat body:

$$
C_R\approx m_R c_R.
$$

**Equation type:** approximation derived from an energy balance  
**Applicable system:** a body with an approximately uniform temperature and a known effective thermal capacitance  
**Required assumptions:** negligible phase or property variation not represented by $C_R$; approximately uniform reservoir temperature; no unmodeled energy interactions large enough to invalidate the estimate  
**Units:** $Q_R$ in energy, $C_R$ in energy per temperature, and $\Delta T_R$ in temperature difference  
**Physical interpretation:** larger thermal capacitance produces a smaller temperature change for the same heat exchange  
**Limit:** reservoir validity is judged against an explicit analysis tolerance, not against a universal numerical threshold

### Reservoir-Validity Criterion

$$\left|\Delta T_R\right|\le\Delta T_{allow}$$

where $\Delta T_{allow}$ is the largest temperature change that the model or engineering decision can neglect.

**Equation type:** modeling criterion  
**Applicable system:** any proposed reservoir model  
**Required assumptions:** the analyst has defined a defensible temperature tolerance  
**Physical interpretation:** a reservoir model is acceptable only when the predicted change is small enough for the intended use  
**Constraint:** the same body may pass this test for one process and fail it for another

## Interactive Diagram Specifications

![A high-temperature reservoir, cyclic device, and low-temperature reservoir with selectable source and sink roles](assets/svg/second-law/source-device-sink-reservoirs.svg)

- **Asset:** `assets/svg/second-law/source-device-sink-reservoirs.svg`
- **Viewport:** responsive `viewBox`; default aspect ratio approximately `3:4` on mobile and `4:3` on desktop
- **Primary elements:** upper reservoir, central cyclic device, lower reservoir, $Q_H$ arrow, $Q_L$ arrow, temperature-change indicators
- **Required labels:** `High-temperature reservoir`, `Low-temperature reservoir`, $T_H$, $T_L$, $Q_H$, $Q_L$, `source`, `sink`
- **Interaction:** the learner selects heat engine, refrigerator, or heat pump; arrow directions and source/sink labels update while reservoir positions remain fixed
- **Accessible title:** `Thermal reservoirs and cyclic-device heat interactions`
- **Accessible description:** `Two constant-temperature reservoirs at T H and T L surround a cyclic device. Heat arrows change direction according to whether the device is a heat engine, refrigerator, or heat pump.`
- **Keyboard behavior:** device purpose is selected with a three-option radio group; updated arrow descriptions are announced in a live region
- **Non-color cues:** arrowheads, labels, solid versus dashed outlines, and source/sink words identify function
- **Mobile behavior:** reservoir and device rectangles stack vertically; work arrow moves below the device if horizontal space is insufficient
- **Text fallback:** for a heat engine, heat enters from $T_H$ and leaves to $T_L$; for a refrigerator or heat pump, heat is absorbed from $T_L$ and rejected to $T_H$ with work input

## Interpret the Diagram

The upper and lower positions encode temperature level, not source/sink status. The high-temperature reservoir is always at $T_H$, but it is a source for a heat engine and a sink for a refrigerator or heat pump. The low-temperature reservoir is a sink for a heat engine and a source for a refrigerator or heat pump.

This distinction prevents a common diagram error: assuming that “high temperature” always means heat enters the device.

## Engineering Application

A power plant may use a furnace or nuclear reactor as the high-temperature reservoir and a river, cooling tower, or atmosphere as the low-temperature reservoir. Before treating the river as constant-temperature, the analyst should estimate the temperature rise caused by the rejected heat and compare it with environmental and modeling constraints.

See [[community-power-plant-performance]].

## Common Misconceptions

### A Reservoir Must Have Infinite Mass

- **Plausible incorrect idea:** Only an infinitely large body can be a reservoir.
- **Why it fails:** Reservoir behavior is an approximation over a specified interaction.
- **Correct reasoning:** Estimate the temperature change and compare it with an explicit tolerance.

### Large $m c$ Alone Proves Reservoir Behavior

- **Plausible incorrect idea:** A large numerical value of $m c$ automatically establishes a reservoir.
- **Why it fails:** $m c$ has units, and its adequacy depends on the magnitude of $Q_R$ and the allowed $\Delta T_R$.
- **Correct reasoning:** Evaluate $|Q_R|/C_R$ and compare with $\Delta T_{allow}$.

### A High-Temperature Reservoir Is Always a Source

- **Plausible incorrect idea:** Heat must always leave $T_H$ and enter the cyclic device.
- **Why it fails:** A refrigerator or heat pump rejects heat to $T_H$.
- **Correct reasoning:** Temperature labels locate the reservoirs; device purpose determines arrow directions.

### Source and Sink Are Permanent Object Types

- **Plausible incorrect idea:** Outdoor air is always a heat sink.
- **Why it fails:** Outdoor air can supply heat to a heat pump or receive heat from an air conditioner.
- **Correct reasoning:** Source and sink describe the direction of heat transfer in the selected process.

## Check Your Understanding

### 1. Reservoir-Validity Estimate

A well-mixed tank contains $1000\ \text{kg}$ of water with $c=4.18\ \text{kJ}/(\text{kg}\cdot\text{K})$. It absorbs $1.00\ \text{MJ}$ of heat. Estimate its temperature rise.

- A. $0.024\ \text{K}$
- B. $0.239\ \text{K}$
- C. $2.39\ \text{K}$
- D. $239\ \text{K}$

<!--
item_id: m02-t02-cy01
item_type: single_select
correct_response: B
calculation: DeltaT = 1000 kJ / (1000 kg * 4.18 kJ/(kg K)) = 0.239 K
principle: "Reservoir validity depends on the temperature change produced by the specified heat transfer."
feedback_if_incorrect: "Convert 1.00 MJ to 1000 kJ before dividing by m c."
-->

### 2. Model Decision

For the tank in Item 1, the analysis permits at most a $0.5\ \text{K}$ change in reservoir temperature. Is the reservoir assumption acceptable for this interaction?

- A. Yes
- B. No
- C. Only if the water is boiling
- D. The decision cannot use a temperature tolerance

<!--
item_id: m02-t02-cy02
item_type: single_select
correct_response: A
principle: "The estimated 0.239 K change is less than the stated 0.5 K tolerance."
feedback_if_incorrect: "Compare the predicted temperature change directly with the allowable change."
-->

### 3. Source and Sink Roles

A winter heat pump absorbs heat from outdoor air and delivers heat to a building. Which statement is correct?

- A. Outdoor air is the high-temperature source.
- B. Outdoor air is the low-temperature source, and the building is the high-temperature sink.
- C. The building is the low-temperature source.
- D. Both outdoor air and the building are sinks.

<!--
item_id: m02-t02-cy03
item_type: single_select
correct_response: B
principle: "The heat pump absorbs Q L from the low-temperature outdoor reservoir and rejects Q H to the high-temperature indoor reservoir."
feedback_if_incorrect: "Identify the direction of each heat transfer before assigning source and sink."
-->

### 4. Notes for Discussion—Not Automatically Evaluated

Name a body that could be treated as a thermal reservoir for a laboratory-scale device but not for a city-scale thermal system. State what additional information would be needed to justify the model.

## Problem-Solving Connection

- Worked example: [[worked-reservoir-temperature-change]]
- Guided practice: [[guided-source-and-sink-identification]]
- Independent practice: [[independent-reservoir-model-validity]]

## Concept Cross-References

- **Prerequisite:** [[purpose-second-law-energy-quality]]
- **Next:** [[heat-engines-thermal-efficiency]]
- **Compare:** [[finite-thermal-body]]
- **Apply:** [[community-power-plant-performance]]
- **Extend:** [[entropy-generation-during-heat-transfer]]

## Key Takeaways

- A thermal energy reservoir exchanges finite heat with negligible temperature change for the selected analysis.
- Reservoir validity depends on $Q_R$, thermal capacitance, and the allowable temperature change.
- Source and sink are roles defined by heat-transfer direction.
- $T_H$ and $T_L$ identify relative temperature levels; they do not determine arrow direction by themselves.

## Sources and Attribution

- `SRC-MCET530-W2-NOTES` — reservoir examples and source/sink context; rewritten and technically refined for this draft.
- `SRC-MCET530-EXAM1-2024` — reservoir role within heat-engine, refrigerator, and heat-pump models; rewritten for this draft.

The dimensionally incomplete shorthand `$m c_p\gg 1$` from the raw notes is not used as a validity test. The draft instead compares the predicted temperature change with an explicit tolerance. See `validation/technical-issue-register.md`.
