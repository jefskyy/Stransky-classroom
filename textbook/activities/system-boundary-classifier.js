(function () {
  "use strict";

  const ACTIVITY_NAME = "system-boundary-classifier";

  const boundaryModels = {
    "piston-gas": {
      label: "Piston-cylinder: gas boundary",
      scenario: "The system is the gas only. Heat crosses the cylinder wall and moving-boundary work crosses at the piston. No mass crosses.",
      mass: false,
      heat: true,
      work: true,
      classification: "closed",
      explanation: "A closed system has no mass crossing, although heat and work may cross its boundary."
    },
    "piston-assembly": {
      label: "Piston-cylinder: full insulated assembly",
      scenario: "The system includes the gas, cylinder, piston, insulation, and raised weight. The shown heat and work transfers occur inside this larger boundary.",
      mass: false,
      heat: false,
      work: false,
      classification: "isolated",
      explanation: "For the stated model, neither mass nor energy crosses the selected outer boundary."
    },
    "turbine-control-volume": {
      label: "Turbine: flowing-fluid control volume",
      scenario: "The control surface encloses the turbine. Mass enters and leaves, shaft work exits, and heat transfer is neglected under the adiabatic assumption.",
      mass: true,
      heat: false,
      work: true,
      classification: "open",
      explanation: "Any system with mass crossing its control surface is open."
    },
    "turbine-rotor": {
      label: "Turbine: rotor and shaft boundary",
      scenario: "The selected system is the solid rotor and shaft. Fluid passes around the rotor rather than through this material boundary. Shaft work crosses the boundary.",
      mass: false,
      heat: false,
      work: true,
      classification: "closed",
      explanation: "No mass crosses the solid-system boundary, so the rotor is a closed system even though work crosses."
    },
    "tank-stored": {
      label: "Insulated rigid tank: sealed stored contents",
      scenario: "The inlet valve is closed. The tank is rigid and insulated, so mass, heat, and boundary work do not cross the selected boundary.",
      mass: false,
      heat: false,
      work: false,
      classification: "isolated",
      explanation: "The sealed, insulated, rigid tank is isolated under the stated assumptions."
    },
    "tank-filling": {
      label: "Insulated rigid tank: filling control volume",
      scenario: "The inlet valve is open during filling. Mass enters the control volume. The insulation blocks heat transfer and the rigid wall prevents moving-boundary work.",
      mass: true,
      heat: false,
      work: false,
      classification: "open",
      explanation: "Mass crossing makes this an open system, even though heat and work do not cross."
    }
  };

  let instanceCount = 0;

  function classifyFromChoices(mass, heat, work) {
    if (mass) return "open";
    if (!heat && !work) return "isolated";
    return "closed";
  }

  function namespaceSvgIds(svg, suffix) {
    const idMap = new Map();

    svg.querySelectorAll("[id]").forEach((element) => {
      const oldId = element.id;
      const newId = `${oldId}-${suffix}`;
      idMap.set(oldId, newId);
      element.id = newId;
    });

    const tokenAttributes = ["aria-labelledby", "aria-describedby"];
    tokenAttributes.forEach((attribute) => {
      svg.querySelectorAll(`[${attribute}]`).forEach((element) => {
        const updated = element
          .getAttribute(attribute)
          .split(/\s+/)
          .map((token) => idMap.get(token) || token)
          .join(" ");
        element.setAttribute(attribute, updated);
      });
    });

    const referenceAttributes = ["href", "xlink:href", "marker-start", "marker-mid", "marker-end", "fill", "stroke", "filter", "clip-path", "mask"];
    referenceAttributes.forEach((attribute) => {
      svg.querySelectorAll(`[${attribute}]`).forEach((element) => {
        let value = element.getAttribute(attribute);
        idMap.forEach((newId, oldId) => {
          value = value
            .replace(new RegExp(`url\\(#${oldId}\\)`, "g"), `url(#${newId})`)
            .replace(new RegExp(`^#${oldId}$`), `#${newId}`);
        });
        element.setAttribute(attribute, value);
      });
    });

    svg.querySelectorAll("style").forEach((styleElement) => {
      let cssText = styleElement.textContent;
      idMap.forEach((newId, oldId) => {
        cssText = cssText.replace(
          new RegExp(`url\\(#${oldId}\\)`, "g"),
          `url(#${newId})`
        );
      });
      styleElement.textContent = cssText;
    });
  }

  function applyResponsiveLayout(svg, host) {
    const piston = svg.querySelector('[data-device="piston"]');
    const turbine = svg.querySelector('[data-device="turbine"]');
    const tank = svg.querySelector('[data-device="tank"]');

    if (!piston || !turbine || !tank) return;

    const narrow = host.getBoundingClientRect().width < 600;

    if (narrow) {
      svg.setAttribute("viewBox", "0 0 400 1320");
      piston.setAttribute("transform", "translate(20 20)");
      turbine.setAttribute("transform", "translate(20 450)");
      tank.setAttribute("transform", "translate(20 880)");
    } else {
      svg.setAttribute("viewBox", "0 0 1200 480");
      piston.setAttribute("transform", "translate(20 20)");
      turbine.setAttribute("transform", "translate(420 20)");
      tank.setAttribute("transform", "translate(820 20)");
    }
  }

  function createInterface(instanceId) {
    const wrapper = document.createElement("div");
    wrapper.className = "sbc-activity-shell";
    wrapper.innerHTML = `
      <div class="sbc-svg-mount" aria-busy="true">
        <p class="sbc-loading">Loading interactive diagram...</p>
      </div>

      <section class="sbc-response-panel" aria-labelledby="${instanceId}-response-title">
        <h3 id="${instanceId}-response-title">Classify the selected boundary</h3>
        <p class="sbc-selection" data-sbc-selection>Select a solid or dashed boundary in the diagram.</p>
        <p class="sbc-scenario" data-sbc-scenario></p>

        <fieldset class="sbc-interaction-fieldset" disabled data-sbc-fieldset>
          <legend>Which interactions cross this boundary?</legend>
          <label><input type="checkbox" data-sbc-choice="mass"> Mass, <span aria-label="m dot">m&#775;</span></label>
          <label><input type="checkbox" data-sbc-choice="heat"> Heat, <span class="sbc-math-text">Q</span></label>
          <label><input type="checkbox" data-sbc-choice="work"> Work, <span class="sbc-math-text">W</span></label>
        </fieldset>

        <div class="sbc-actions">
          <button type="button" data-sbc-check disabled>Check classification</button>
          <button type="button" data-sbc-reset>Reset</button>
        </div>

        <div class="sbc-feedback" data-sbc-feedback role="status" aria-live="polite">
          Choose a boundary to begin.
        </div>
      </section>
    `;
    return wrapper;
  }

  async function init(host) {
    if (!host || host.dataset.activityInitialized === "true") return;

    host.dataset.activityInitialized = "true";
    instanceCount += 1;
    const instanceId = `sbc-${instanceCount}`;
    const svgSource = host.dataset.svgSrc || "assets/svg/foundations/system-boundary-classifier.svg";
    const interfaceRoot = createInterface(instanceId);
    const fallback = host.querySelector(".activity-fallback");

    if (fallback) {
      host.insertBefore(interfaceRoot, fallback);
    } else {
      host.appendChild(interfaceRoot);
    }

    const mount = interfaceRoot.querySelector(".sbc-svg-mount");
    const selectionText = interfaceRoot.querySelector("[data-sbc-selection]");
    const scenarioText = interfaceRoot.querySelector("[data-sbc-scenario]");
    const fieldset = interfaceRoot.querySelector("[data-sbc-fieldset]");
    const checkButton = interfaceRoot.querySelector("[data-sbc-check]");
    const resetButton = interfaceRoot.querySelector("[data-sbc-reset]");
    const feedback = interfaceRoot.querySelector("[data-sbc-feedback]");
    const choices = {
      mass: interfaceRoot.querySelector('[data-sbc-choice="mass"]'),
      heat: interfaceRoot.querySelector('[data-sbc-choice="heat"]'),
      work: interfaceRoot.querySelector('[data-sbc-choice="work"]')
    };

    let selectedBoundaryId = null;
    let svg = null;

    function clearChoiceInputs() {
      Object.values(choices).forEach((input) => {
        input.checked = false;
      });
    }

    function selectBoundary(boundaryElement) {
      selectedBoundaryId = boundaryElement.dataset.boundaryId;
      const model = boundaryModels[selectedBoundaryId];
      if (!model) return;

      svg.querySelectorAll(".sbc-boundary-option").forEach((element) => {
        const selected = element === boundaryElement;
        element.classList.toggle("is-selected", selected);
        element.setAttribute("aria-pressed", selected ? "true" : "false");
      });

      clearChoiceInputs();
      fieldset.disabled = false;
      checkButton.disabled = false;
      selectionText.textContent = model.label;
      scenarioText.textContent = model.scenario;
      feedback.className = "sbc-feedback";
      feedback.textContent = "Select every interaction that crosses the chosen boundary, then check your classification.";
    }

    function resetActivity() {
      selectedBoundaryId = null;
      clearChoiceInputs();
      fieldset.disabled = true;
      checkButton.disabled = true;
      selectionText.textContent = "Select a solid or dashed boundary in the diagram.";
      scenarioText.textContent = "";
      feedback.className = "sbc-feedback";
      feedback.textContent = "Choose a boundary to begin.";

      if (svg) {
        svg.querySelectorAll(".sbc-boundary-option").forEach((element) => {
          element.classList.remove("is-selected");
          element.setAttribute("aria-pressed", "false");
        });
      }
    }

    function checkResponse() {
      if (!selectedBoundaryId) return;
      const model = boundaryModels[selectedBoundaryId];
      const response = {
        mass: choices.mass.checked,
        heat: choices.heat.checked,
        work: choices.work.checked
      };

      const incorrectInteractions = ["mass", "heat", "work"].filter(
        (interaction) => response[interaction] !== model[interaction]
      );

      const inferredClassification = classifyFromChoices(response.mass, response.heat, response.work);

      if (incorrectInteractions.length === 0) {
        feedback.className = "sbc-feedback is-correct";
        feedback.innerHTML = `<strong>Correct: ${model.classification} system.</strong> ${model.explanation}`;

        host.dispatchEvent(
          new CustomEvent("textbook-activity-complete", {
            bubbles: true,
            detail: {
              activity: ACTIVITY_NAME,
              boundaryId: selectedBoundaryId,
              classification: model.classification
            }
          })
        );
      } else {
        feedback.className = "sbc-feedback is-incorrect";
        feedback.innerHTML = `<strong>Your selections imply a ${inferredClassification} system, but at least one crossing is incorrect.</strong> Reconsider: ${incorrectInteractions.join(", ")}. Use the selected boundary, arrow directions, and stated assumptions.`;
      }
    }

    try {
      const response = await fetch(svgSource);
      if (!response.ok) {
        throw new Error(`Could not load SVG (${response.status}).`);
      }

      const svgText = await response.text();
      const parser = new DOMParser();
      const parsed = parser.parseFromString(svgText, "image/svg+xml");
      const parseError = parsed.querySelector("parsererror");
      if (parseError) {
        throw new Error("The SVG file is not valid XML.");
      }

      svg = document.importNode(parsed.documentElement, true);
      namespaceSvgIds(svg, instanceId);
      svg.classList.add("sbc-inline-svg");
      svg.setAttribute("focusable", "false");

      mount.replaceChildren(svg);
      mount.setAttribute("aria-busy", "false");

      svg.querySelectorAll(".sbc-boundary-option").forEach((boundaryElement) => {
        boundaryElement.addEventListener("click", () => selectBoundary(boundaryElement));
        boundaryElement.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            selectBoundary(boundaryElement);
          }
        });
      });

      applyResponsiveLayout(svg, host);
      if ("ResizeObserver" in window) {
        const resizeObserver = new ResizeObserver(() => applyResponsiveLayout(svg, host));
        resizeObserver.observe(host);
      } else {
        window.addEventListener("resize", () => applyResponsiveLayout(svg, host));
      }
    } catch (error) {
      mount.setAttribute("aria-busy", "false");
      mount.innerHTML = `<p class="sbc-error"><strong>Activity unavailable.</strong> ${error.message}</p>`;
      feedback.textContent = "Use the text fallback below while the interactive diagram is unavailable.";
      console.error(`[${ACTIVITY_NAME}]`, error);
    }

    checkButton.addEventListener("click", checkResponse);
    resetButton.addEventListener("click", resetActivity);
  }

  window.TextbookActivities = window.TextbookActivities || {};
  window.TextbookActivities[ACTIVITY_NAME] = { init };
})();
