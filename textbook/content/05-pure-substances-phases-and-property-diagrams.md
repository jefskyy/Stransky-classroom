---
id: m01-t05
title: Pure Substances, Phases, and Property Diagrams
slug: pure-substances-phases-and-property-diagrams
page_type: topic
visibility: public
nav_order: 50
module: 01-foundations
mlo:
  - MLO1
daily_los:
  - DLO-004
  - DLO-005
prerequisites:
  - properties-states-and-equilibrium
  - thermodynamic-processes-and-cycles
estimated_time_minutes: 24
difficulty: introductory
problem_families:
  - pure-substance-classification
  - phase-identification
  - quality-calculation
  - property-diagram-interpretation
interactive_elements:
  - liquid-vapor-dome-state-classifier
assets:
  - assets/svg/foundations/liquid-vapor-dome-state-classifier.svg
key_terms:
  - pure substance
  - phase
  - compressed liquid
  - saturated liquid
  - saturated mixture
  - saturated vapor
  - superheated vapor
  - saturation temperature
  - saturation pressure
  - quality
  - vapor dome
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

# Pure Substances, Phases, and Property Diagrams

## Learning Objectives

By the end of this topic, you will be able to:

- identify whether a working fluid can be modeled as a pure substance;
- classify compressed-liquid, saturated-liquid, saturated-mixture, saturated-vapor, and superheated-vapor states; and
- use quality and property diagrams to interpret states in the liquid-vapor phase-change region.

## Why This Matters

The correct property source depends on phase. A pressure and temperature pair that identifies superheated steam requires different data from a saturated mixture at the same pressure.

Phase classification must occur before interpolation or property lookup. Otherwise, an apparently precise numerical result may be drawn from the wrong table or equation.

## Prerequisite Check

1. What does it mean for two intensive properties to be independent?
2. Why do $P$ and $T$ fail to provide two independent properties at saturation?
3. Which quantities are state properties rather than process transfers?

## Core Theoretical Concepts

### Pure Substance

A **pure substance** has a uniform and fixed chemical composition throughout the selected system.

A pure substance may contain more than one phase. A mixture of liquid water and water vapor is still a pure substance because both phases have the same chemical composition.

Air is often modeled as a pure substance when its composition remains fixed and condensation or chemical reaction is not important. An air-fuel mixture whose composition changes during reaction is not modeled the same way.

### Phase

A **phase** is a homogeneous region with a distinct molecular structure or physical form.

The liquid-vapor states emphasized here are:

1. **compressed liquid** or **subcooled liquid**;
2. **saturated liquid**;
3. **saturated liquid-vapor mixture**;
4. **saturated vapor**; and
5. **superheated vapor**.

### Saturation Temperature and Pressure

For a pure substance in liquid-vapor equilibrium, saturation temperature and saturation pressure are linked:

- $T_{sat}(P)$ is the phase-change temperature at a specified pressure;
- $P_{sat}(T)$ is the phase-change pressure at a specified temperature.

At a saturated state, $T$ and $P$ are dependent.

### Phase Classification From $P$ and $T$

For subcritical liquid-vapor states:

- if $T<T_{sat}(P)$, the state is compressed liquid;
- if $T=T_{sat}(P)$, the state is saturated but not fully fixed by $P$ and $T$ alone;
- if $T>T_{sat}(P)$, the state is superheated vapor.

Equivalent comparisons can be made using $P$ and $P_{sat}(T)$.

Near or above the critical point, the simple liquid-vapor labels and dome-based decision rule require additional care. Use property data appropriate to the region.

### Saturated Liquid-Vapor Mixture

A saturated mixture contains both saturated liquid and saturated vapor in equilibrium.

The two-phase region begins at saturated liquid and ends at saturated vapor. Adding energy at fixed saturation pressure changes the vapor fraction while temperature remains at the corresponding saturation value.

### Quality

**Vapor quality** $x$ is the mass fraction of saturated vapor in a saturated liquid-vapor mixture.

- $x=0$ at saturated liquid;
- $0<x<1$ in a saturated mixture; and
- $x=1$ at saturated vapor.

Quality is not defined for compressed-liquid or superheated-vapor states.

### Liquid-Vapor Dome

On $T-v$ and $P-v$ diagrams:

- the left boundary is the saturated-liquid line;
- the right boundary is the saturated-vapor line;
- the region under the dome is the saturated mixture;
- compressed-liquid states lie to the left; and
- superheated-vapor states lie to the right.

A process path on a property diagram should appear only when the path is known or intentionally modeled.

## Governed Equations

<a id="M01-EQ-009"></a>
### Vapor Quality - `M01-EQ-009`

