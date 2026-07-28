---
id: m02-t05
title: Reversibility, Irreversibility, and Carnot Limits
slug: reversibility-irreversibility-carnot-limits
page_type: topic
visibility: public
nav_order: 50
module: 02-second-law
mlo:
  - MLO2
daily_los:
  - DLO-012
  - DLO-013
  - DLO-014
prerequisites:
  - purpose-second-law-energy-quality
  - thermal-energy-reservoirs
  - heat-engines-thermal-efficiency
  - refrigerators-heat-pumps-cop
estimated_time_minutes: 18
difficulty: intermediate
problem_families:
  - reversibility-classification
  - irreversibility-identification
  - carnot-limit-calculation
  - actual-versus-reversible-comparison
  - thermal-device-claim-audit
interactive_elements:
  - actual-reversible-impossible-performance-comparator
assets:
  - assets/svg/second-law/carnot-performance-limit.svg
key_terms:
  - reversible process
  - irreversible process
  - impossible process
  - irreversibility
  - internally reversible
  - externally reversible
  - Carnot cycle
  - Carnot principles
  - reversible limit
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
  - SRC-MCET530-ASSUMPTIONS-2025
accessibility_review: pending
technical_review: pending
---

# Reversibility, Irreversibility, and Carnot Limits

## Learning Objectives

By the end of this topic, you will be able to:

- differentiate reversible, irreversible, and impossible processes;
- identify common sources of irreversibility and distinguish internal from external reversibility; and
- calculate Carnot performance limits and compare an actual claim with the reversible limit for the same two reservoirs.

## Why This Matters

A performance metric has little meaning without a reference. Comparing every heat engine with $100\%$ efficiency or every heat pump with an arbitrary COP can produce poor engineering judgments. The reversible Carnot limit provides the correct theoretical benchmark for devices operating between specified reservoir temperatures.

The same benchmark also serves as a feasibility screen. A claim above the reversible limit is impossible. A claim below the limit may be irreversible and potentially feasible, but it still must satisfy the First Law and all other model requirements.

## Prerequisite Check

1. What is the heat-engine energy balance using positive magnitudes?
2. What desired result appears in the numerator of $COP_R$? What appears in the numerator of $COP_{HP}$?
3. Which temperature scale must be used when forming thermodynamic temperature ratios?

## Core Theoretical Concepts

### Reversible Process

A process is **reversible** if the system and all relevant surroundings can both be restored to their initial states with no net change anywhere.

A reversible process is an ideal limit, not an ordinary actual process. It requires the elimination of every irreversibility affecting the system and surroundings.

Reversible models are useful because they establish:

- maximum work output from work-producing systems;
- minimum work input for work-consuming systems; and
- maximum thermal efficiency or coefficient of performance between specified reservoirs.

A quasi-equilibrium or very slow process may avoid some nonequilibrium effects, but slowness alone does not make a process reversible. Friction, mixing, electrical resistance, and heat transfer through a finite temperature difference can remain.

### Irreversible Process

A process is **irreversible** when the system and surroundings cannot both be restored without leaving a net effect.

All actual processes include some irreversibility. Common sources include:

- mechanical or fluid friction;
- unrestrained expansion;
- non-quasi-equilibrium expansion or compression;
- heat transfer through a finite temperature difference;
- mixing of different substances or streams;
- chemical reaction; and
- electrical resistance.

Irreversibilities reduce work output from heat engines and increase the work input required by refrigerators and heat pumps relative to reversible devices operating between the same reservoirs.

### Impossible Process

A process is **impossible** when it violates a governing physical law or a required feasibility condition.

Examples include:

- a cycle that fails its energy balance;
- a cyclic heat engine with $\eta_{th}=1$;
- a refrigerator that transfers heat from cold to hot with no work input or other effect; and
- a thermal device whose claimed performance exceeds the Carnot limit between its stated reservoir temperatures.

### Internal, External, and Total Reversibility

A process is **internally reversible** when no irreversibilities occur within the selected system boundary. Irreversibilities may still occur in the surroundings.

A process is **externally reversible** when interactions between the system and surroundings introduce no irreversibility. For heat transfer, this limiting condition requires an infinitesimal temperature difference across the boundary where heat crosses.

A process is **totally reversible** only when it is both internally and externally reversible.

These labels depend on the chosen system boundary. Always identify the boundary before classifying the location of irreversibility.

### Carnot Cycle as a Reversible Benchmark

The Carnot cycle is a theoretical reversible cycle containing four reversible processes:

