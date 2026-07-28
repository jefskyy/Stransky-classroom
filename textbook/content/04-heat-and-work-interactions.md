# Heat, Work, and First-Law Energy Balances

## Learning Objectives

By the end of this topic, you will be able to:

- distinguish stored energy properties from heat, work, and energy transported by mass;
- select an appropriate First-Law balance for a closed system, control volume, or complete cycle; and
- apply the course sign and directional conventions without mixing energy amounts and rates.

## Why This Matters

Heat and work are often treated as labels attached to equipment. In thermodynamics, they have precise meanings tied to a selected boundary and process.

A technically sound analysis must distinguish:

- energy stored in the system;
- energy crossing as heat because of a temperature difference;
- energy crossing as work through another organized interaction;
- energy carried by mass flow; and
- an energy amount from an energy-transfer rate.

These distinctions determine the structure of the First-Law balance.

## Prerequisite Check

1. What makes a system closed or open?
2. Which quantities have values at a state?
3. What is the net change of a property over a complete cycle?

## Core Theoretical Concepts

### Energy Stored in a System

For the introductory thermodynamic model, total stored energy includes:

- internal energy $U$;
- kinetic energy $KE$; and
- potential energy $PE$.

Internal energy represents molecular-scale energy associated with the state of matter. Kinetic and potential energy depend on system motion and elevation relative to selected reference conditions.

These are properties. Their changes depend on endpoint states.

### Heat

**Heat** is energy transfer across a system boundary that occurs because of a temperature difference.

- Heat is defined during a process, not at a state.
- Heat is not a substance stored in the system.
- An adiabatic process has $Q=0$ over the modeled boundary and interval.
- A temperature difference may exist even when insulation makes heat transfer negligible.

### Work

**Work** is energy transfer across a system boundary by a mechanism other than heat or mass flow.

Common forms include:

- moving-boundary work;
- shaft work;
- electrical work; and
- spring work.

A rigid boundary removes moving-boundary work, but it does not automatically remove shaft or electrical work. Always identify the work mechanism.

### Energy Carried by Mass

When mass crosses a control surface, it carries energy. For a flowing stream, the combination of internal energy and flow work is represented by enthalpy:

$$
h=u+Pv.
$$

The stream may also carry kinetic and potential energy.

### Amounts and Rates

An overdot denotes a rate:

- $Q$ is an amount of heat transfer, typically in kJ;
- $\dot Q$ is a heat-transfer rate, typically in kW;
- $W$ is an amount of work, typically in kJ; and
- $\dot W$ is power, typically in kW.

Do not place an energy amount and an energy rate in the same balance without integrating over time or dividing by a consistent interval.

### Course Sign and Direction Conventions

For the signed closed-system form used here:

- $Q>0$ for heat transferred into the system;
- $W>0$ for work done by the system on the surroundings.

For device and cycle diagrams, the textbook generally uses positive magnitudes with directional subscripts, such as $Q_{in}$, $Q_{out}$, $W_{net,in}$, and $W_{net,out}$.

Both conventions are valid. Do not mix them in one equation. See [[thermodynamic-sign-conventions]].

### First-Law Modeling Logic

Use the selected system to choose the balance:

- **closed system:** no energy is transported by mass across the boundary;
- **control volume:** include energy transported by inlet and outlet mass flows;
- **complete cycle:** stored property changes vanish over the cycle;
- **steady control volume:** accumulation terms vanish, but inlet and outlet flows need not vanish.

## Governed Equations

<a id="M01-EQ-006"></a>
### Total Stored Energy - `M01-EQ-006`

$$
E=U+KE+PE
$$

with

$$
KE=\frac{mV_{sys}^{2}}{2},
\qquad
PE=mgz.
$$

where:

- $V_{sys}$ is the translational speed of the selected system relative to a reference frame; and
- $z$ is elevation relative to a selected datum.

**Equation type:** property definition  
**Applicable system:** macroscopic system under the introductory energy model  
**Required assumptions:** other energy modes are absent or included within $U$  
**Units:** energy  
**Physical interpretation:** total stored energy is partitioned into internal, kinetic, and potential contributions  
**Limits or constraints:** reference choices affect absolute $KE$ and $PE$ values, while consistent differences remain meaningful

<a id="M01-EQ-005"></a>
### Closed-System Energy Balance - `M01-EQ-005`

$$ Q-W = \Delta U+\Delta KE+\Delta PE $$

where:

- $Q$ is net heat transferred into the closed system;
- $W$ is net work done by the closed system; and
- the right-hand side is the change in stored total energy.

**Equation type:** conservation law  
**Applicable system:** closed system over a process  
**Required assumptions:** no mass crosses the boundary; signed convention is $Q$ into positive and $W$ out positive  
**Units:** every term is energy  
**Physical interpretation:** net energy transferred into storage equals the increase in stored energy  
**Limits or constraints:** include every relevant work mode; neglect $\Delta KE$ or $\Delta PE$ only when justified

<a id="M01-EQ-007"></a>
### Control-Volume Energy-Rate Balance - `M01-EQ-007`