$$
x
=
\frac{m_g}{m_f+m_g}
=
\frac{m_g}{m_{total}}
$$

where:

- $m_g$ is saturated-vapor mass; and
- $m_f$ is saturated-liquid mass.

**Equation type:** definition  
**Applicable system:** saturated liquid-vapor mixture  
**Required assumptions:** only saturated liquid and saturated vapor are present in equilibrium  
**Units:** dimensionless  
**Physical interpretation:** quality is the vapor mass fraction, not a measure of how desirable or pure the substance is  
**Limits or constraints:** $0\le x\le1$; undefined outside the saturated liquid-vapor region

<a id="M01-EQ-010"></a>
### Saturated-Mixture Property Relation - `M01-EQ-010`

$$
y
=
y_f+x y_{fg}
=
y_f+x(y_g-y_f)
$$

where:

- $y$ may represent $v$, $u$, $h$, or $s$;
- $y_f$ is the saturated-liquid property;
- $y_g$ is the saturated-vapor property; and
- $y_{fg}=y_g-y_f$.

**Equation type:** mixture property relationship  
**Applicable system:** saturated liquid-vapor mixture  
**Required assumptions:** equilibrium saturated mixture with known quality  
**Units:** units of property $y$  
**Physical interpretation:** the mixture property is a mass-weighted value between saturated-liquid and saturated-vapor limits  
**Limits or constraints:** use only for $0\le x\le1$ in the two-phase region

<a id="M01-EQ-011"></a>
### Specific Enthalpy - `M01-EQ-011`

$$
h=u+Pv
$$

where:

- $h$ is specific enthalpy;
- $u$ is specific internal energy;
- $P$ is pressure; and
- $v$ is specific volume.

**Equation type:** property definition  
**Applicable system:** simple compressible substance  
**Required assumptions:** consistent units for $Pv$ and $u$  
**Units:** energy per mass  
**Physical interpretation:** enthalpy combines internal energy with the pressure-volume term useful for flowing-fluid analysis  
**Limits or constraints:** use absolute pressure; apply unit conversions so $Pv$ has energy-per-mass units

## Interactive Diagram Specifications

![A liquid-vapor dome with selectable phase regions and quality position](assets/svg/foundations/liquid-vapor-dome-state-classifier.svg)

- **Asset:** `assets/svg/foundations/liquid-vapor-dome-state-classifier.svg`
- **Viewport:** responsive `viewBox`; default aspect ratio approximately `4:3`
- **Primary elements:** $T-v$ and $P-v$ toggle, saturation dome, critical point, phase regions, movable state marker, quality scale under the dome
- **Required labels:** `compressed liquid`, `saturated liquid`, `saturated mixture`, `saturated vapor`, `superheated vapor`, `critical point`, $x=0$, $x=1$
- **Interaction:** selecting a region or moving a state marker reveals phase, whether quality is defined, and the appropriate table family
- **Accessible title:** `Pure-substance liquid-vapor phase classifier`
- **Accessible description:** `A saturation dome separates compressed-liquid, two-phase, and superheated-vapor regions. A movable state marker reports phase and vapor quality availability.`
- **Keyboard behavior:** state position can be changed with labeled region buttons and step controls
- **Non-color cues:** region labels, boundary line patterns, and marker shapes distinguish phases
- **Mobile behavior:** axis labels and controls remain outside the plotting area at 360 CSS pixels
- **Text fallback:** compressed liquid lies left of the dome, saturated mixture lies under it, and superheated vapor lies right of it; quality is defined only under the dome including endpoints

## Interpret the Diagram

Moving the state marker across the dome changes the property model.

- At the saturated-liquid boundary, $x=0$.
- Inside the dome, one saturation property and quality can fix the state.
- At the saturated-vapor boundary, $x=1$.
- Outside the dome, quality is undefined.

The marker cannot use $P$ and $T$ as two independent coordinates inside the dome because those values are linked by saturation.

## Engineering Application

A steam line upstream of a throttling valve may contain a saturated mixture. If downstream pressure and temperature identify a superheated state, the outlet enthalpy comes from superheated data. The throttling energy balance can then provide the inlet enthalpy, which is used with saturated properties to determine inlet quality.

See [[worked-throttling-valve-state-model]].

## Common Misconceptions

### Quality Describes Every Vapor State

- **Plausible incorrect idea:** A superheated vapor can have $x>1$.
- **Why it fails:** Quality is defined only for a saturated liquid-vapor mixture and its endpoints.
- **Correct reasoning:** Use superheated properties outside the dome; do not extrapolate quality.

### Saturated Means Fully Vapor