1. isothermal heat addition at $T_H$;
2. adiabatic reversible expansion from $T_H$ to $T_L$;
3. isothermal heat rejection at $T_L$; and
4. adiabatic reversible compression from $T_L$ to $T_H$.

When reversed, the same ideal cycle represents a reversible refrigerator or heat pump.

This module uses the Carnot cycle primarily as a performance benchmark. Detailed entropy analysis of the reversible adiabatic processes is deferred to [[entropy-and-entropy-generation]] and [[isentropic-processes]].

### Carnot Principles

The Carnot principles establish two central results:

1. No irreversible heat engine operating between two specified reservoirs can be more efficient than a reversible heat engine operating between those same reservoirs.
2. All reversible heat engines operating between the same two reservoirs have the same thermal efficiency, independent of working fluid or cycle details.

Equivalent maximum-performance conclusions apply to refrigerators and heat pumps.

### Absolute Temperature Requirement

For a reversible device, the heat-transfer ratio is related to the reservoir temperatures:

$$
\left(\frac{Q_L}{Q_H}\right)_{rev}
=
\frac{T_L}{T_H}.
$$

The ratio requires an absolute temperature scale because $0\ ^\circ\text{C}$ and $0\ ^\circ\text{F}$ are arbitrary reference points. Use Kelvin or Rankine.

### Actual Versus Reversible Performance

For devices operating between the same $T_H$ and $T_L$:

- an actual heat engine has $\eta_{th,actual}<\eta_{th,Carnot}$;
- an actual refrigerator has $COP_{R,actual}<COP_{R,Carnot}$; and
- an actual heat pump has $COP_{HP,actual}<COP_{HP,Carnot}$.

Equality represents the reversible idealization. A value above the reversible limit is impossible.

### Feasibility Audit Sequence

Use three gates when evaluating a thermal-device claim:

1. **Model gate:** Does the diagram represent the claimed device and identify both reservoirs and all work interactions?
2. **First-Law gate:** Do the heat and work quantities satisfy the complete-cycle energy balance?
3. **Second-Law gate:** Is the performance no greater than the reversible limit between the same reservoir temperatures?

Passing all three gates means the claim is **not rejected by these tests**. It does not prove that the stated materials, component behavior, cost, safety, or other assumptions are realistic.

### Limiting Behavior and Physical Checks

The Carnot equations provide immediate trend checks:

- If $T_L\to T_H$, then $\eta_{th,Carnot}\to 0$. A heat engine cannot produce net work from two reservoirs at the same temperature.
- For a fixed $T_H$, lowering $T_L$ raises the heat-engine limit. The mathematical limit $\eta_{th,Carnot}\to 1$ would require $T_L\to 0\ \text{K}$, which is not an attainable practical sink.
- If the temperature lift $T_H-T_L$ becomes smaller, reversible refrigerator and heat-pump COPs increase. Moving heat across a smaller temperature difference requires less ideal work per unit heat transported.
- Increasing the temperature lift lowers both reversible COPs and increases the minimum work required for a specified heating or cooling effect.

These trends are useful for checking calculations before comparing them with actual equipment.

## Governed Equations

<a id="M02-EQ-010"></a>
### Reversible Heat-Transfer Ratio — `M02-EQ-010`

$$
\left(\frac{Q_L}{Q_H}\right)_{rev}
=
\frac{T_L}{T_H}
$$

where:

- $Q_H$ is the heat exchanged with the high-temperature reservoir;
- $Q_L$ is the heat exchanged with the low-temperature reservoir;
- $T_H$ is the absolute temperature of the high-temperature reservoir; and
- $T_L$ is the absolute temperature of the low-temperature reservoir.

**Equation type:** reversible-cycle relationship  
**Applicable system:** a reversible cyclic device operating between two constant-temperature reservoirs  
**Required assumptions:** complete reversibility; only the two stated thermal reservoirs participate in heat transfer; $T_H$ and $T_L$ are absolute temperatures  
**Units:** $Q_L/Q_H$ and $T_L/T_H$ are dimensionless  
**Physical interpretation:** for reversible devices, the heat-transfer ratio depends only on reservoir temperatures  
**Limits or constraints:** do not apply this equality to an actual irreversible device

<a id="M02-EQ-011"></a>
### Carnot Heat-Engine Efficiency — `M02-EQ-011`

$$
\eta_{th,Carnot}
=
1-\frac{T_L}{T_H}
$$