$$ \frac{dE_{cv}}{dt} = \dot Q - \dot W_s + \sum_{in}\dot m \left(  h+\frac{V_{flow}^{2}}{2}+gz \right) - \sum_{out}\dot m \left(h+\frac{V_{flow}^{2}}{2}+gz \right) $$

where:

- $E_{cv}$ is energy stored in the control volume;
- $\dot Q$ is net heat-transfer rate into the control volume;
- $\dot W_s$ is net shaft or other non-flow power out of the control volume;
- $V_{flow}$ is average flow speed at an inlet or outlet; and
- $h+V_{flow}^{2}/2+gz$ is energy carried per unit mass.

**Equation type:** conservation law  
**Applicable system:** control volume  
**Required assumptions:** one-dimensional uniform properties at each identified inlet and outlet; sign convention as stated  
**Units:** power or energy per time  
**Physical interpretation:** accumulation equals net heat and work transfer plus energy carried in minus energy carried out  
**Limits or constraints:** flow work is already contained in enthalpy; do not add it again as a separate term

<a id="M01-EQ-008"></a>
### Complete-Cycle Heat-Work Balance - `M01-EQ-008`

$$
Q_{net}=W_{net}
$$

for a complete cycle under a consistent signed convention.

Equivalent positive-magnitude forms depend on device purpose. For a heat engine:

$$
Q_H=W_{net,out}+Q_L.
$$

For a refrigerator or heat pump:

$$
Q_H=Q_L+W_{net,in}.
$$

**Equation type:** conservation law specialized to a complete cycle  
**Applicable system:** a system or cyclic device returning to its initial state  
**Required assumptions:** complete-cycle property changes are zero; all heat and work interactions are included  
**Units:** energy per cycle or consistent rate form  
**Physical interpretation:** net heat and net work are equal because stored energy returns to its initial value  
**Limits or constraints:** this relation does not establish whether the cycle is possible under the Second Law

## Interactive Diagram Specifications

![A selectable boundary showing heat, work, mass flow, and stored energy](assets/svg/foundations/boundary-energy-interaction-builder.svg)

- **Asset:** `assets/svg/foundations/boundary-energy-interaction-builder.svg`
- **Viewport:** responsive `viewBox`; default aspect ratio approximately `16:10`
- **Primary elements:** closed-system boundary, control-volume boundary, heat arrow, shaft-work arrow, moving-boundary work, inlet and outlet streams, stored energy panel
- **Required labels:** $Q$, $W$, $\dot Q$, $\dot W_s$, $\dot m$, $U$, $KE$, $PE$, $h$
- **Interaction:** selecting a system type enables valid boundary interactions and displays the matching First-Law form
- **Accessible title:** `Heat, work, mass flow, and stored energy interactions`
- **Accessible description:** `A system boundary can be switched between closed-system and control-volume modes. Heat, work, and mass-flow arrows are added to build the corresponding energy balance.`
- **Keyboard behavior:** controls use labeled checkboxes and buttons; no drag-only interactions
- **Non-color cues:** unique arrow patterns and text labels distinguish heat, work, and mass
- **Mobile behavior:** interaction controls move below the diagram below 600 CSS pixels
- **Text fallback:** closed systems exclude mass transport; control volumes include enthalpy, kinetic energy, and potential energy carried by mass

## Interpret the Diagram

The arrows are transfers. The energy panel inside the boundary contains properties.

When the boundary switches to control-volume mode, inlet and outlet mass arrows appear. Enthalpy represents internal energy plus flow work carried by the stream. The diagram must not display a separate flow-work term in addition to enthalpy.

When cycle mode is selected, the stored-energy change returns to zero after one complete cycle, but heat and work arrows can remain nonzero.

## Engineering Application

A throttling valve is commonly modeled as a steady control volume with one inlet and one outlet, no shaft work, negligible heat transfer, and negligible kinetic and potential energy changes. These choices reduce the energy balance to $h_1=h_2$. The reduced equation is not a definition of every valve; it is a consequence of the selected assumptions.

See [[worked-throttling-valve-state-model]].

## Common Misconceptions

### Heat Is a Stored Property

- **Plausible incorrect idea:** A hot tank contains a certain amount of heat.
- **Why it fails:** Heat is defined only as energy crossing a boundary because of temperature difference.
- **Correct reasoning:** The tank contains internal energy; heat may enter or leave during a process.

### Rigid Means No Work of Any Kind

- **Plausible incorrect idea:** A rigid tank always has $W=0$.
- **Why it fails:** Rigidity removes moving-boundary work but not shaft, electrical, or other work modes.
- **Correct reasoning:** Identify each work mechanism separately.

### Steady Means No Energy Transfer

- **Plausible incorrect idea:** A steady turbine has $\dot Q=\dot W=0$ because nothing changes with time.
- **Why it fails:** Steady operation removes accumulation, not through-flow or boundary transfers.
- **Correct reasoning:** Set $dE_{cv}/dt=0$ while retaining all inlet, outlet, heat, and work terms supported by the model.

### The First Law Proves Feasibility