- **Plausible incorrect idea:** The word saturated always means saturated vapor.
- **Why it fails:** Saturated liquid, saturated mixture, and saturated vapor are distinct states.
- **Correct reasoning:** Identify the specific saturation condition or quality.

### $P$ and $T$ Always Fix the State

- **Plausible incorrect idea:** A saturated mixture is fixed because both pressure and temperature are known.
- **Why it fails:** Saturation pressure and temperature are dependent.
- **Correct reasoning:** Add quality or another independent property such as $v$, $u$, $h$, or $s$.

### The Dome Shows a Process Automatically

- **Plausible incorrect idea:** Connecting two state markers with a line always represents the actual path.
- **Why it fails:** Endpoint states do not determine a path.
- **Correct reasoning:** Plot a process path only when it is known or modeled.

## Check Your Understanding

### 1. Phase From $P$ and $T$

At a specified pressure, water has $T_{sat}=180^\circ\text{C}$. A state at the same pressure has $T=240^\circ\text{C}$. What is the phase?

- A. Compressed liquid
- B. Saturated liquid
- C. Saturated mixture
- D. Superheated vapor

<!--
item_id: m01-t05-cy01
item_type: single_select
correct_response: D
principle: "At a fixed subcritical pressure, temperature above the saturation temperature indicates superheated vapor."
feedback:
  incorrect: "Compare the actual temperature directly with the saturation temperature at the same pressure."
-->

### 2. Quality Domain

For which states is vapor quality defined? Select all that apply.

- A. Saturated liquid
- B. Saturated mixture
- C. Saturated vapor
- D. Compressed liquid
- E. Superheated vapor

<!--
item_id: m01-t05-cy02
item_type: multi_select
correct_response:
  - A
  - B
  - C
principle: "Quality spans the saturated liquid-vapor region from x=0 to x=1 and is undefined outside it."
feedback:
  incorrect: "Restrict quality to the saturation dome and its two boundaries."
-->

### 3. Mixture Property

At a saturated mixture state, $h_f=500\ \text{kJ/kg}$, $h_{fg}=2000\ \text{kJ/kg}$, and $x=0.25$. Enter $h$.

- $h=\underline{\hspace{2.2cm}}\ \text{kJ/kg}$

<!--
item_id: m01-t05-cy03
item_type: numeric
response_fields:
  - id: m01-t05-cy03-h
    label: saturated-mixture specific enthalpy
    correct_response: 1000
    tolerance_absolute: 0.5
    units: kJ/kg
principle: "Use h=h_f+x h_fg for a saturated mixture."
feedback:
  m01-t05-cy03-h: "Multiply the latent-property difference by quality, then add the saturated-liquid value."
-->

### 4. State Fixing at Saturation

Water is at $T=T_{sat}(P)$, and no other property is known. Which statement is correct?

- A. The state is definitely saturated liquid.
- B. The state is definitely saturated vapor.
- C. The state is saturated but not fully fixed.
- D. The state is superheated.

<!--
item_id: m01-t05-cy04
item_type: single_select
correct_response: C
principle: "The saturation pressure-temperature pair identifies saturation but not the mixture position or endpoint."
feedback:
  incorrect: "Add an independent property such as quality, specific volume, internal energy, enthalpy, or entropy."
-->

### 5. Notes for Discussion - Not Automatically Evaluated

Explain why a mixture of liquid water and water vapor can be a pure substance even though two phases are present.

## Problem-Solving Connection

- Worked example: [[worked-phase-identification-and-quality]]
- Guided practice: [[guided-vapor-dome-state-classification]]
- Independent practice: [[independent-phase-and-quality-audit]]

## Concept Cross-References

- **Prerequisite:** [[properties-states-and-equilibrium]]
- **Next:** [[property-model-and-table-selection]]
- **Apply:** [[worked-throttling-valve-state-model]]
- **Extend:** [[entropy-and-entropy-generation]]
- **Prepare for cycles:** [[rankine-cycle-performance]]

## Key Takeaways

- A pure substance can contain multiple phases while retaining fixed chemical composition.
- Saturation pressure and temperature are dependent.
- Quality is the vapor mass fraction and is defined only in the saturated liquid-vapor region.
- Mixture properties lie between saturated-liquid and saturated-vapor values.
- Phase classification precedes table selection and interpolation.

## Sources and Attribution

- `SRC-MCET530-EXAM1-2024` - pure-substance phases, saturation, quality, dome interpretation, and enthalpy; rewritten and technically refined.
- `SRC-MCET530-W1-NOTES` - throttling state and quality example used only as application context; values not reproduced as a new worked problem.

See `validation/source-manifest.md` for rights status.