**Equation type:** reversible maximum-performance relationship  
**Applicable system:** any reversible heat engine operating between $T_H$ and $T_L$  
**Required assumptions:** reversible cycle; two constant-temperature reservoirs; absolute temperatures  
**Units:** dimensionless  
**Physical interpretation:** the maximum fraction of heat input that can become net work between the specified temperatures  
**Limits or constraints:** $0\le\eta_{th,Carnot}<1$ for $0<T_L\le T_H$; actual heat engines must satisfy $\eta_{th,actual}<\eta_{th,Carnot}$

<a id="M02-EQ-012"></a>
### Carnot Refrigerator COP — `M02-EQ-012`

$$
COP_{R,Carnot}
=
\frac{T_L}{T_H-T_L}
$$

**Equation type:** reversible maximum-performance relationship  
**Applicable system:** reversible refrigerator operating between $T_H$ and $T_L$  
**Required assumptions:** reversible cycle; two constant-temperature reservoirs; absolute temperatures  
**Units:** dimensionless  
**Physical interpretation:** maximum cooling effect per unit work input for the specified temperatures  
**Limits or constraints:** $T_H>T_L>0$; actual refrigerator COP must be lower

<a id="M02-EQ-013"></a>
### Carnot Heat-Pump COP — `M02-EQ-013`

$$
COP_{HP,Carnot}
=
\frac{T_H}{T_H-T_L}
$$

**Equation type:** reversible maximum-performance relationship  
**Applicable system:** reversible heat pump operating between $T_H$ and $T_L$  
**Required assumptions:** reversible cycle; two constant-temperature reservoirs; absolute temperatures  
**Units:** dimensionless  
**Physical interpretation:** maximum heating effect per unit work input for the specified temperatures  
**Limits or constraints:** $T_H>T_L>0$; actual heat-pump COP must be lower

<a id="M02-EQ-014"></a>
### Actual–Reversible–Impossible Classification — `M02-EQ-014`

For a heat engine:

$$
\eta_{th,claim}
\begin{cases}
<\eta_{th,Carnot} & \text{irreversible or otherwise not ruled out by this limit},\\
=\eta_{th,Carnot} & \text{reversible idealization},\\
>\eta_{th,Carnot} & \text{impossible}.
\end{cases}
$$

For a refrigerator or heat pump, replace $\eta_{th}$ with the corresponding COP.

**Equation type:** feasibility-classification rule  
**Applicable system:** a claim evaluated against a reversible device between the same $T_H$ and $T_L$  
**Required assumptions:** the claimed and reversible devices use the same reservoir temperatures and the claim separately satisfies the cycle energy balance  
**Physical interpretation:** the reversible value is the upper bound  
**Limit:** a value below the bound is not automatically proven feasible

## Interactive Diagram Specifications

![Performance comparison among irreversible, reversible, and impossible thermal devices operating between the same reservoirs](assets/svg/second-law/carnot-performance-limit.svg)

- **Asset:** `assets/svg/second-law/carnot-performance-limit.svg`
- **Viewport:** responsive `viewBox`; default aspect ratio approximately `16:9`
- **Primary elements:** two reservoir temperature controls, device selector, Carnot-limit marker, actual-performance marker, classification region, compact energy-flow diagram
- **Required labels:** $T_H$, $T_L$, $\eta_{th,Carnot}$, $COP_{R,Carnot}$, $COP_{HP,Carnot}$, `irreversible`, `reversible limit`, `impossible`
- **Interaction:** the learner selects heat engine, refrigerator, or heat pump; enters $T_H$, $T_L$, and claimed performance; the display calculates the reversible limit and classifies the claim after validating absolute temperatures and $T_H>T_L$
- **Accessible title:** `Actual performance compared with the Carnot limit`
- **Accessible description:** `A performance scale shows values below the Carnot limit as irreversible or not ruled out, the limit as reversible, and values above the limit as impossible for a selected device operating between T H and T L.`
- **Keyboard behavior:** all numeric fields and device controls are keyboard operable; the classification is announced in a live region
- **Non-color cues:** patterned regions, boundary lines, inequality symbols, and text labels identify classifications
- **Mobile behavior:** the performance scale changes from horizontal to vertical; equations remain adjacent to results
- **Text fallback:** calculate the appropriate Carnot metric from absolute temperatures, then compare the claim using less than, equal to, or greater than

## Interpret the Diagram

The reversible marker is a boundary, not a target that actual equipment is expected to reach. A claim below the marker is consistent with an irreversible device only if its energy balance and model are also valid. A claim exactly at the marker represents an ideal reversible device. A claim above the marker is impossible under the stated reservoir temperatures.

The reservoirs must remain the same during the comparison. Increasing $T_H$ or decreasing $T_L$ changes the heat-engine limit. Changing either temperature also changes the refrigerator and heat-pump limits.

