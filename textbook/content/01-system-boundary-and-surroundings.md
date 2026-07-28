# System Boundary and Surroundings

## Learning Objectives

By the end of this topic, you will be able to:

- distinguish the system, surroundings, boundary, and control surface in an engineering scenario;
- classify a selected system as open, closed, or isolated from mass and energy interactions; and
- explain how changing the selected boundary can change the appropriate model without changing the physical hardware.

## Why This Matters

The first modeling decision in thermodynamics is not which equation to use. It is **what to analyze**.

The selected system determines:

- whether mass crosses the boundary;
- whether energy crosses as heat, work, or energy carried by mass;
- whether stored energy can accumulate;
- which conservation equation applies; and
- which interactions are internal versus external to the model.

A correct calculation around the wrong boundary is not a correct analysis.

## Prerequisite Check

1. What is the difference between an amount of energy and a rate of energy transfer?
2. What information can a schematic communicate that a list of numbers cannot?
3. Why must every term in a conservation equation have compatible units?

## Core Theoretical Concepts

### System, Surroundings, and Boundary

A **thermodynamic system** is a quantity of matter or a region in space selected for analysis.

The **surroundings** are everything outside the selected system.

The **boundary** separates the system from its surroundings. It may be:

- real or imaginary;
- fixed or moving;
- rigid or deforming; and
- stationary or moving with respect to an observer.

For an open system, the boundary is often called a **control surface**.

The boundary is a modeling choice. A turbine casing, the fluid inside the turbine, the entire power plant, or one stream in a heat exchanger can each be selected as a system for a different question.

### Closed System or Control Mass

A **closed system** contains a fixed amount of mass.

- No mass crosses the boundary.
- Heat or work may cross the boundary.
- The boundary may move, so the system volume may change.

A piston-cylinder containing a sealed gas is a closed system even while the piston moves.

### Open System or Control Volume

An **open system** is a region through which mass may flow.

- Mass can cross the control surface at inlets and outlets.
- Heat and work can also cross the control surface.
- Energy carried with entering and leaving mass must be included.

Turbines, compressors, pumps, nozzles, diffusers, throttling valves, heat exchangers, and pipe sections are commonly modeled as control volumes.

### Isolated System

An **isolated system** exchanges neither mass nor energy with its surroundings over the interval of interest.

Therefore:

- no mass crosses;
- no heat crosses; and
- no work crosses.

Perfect isolation is an idealization. The model is useful when all interactions are negligible relative to the required accuracy and time scale.

### Classification Depends on the Boundary

The same physical equipment may support more than one valid boundary.

For a shell-and-tube heat exchanger:

- one fluid stream alone is an open system that receives or rejects heat across its selected boundary;
- both streams together inside an insulated outer shell form a larger open system for which heat exchanged between streams is internal; and
- the complete device plus a finite amount of contained fluid could be modeled transiently if start-up behavior is important.

A boundary is judged by whether it supports the question being asked, not by whether it matches the equipment outline.

### on Inventory

After drawing the boundary, identify every crossing:

| Crossing | Closed system | Open system | Isolated system |
|---|---:|---:|---:|
| Mass | No | Possible | No |
| Heat | Possible | Possible | No |
| Work | Possible | Possible | No |
| Energy carried by mass | No | Possible | No |

Do not classify a system from the device name alone. Classify the **selected boundary** from its interactions.

## Governed Equations

<a id="M01-EQ-001"></a>
### General Control-Volume Mass Balance - `M01-EQ-001`

$$ \frac{dm_{cv}}{dt} = \sum \dot m_{in} - \sum \dot {m}_{out} $$

where:

- $m_{cv}$ is mass stored inside the control volume;
- $\dot m_{in}$ is an inlet mass-flow rate; and
- $\dot m_{out}$ is an outlet mass-flow rate.

**Equation type:** conservation law  
**Applicable system:** any control volume  
**Required assumptions:** the selected boundary and all mass crossings are identified; no steady-state assumption is required  
**Units:** each term has units of mass per time  
**Physical interpretation:** accumulation equals mass entering minus mass leaving  
**Limits or constraints:** for a closed system, no mass crosses the boundary; for steady operation, $dm_{cv}/dt=0$

## Interactive Diagram Specifications

<div
  class="textbook-activity"
  data-activity="system-boundary-classifier"
>
  <details class="activity-fallback">
    <summary>Text alternative</summary>

    <p>
      A closed system has no mass crossing its boundary, although heat or
      work may cross.
    </p>

    <p>
      An open system permits mass to cross a control surface.
    </p>

    <p>
      An isolated system permits neither mass nor energy to cross.
    </p>
  </details>
</div>

## Interpret the Diagram

The hardware does not determine the system type by itself. The boundary and crossing arrows do.

- A sealed piston-cylinder is closed even when its volume changes.
- A turbine is open when fluid enters and leaves the selected control volume.
- A sealed, insulated, rigid tank is modeled as isolated only when all mass and energy interactions are negligible.