- **Plausible incorrect idea:** A cyclic device is physically possible whenever $Q_{net}=W_{net}$.
- **Why it fails:** Conservation is necessary but does not determine spontaneous direction or reversible limits.
- **Correct reasoning:** Apply [[purpose-second-law-energy-quality]] after the First-Law check.

## Check Your Understanding

### 1. Stored or Transferred

Which quantities are energy transfers across a boundary? Select all that apply.

- A. Heat $Q$
- B. Work $W$
- C. Internal energy $U$
- D. Kinetic energy $KE$
- E. Energy carried by entering mass

<!--
item_id: m01-t04-cy01
item_type: multi_select
correct_response:
  - A
  - B
  - E
principle: "Heat and work cross directly as interactions, and mass flow transports energy; internal, kinetic, and potential energy are stored properties of the selected system."
feedback:
  incorrect: "Separate what exists as a state property inside the system from what crosses the boundary during the process."
-->

### 2. Closed-System Balance

A closed system receives $80\ \text{kJ}$ of heat and does $25\ \text{kJ}$ of work. Changes in kinetic and potential energy are negligible. Enter $\Delta U$.

- $\Delta U=\underline{\hspace{2.2cm}}\ \text{kJ}$

<!--
item_id: m01-t04-cy02
item_type: numeric
response_fields:
  - id: m01-t04-cy02-delta-u
    label: change in internal energy
    correct_response: 55
    tolerance_absolute: 0.1
    units: kJ
principle: "With the course signed convention, Q-W=Delta U when kinetic and potential energy changes are negligible."
feedback:
  m01-t04-cy02-delta-u: "Use heat into as positive and work done by the system as positive: 80-25."
-->

### 3. Amount or Rate

Which equation is dimensionally consistent?

- A. $Q-\dot W=\Delta U$
- B. $\dot Q-\dot W=\dot m\Delta h$
- C. $Q-W=\dot m\Delta h$
- D. $\dot Q-W=\Delta U$

<!--
item_id: m01-t04-cy03
item_type: single_select
correct_response: B
principle: "Every term in a rate balance must have units of energy per time."
feedback:
  incorrect: "Use overdots and mass-flow rates consistently in a rate equation."
-->

### 4. Complete Cycle

A cyclic heat engine receives $500\ \text{kJ}$ and rejects $320\ \text{kJ}$ per cycle. Enter its net work output.

- $W_{net,out}=\underline{\hspace{2.2cm}}\ \text{kJ/cycle}$

<!--
item_id: m01-t04-cy04
item_type: numeric
response_fields:
  - id: m01-t04-cy04-w-net
    label: net work output per cycle
    correct_response: 180
    tolerance_absolute: 0.1
    units: kJ/cycle
principle: "For a complete heat-engine cycle, Q_H=W_net_out+Q_L."
feedback:
  m01-t04-cy04-w-net: "Subtract rejected heat from received heat after using the zero complete-cycle energy change."
-->

### 5. Steady Control Volume

Which term is set to zero solely by a steady-state assumption?

- A. $\dot Q$
- B. $\dot W_s$
- C. $dE_{cv}/dt$
- D. Every inlet and outlet mass-flow rate

<!--
item_id: m01-t04-cy05
item_type: single_select
correct_response: C
principle: "Steady state means no time accumulation within the control volume; it does not eliminate transfers or flow rates."
feedback:
  incorrect: "Translate steady state into the derivative of stored quantities, not into zero boundary interactions."
-->

### 6. Notes for Discussion - Not Automatically Evaluated

Explain why the same physical heat exchanger can have a nonzero heat-transfer term for a one-stream control volume but approximately zero external heat transfer for a control volume containing both streams.

## Problem-Solving Connection

- Worked example: [[worked-throttling-valve-state-model]]
- Guided practice: [[guided-first-law-equation-selection]]
- Independent practice: [[independent-boundary-energy-audit]]

## Concept Cross-References

- **Prerequisite:** [[system-boundary-and-surroundings]]
- **Prerequisite:** [[thermodynamic-processes-and-cycles]]
- **Next:** [[pure-substances-phases-and-property-diagrams]]
- **Reference:** [[thermodynamic-sign-conventions]]
- **Prepare for MLO2:** [[purpose-second-law-energy-quality]]
- **Apply in MLO2:** [[heat-engines-thermal-efficiency]]

## Key Takeaways

- Stored energy is a property; heat and work are process-dependent transfers.
- Mass flow transports enthalpy, kinetic energy, and potential energy across a control surface.
- Closed-system and control-volume balances have different structures.
- Steady state removes accumulation, not heat, work, or mass flow.
- Complete-cycle property changes are zero, so net heat equals net work.
- First-Law satisfaction does not establish Second-Law feasibility.

## Sources and Attribution

- `SRC-MCET530-W1-NOTES` - closed- and open-system balances, control-volume terms, and throttling context; rewritten and technically refined.
- `SRC-MCET530-EXAM1-2024` - heat, work, energy forms, signs, cycle balance, and problem-solving sequence; rewritten.

See `validation/source-manifest.md` for rights status.