## Engineering Application

A vendor may advertise a new thermal device using an efficiency or COP without stating its operating temperatures. The number cannot be interpreted fully until the source and sink temperatures are known. A useful engineering review requests the complete energy-flow data, verifies the cycle balance, calculates the Carnot limit, and reports the ratio of actual performance to the reversible benchmark.

See [[waste-heat-recovery-feasibility]] and [[independent-carnot-claim-check]].

## Common Misconceptions

### Slow Means Reversible

- **Plausible incorrect idea:** Any slow process is reversible.
- **Why it fails:** Friction, mixing, electrical resistance, and finite-temperature-difference heat transfer can remain at slow rates.
- **Correct reasoning:** Reversibility requires removal of all internal and external irreversibilities.

### Quasi-Equilibrium Is Sufficient for Reversibility

- **Plausible incorrect idea:** A process that passes through near-equilibrium states is automatically reversible.
- **Why it fails:** Quasi-equilibrium addresses state uniformity but not every dissipative effect.
- **Correct reasoning:** Quasi-equilibrium may be necessary for some reversible processes but is not sufficient.

### Carnot Performance Is Typical Actual Performance

- **Plausible incorrect idea:** $\eta_{th,Carnot}$ or $COP_{Carnot}$ predicts what commercial equipment will deliver.
- **Why it fails:** Carnot performance assumes complete reversibility.
- **Correct reasoning:** Use it as an upper bound and comparison benchmark.

### Degrees Celsius Can Be Used Because Temperature Differences Are Equivalent

- **Plausible incorrect idea:** Since $1\ \text{K}$ and $1\ ^\circ\text{C}$ represent the same temperature difference, Celsius can be used in $T_L/T_H$.
- **Why it fails:** A ratio depends on the zero point, not only on interval size.
- **Correct reasoning:** Convert temperature levels to Kelvin or Rankine before forming ratios.

### Below the Carnot Limit Proves Feasibility

- **Plausible incorrect idea:** Any claimed efficiency below $\eta_{th,Carnot}$ is valid.
- **Why it fails:** The claim may still violate the First Law, use inconsistent units, omit an interaction, or rely on invalid assumptions.
- **Correct reasoning:** Apply the model, First-Law, and Second-Law gates.

### The Same Carnot Limit Applies at Different Reservoir Temperatures

- **Plausible incorrect idea:** An efficiency can be compared with any convenient Carnot value.
- **Why it fails:** The reversible limit is specific to $T_H$ and $T_L$.
- **Correct reasoning:** Compare actual and reversible devices between the same reservoirs.

## Check Your Understanding

### 1. Identify Irreversibilities

Which effects make a process irreversible? Select all that apply.

- A. Sliding friction
- B. Heat transfer across a finite temperature difference
- C. Spontaneous mixing of different fluids
- D. A reversible adiabatic process
- E. Electrical resistance

<!--
item_id: m02-t05-cy01
item_type: multi_select
correct_response: [A, B, C, E]
principle: "Dissipative effects and finite driving-force transfers generate irreversibility; a reversible adiabatic process is an ideal non-irreversible process."
feedback_if_incorrect: "Identify whether each effect leaves a net change that prevents restoration of both system and surroundings."
-->

### 2. Heat-Engine Limit and Claim

A heat engine operates between $T_H=800\ \text{K}$ and $T_L=300\ \text{K}$ and is claimed to have $\eta_{th}=0.68$.

1. Enter the maximum theoretical thermal efficiency: $\eta_{th,Carnot}=\underline{\hspace{2.2cm}}$.
2. Classify the claim as `below the limit`, `reversible limit`, or `impossible`.

<!--
item_id: m02-t05-cy02
item_type: multi_part_numeric_and_select
response_fields:
  - id: m02-t05-cy02-eta-carnot
    label: Carnot heat-engine efficiency
    correct_response: 0.625
    tolerance_absolute: 0.001
    units: dimensionless
  - id: m02-t05-cy02-classification
    label: claim classification
    correct_response: impossible
    options:
      - below the limit
      - reversible limit
      - impossible
calculation: "eta_Carnot = 1 - 300/800 = 0.625; the claim 0.68 exceeds the limit."
principle: "Compare the claimed efficiency with the reversible limit for the same reservoirs."
feedback:
  m02-t05-cy02-eta-carnot: "Use eta_Carnot = 1 - T_L/T_H with absolute temperatures."
  m02-t05-cy02-classification: "A value above the reversible limit is impossible even though it is below one."