When a larger boundary is drawn around two interacting subsystems, an interaction that previously crossed a boundary may become internal to the new system.

## Engineering Application

A condenser contains a hot refrigerant stream and a colder water stream. Selecting one stream as the control volume produces a heat-transfer term across that stream boundary. Selecting both streams together can eliminate that internal heat-transfer term from the overall balance when heat loss to the external surroundings is negligible.

See [[condenser-control-volume-selection]].

## Common Misconceptions

### A Closed System Must Have a Rigid Boundary

- **Plausible incorrect idea:** If a piston moves, the system becomes open.
- **Why it fails:** System classification depends on mass crossing, not boundary motion.
- **Correct reasoning:** A sealed piston-cylinder remains a closed system while its volume changes.

### Insulated Means Isolated

- **Plausible incorrect idea:** An insulated turbine is an isolated system.
- **Why it fails:** Insulation addresses heat transfer, but mass and work may still cross.
- **Correct reasoning:** An insulated turbine is typically an adiabatic open system, not an isolated system.

### The Equipment Casing Is Always the Correct Boundary

- **Plausible incorrect idea:** The system boundary must follow the physical outer surface of the device.
- **Why it fails:** A system is selected to answer a question and may include one stream, multiple components, or an imaginary region.
- **Correct reasoning:** Choose the boundary that exposes the relevant interactions and states.

## Check Your Understanding

### 1. Sealed Piston-Cylinder

A sealed piston-cylinder receives heat while the piston rises. No mass leaks. How should the gas be classified?

- A. Open system
- B. Closed system
- C. Isolated system
- D. Steady-flow system

<!--
item_id: m01-t01-cy01
item_type: single_select
correct_response: B
principle: "No mass crosses the selected boundary, so the gas is a closed system even though heat crosses and the boundary moves."
feedback:
  incorrect: "Classify the system from mass crossing first; boundary motion does not make a system open."
-->

### 2. Turbine Control Volume

Steam enters and exits a turbine while shaft work leaves the device. Which interactions cross the selected turbine control surface? Select all that apply.

- A. Mass
- B. Energy carried by mass
- C. Shaft work
- D. Stored pressure as a boundary transfer

<!--
item_id: m01-t01-cy02
item_type: multi_select
correct_response:
  - A
  - B
  - C
principle: "An open turbine control volume has mass flow, energy carried with mass, and shaft work crossing its boundary."
feedback:
  incorrect: "Pressure is a state property; account for flow energy through enthalpy rather than calling pressure a separate boundary transfer."
-->

### 3. Insulated Rigid Tank

A sealed rigid tank is perfectly insulated and has no electrical or mechanical work interaction. Which classification is appropriate over the stated interval?

- A. Open
- B. Closed but not isolated
- C. Isolated
- D. Steady-flow

<!--
item_id: m01-t01-cy03
item_type: single_select
correct_response: C
principle: "The stated boundary permits neither mass nor energy transfer, which defines an isolated system."
feedback:
  incorrect: "Inventory mass, heat, and work crossings rather than using only the words sealed or rigid."
-->

### 4. Boundary Choice

A heat exchanger has two fluid streams and negligible heat loss through its outer shell. Which boundary makes the heat exchanged between the streams internal to the selected system?

- A. A boundary around only the hot stream
- B. A boundary around only the cold stream
- C. A boundary around both streams inside the outer shell
- D. A boundary around the inlet pipe only

<!--
item_id: m01-t01-cy04
item_type: single_select
correct_response: C
principle: "An interaction between subsystems becomes internal when both subsystems are included inside one larger boundary."
feedback:
  incorrect: "Ask whether the heat-transfer path crosses the selected outer boundary or remains inside it."
-->

### 5. Notes for Discussion - Not Automatically Evaluated

Describe two different valid system boundaries for a household refrigerator and state which engineering question each boundary would support.

## Problem-Solving Connection

- Worked example: [[worked-system-boundary-selection]]
- Guided practice: [[guided-open-closed-isolated-classification]]
- Independent practice: [[independent-control-volume-selection]]

## Concept Cross-References

- **Next:** [[properties-states-and-equilibrium]]
- **Apply:** [[heat-and-work-interactions]]
- **Apply:** [[condenser-control-volume-selection]]
- **Prepare for MLO2:** [[thermal-energy-reservoirs]]
- **Reference:** [[thermodynamic-problem-solving-process]]

## Key Takeaways

- The system is selected before equations are chosen.
- Open, closed, and isolated classifications depend on boundary crossings.
- A boundary may be real or imaginary, fixed or moving.
- Changing the boundary can change which interactions are external or internal.
- Mass conservation for a control volume includes accumulation unless steady operation is justified.

## Sources and Attribution

- `SRC-MCET530-W1-NOTES` - open and closed system distinctions and control-volume context; rewritten and technically refined.
- `SRC-MCET530-EXAM1-2024` - system, surroundings, boundary, isolated-system, and problem-solving definitions; rewritten.

See `validation/source-manifest.md` for rights status.