-->

### 3. Refrigerator Limit and Claim

A refrigerator operates between $T_L=270\ \text{K}$ and $T_H=300\ \text{K}$ and is claimed to have $COP_R=10$.

1. Enter the reversible limit: $COP_{R,Carnot}=\underline{\hspace{2.2cm}}$.
2. Classify the claim as `below the limit`, `reversible limit`, or `impossible`.

<!--
item_id: m02-t05-cy03
item_type: multi_part_numeric_and_select
response_fields:
  - id: m02-t05-cy03-cop-r-carnot
    label: Carnot refrigerator coefficient of performance
    correct_response: 9
    tolerance_absolute: 0.02
    units: dimensionless
  - id: m02-t05-cy03-classification
    label: claim classification
    correct_response: impossible
    options:
      - below the limit
      - reversible limit
      - impossible
calculation: "COP_R_Carnot = 270/(300-270) = 9; the claim 10 exceeds the limit."
principle: "COP may exceed one, but it cannot exceed the reversible COP for the same reservoirs."
feedback:
  m02-t05-cy03-cop-r-carnot: "Calculate T_H - T_L first, then divide T_L by that difference."
  m02-t05-cy03-classification: "The absence of a one-unit upper bound does not remove the Carnot upper bound."
-->

### 4. Passing the Carnot Check

A heat-engine claim satisfies its cycle energy balance and has $\eta_{th}=0.50$ between $800\ \text{K}$ and $300\ \text{K}$. Which conclusion is justified from the information given?

- A. The device is proven feasible and commercially practical.
- B. The device is reversible.
- C. The claim is below the Carnot limit and is not rejected by these thermodynamic checks.
- D. The device violates the Second Law.

<!--
item_id: m02-t05-cy04
item_type: single_select
correct_response: C
principle: "A value below the Carnot limit may represent an irreversible device, but passing these checks does not validate every engineering assumption."
feedback_if_incorrect: "Distinguish “not ruled out” from “proven feasible.”"
-->

### 5. Absolute Temperature

A heat engine operates between $500\ ^\circ\text{C}$ and $30\ ^\circ\text{C}$. Which temperatures should be substituted into the Carnot equation?

- A. $500$ and $30$
- B. $773.15$ and $303.15$
- C. $530$ and $0$
- D. $932$ and $86$

<!--
item_id: m02-t05-cy05
item_type: single_select
correct_response: B
principle: "Carnot temperature ratios require absolute temperature levels in Kelvin or Rankine."
feedback_if_incorrect: "Convert each Celsius temperature by adding 273.15 before forming the ratio."
-->

### 6. Notes for Discussion—Not Automatically Evaluated

Choose one actual engineering process and identify at least two distinct irreversibilities. State whether each is internal or external for a clearly defined system boundary.

## Problem-Solving Connection

- Worked example: [[worked-carnot-performance-limit]]
- Completion problem: [[completion-actual-versus-reversible]]
- Independent practice: [[independent-carnot-claim-check]]
- Interleaved activity: [[build-or-reject-the-thermal-device]]

## Concept Cross-References

- **Prerequisite:** [[heat-engines-thermal-efficiency]]
- **Prerequisite:** [[refrigerators-heat-pumps-cop]]
- **Apply:** [[waste-heat-recovery-feasibility]]
- **Extend:** [[entropy-and-entropy-generation]]
- **Extend:** [[isentropic-processes]]
- **Review:** [[thermal-energy-reservoirs]]

## Key Takeaways

- Reversible processes restore both system and surroundings with no net change; they are ideal limits.
- All actual processes contain irreversibilities.
- A process is impossible if it violates conservation, required Second-Law direction, or the reversible performance limit.
- Carnot equations require absolute reservoir temperatures.
- Actual performance is lower than reversible performance between the same reservoirs.
- Passing a Carnot comparison does not replace the First-Law check or validate every engineering assumption.

## Sources and Attribution

- `SRC-MCET530-W2-NOTES` — reversibility definitions, irreversibility examples, Carnot principles, and reversible performance equations; rewritten and corrected for this draft.
- `SRC-MCET530-EXAM1-2024` — actual-versus-reversible comparisons and Carnot-cycle process sequence; OCR inequality order independently verified and presented explicitly.
- `SRC-MCET530-ASSUMPTIONS-2025` — internally reversible and adiabatic terminology used only as a terminology cross-check; rendered equations were not reused.

Rights, technical corrections, and deferred entropy treatment are recorded in `validation/source-manifest.md` and `validation/technical-issue-register.md`.
