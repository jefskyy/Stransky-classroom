(function () {
  "use strict";

  const ACTIVITY_NAME = "boundary-energy-interaction-builder";
  let instanceCount = 0;

  const MODES = {
    closed: {
      label: "Closed system",
      description:
        "A closed system allows heat and work to cross the boundary, but no mass crosses it.",
      equationIntro:
        "Closed-system First Law",
      defaultEquation:
        "ΔU + ΔKE + ΔPE = Q − W",
      note:
        "Mass transport is excluded. Boundary work may occur if the boundary moves.",
      enabled: ["heat", "shaft", "boundary"],
      disabled: ["inlet", "outlet"],
      defaultActive: ["heat"],
      heatLabel: "Q",
      shaftLabel: "W",
      highlightH: false,
      sideNote1: "Closed systems exclude mass transport across the boundary.",
      sideNote2: "Use U, KE, and PE for stored energy changes inside the boundary."
    },

    cv: {
      label: "Control volume",
      description:
        "A control volume can exchange heat and shaft work and can also transport energy with inlet and outlet mass streams.",
      equationIntro:
        "Control-volume First Law",
      defaultEquation:
        "dE_cv/dt = Q̇ − Ẇ_s + Σṁ_in(h + KE + PE) − Σṁ_out(h + KE + PE)",
      note:
        "Moving-boundary work is typically not used for a fixed control volume. Flow energy is accounted for with enthalpy h.",
      enabled: ["heat", "shaft", "inlet", "outlet"],
      disabled: ["boundary"],
      defaultActive: ["heat", "inlet", "outlet"],
      heatLabel: "Q̇",
      shaftLabel: "Ẇs",
      highlightH: true,
      sideNote1: "Control volumes include mass flow across the control surface.",
      sideNote2: "Mass carries h, KE, and PE into and out of the control volume."
    }
  };

  const INTERACTIONS = {
    heat: {
      label: "Heat transfer",
      shortClosed: "Q",
      shortCV: "Q̇",
      groupId: "beib-heat-group"
    },
    shaft: {
      label: "Shaft work",
      shortClosed: "W_s",
      shortCV: "Ẇ_s",
      groupId: "beib-shaft-group"
    },
    boundary: {
      label: "Moving-boundary work",
      shortClosed: "W_b",
      shortCV: "W_b",
      groupId: "beib-boundary-work-group"
    },
    inlet: {
      label: "Inlet stream",
      shortClosed: "ṁ_in",
      shortCV: "ṁ_in(h+KE+PE)",
      groupId: "beib-inlet-group"
    },
    outlet: {
      label: "Outlet stream",
      shortClosed: "ṁ_out",
      shortCV: "ṁ_out(h+KE+PE)",
      groupId: "beib-outlet-group"
    }
  };

  function injectStyles() {
    if (document.getElementById("beib-inline-styles")) return;

    const style = document.createElement("style");
    style.id = "beib-inline-styles";
    style.textContent = `
      .beib-shell { display: grid; gap: 1rem; margin: 2rem 0; }
      .beib-svg-mount { overflow: hidden; border: 1px solid var(--border, #d0d7de); border-radius: 1rem; background: #fff; }
      .beib-inline-svg { display: block; width: 100%; height: auto; }
      .beib-loading, .beib-error { margin: 0; padding: 1rem; }
      .beib-error { border-left: 0.4rem solid #DA291C; background: rgba(218, 41, 28, 0.08); }
      .beib-panels { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(18rem, 0.9fr); gap: 1rem; }
      .beib-panel { padding: 1rem; border: 1px solid var(--border, #d0d7de); border-radius: 1rem; background: #fff; }
      .beib-panel h3 { margin-top: 0; margin-bottom: 0.5rem; }
      .beib-muted { color: #555; }
      .beib-mode-row { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 0.75rem; }
      .beib-mode-row label, .beib-check-grid label { display: inline-flex; align-items: center; gap: 0.45rem; }
      .beib-check-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.65rem 1rem; margin-top: 0.9rem; }
      .beib-check-grid input:disabled { opacity: 0.55; }
      .beib-mode-row input, .beib-check-grid input { width: 1.1rem; height: 1.1rem; }
      .beib-mode-row input:focus-visible, .beib-check-grid input:focus-visible { outline: 3px solid #F76902; outline-offset: 2px; }
      .beib-pill { display: inline-block; margin-top: 0.8rem; padding: 0.45rem 0.7rem; border-radius: 999px; font-weight: 700; }
      .beib-pill.closed { background: rgba(247, 105, 2, 0.12); color: #9a4300; }
      .beib-pill.cv { background: rgba(0, 156, 189, 0.12); color: #005d72; }
      .beib-equation { margin-top: 0.85rem; padding: 0.9rem 1rem; border-left: 0.4rem solid #009CBD; background: rgba(0, 156, 189, 0.06); }
      .beib-equation strong { display: block; margin-bottom: 0.35rem; }
      .beib-term-list { margin-top: 0.8rem; padding-left: 1.2rem; }
      .beib-term-list li { margin-bottom: 0.35rem; }
      .beib-feedback { margin-top: 0.85rem; padding: 0.85rem 1rem; border-left: 0.4rem solid #84BD00; background: rgba(132, 189, 0, 0.08); }
      @media (max-width: 760px) { .beib-panels { grid-template-columns: 1fr; } }
      @media (max-width: 600px) { .beib-check-grid { grid-template-columns: 1fr; } }
    `;
    document.head.appendChild(style);
  }

  function namespaceSvgIds(svg, suffix) {
    const idMap = new Map();

    svg.querySelectorAll("[id]").forEach((element) => {
      const oldId = element.id;
      const newId = `${oldId}-${suffix}`;
      idMap.set(oldId, newId);
      element.id = newId;
    });

    ["aria-labelledby", "aria-describedby"].forEach((attribute) => {
      svg.querySelectorAll(`[${attribute}]`).forEach((element) => {
        const existing = element.getAttribute(attribute);
        if (!existing) return;
        const updated = existing
          .split(/\s+/)
          .map((token) => idMap.get(token) || token)
          .join(" ");
        element.setAttribute(attribute, updated);
      });
    });

    ["href", "marker-start", "marker-mid", "marker-end", "fill", "stroke", "filter", "clip-path", "mask"].forEach((attribute) => {
      svg.querySelectorAll(`[${attribute}]`).forEach((element) => {
        let value = element.getAttribute(attribute);
        if (!value) return;
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
        cssText = cssText.replace(new RegExp(`url\\(#${oldId}\\)`, "g"), `url(#${newId})`);
      });
      styleElement.textContent = cssText;
    });
  }

  function createInterface(instanceId) {
    const wrapper = document.createElement("div");
    wrapper.className = "beib-shell";

    wrapper.innerHTML = `
      <div class="beib-svg-mount" aria-busy="true">
        <p class="beib-loading">Loading interactive diagram...</p>
      </div>

      <div class="beib-panels">
        <section class="beib-panel" aria-labelledby="${instanceId}-controls-title">
          <h3 id="${instanceId}-controls-title">Build the boundary interactions</h3>
          <p class="beib-muted">Choose the system type first. Then turn on the interactions that are valid for that boundary.</p>

          <div class="beib-mode-row" role="radiogroup" aria-label="System type">
            <label>
              <input type="radio" name="${instanceId}-mode" value="closed" checked />
              <span>Closed system</span>
            </label>
            <label>
              <input type="radio" name="${instanceId}-mode" value="cv" />
              <span>Control volume</span>
            </label>
          </div>

          <div class="beib-check-grid">
            <label><input type="checkbox" data-interaction="heat" /> <span>Heat transfer</span></label>
            <label><input type="checkbox" data-interaction="shaft" /> <span>Shaft work</span></label>
            <label><input type="checkbox" data-interaction="boundary" /> <span>Moving-boundary work</span></label>
            <label><input type="checkbox" data-interaction="inlet" /> <span>Inlet stream</span></label>
            <label><input type="checkbox" data-interaction="outlet" /> <span>Outlet stream</span></label>
          </div>

          <div class="beib-pill closed" data-beib-mode-pill>Closed system</div>

          <div class="beib-feedback" data-beib-mode-feedback role="status" aria-live="polite">
            A closed system allows heat and work to cross the boundary, but no mass crosses it.
          </div>
        </section>

        <section class="beib-panel" aria-labelledby="${instanceId}-equation-title">
          <h3 id="${instanceId}-equation-title">Matching First-Law form</h3>
          <div class="beib-equation">
            <strong data-beib-equation-intro>Closed-system First Law</strong>
            <div data-beib-equation-body>ΔU + ΔKE + ΔPE = Q − W</div>
          </div>

          <ul class="beib-term-list" data-beib-term-list></ul>

          <div class="beib-feedback" data-beib-note role="status" aria-live="polite">
            Mass transport is excluded. Boundary work may occur if the boundary moves.
          </div>
        </section>
      </div>
    `;
    return wrapper;
  }

  function buildEquation(modeKey, activeSet) {
    if (modeKey === "closed") {
      const left = ["ΔU", "ΔKE", "ΔPE"];
      const right = [];

      if (activeSet.has("heat")) right.push("Q");

      const workTerms = [];
      if (activeSet.has("shaft")) workTerms.push("W_s");
      if (activeSet.has("boundary")) workTerms.push("W_b");

      if (workTerms.length) right.push(`− (${workTerms.join(" + ")})`);
      if (!right.length) right.push("0");

      return `${left.join(" + ")} = ${right.join(" ")}`;
    }

    const terms = [];
    if (activeSet.has("heat")) terms.push("Q̇");
    if (activeSet.has("shaft")) terms.push("− Ẇ_s");
    if (activeSet.has("inlet")) terms.push("+ Σṁ_in(h + KE + PE)");
    if (activeSet.has("outlet")) terms.push("− Σṁ_out(h + KE + PE)");

    return `dE_cv/dt = ${terms.length ? terms.join(" ") : "0"}`;
  }

  function buildTermList(modeKey, activeSet) {
    const items = [];

    if (modeKey === "closed") {
      items.push("Stored energy inside the system is represented by U, KE, and PE.");
      if (activeSet.has("heat")) items.push("Q adds or removes energy as heat transfer across the system boundary.");
      if (activeSet.has("shaft")) items.push("W_s represents shaft or other organized work crossing the boundary.");
      if (activeSet.has("boundary")) items.push("W_b represents moving-boundary work such as piston work.");

      if (!activeSet.has("heat") && !activeSet.has("shaft") && !activeSet.has("boundary")) {
        items.push("With no active interactions selected, the sketch represents an isolated closed-system energy balance for the moment shown.");
      }
    } else {
      items.push("The control volume stores energy internally, but flow streams also carry energy across the control surface.");
      if (activeSet.has("heat")) items.push("Q̇ represents a heat-transfer rate into or out of the control volume.");
      if (activeSet.has("shaft")) items.push("Ẇ_s represents shaft-work rate for devices such as turbines or compressors.");
      if (activeSet.has("inlet")) items.push("Each inlet contributes enthalpy h, kinetic energy KE, and potential energy PE with the incoming mass flow.");
      if (activeSet.has("outlet")) items.push("Each outlet removes enthalpy h, kinetic energy KE, and potential energy PE with the outgoing mass flow.");

      if (!activeSet.has("heat") && !activeSet.has("shaft") && !activeSet.has("inlet") && !activeSet.has("outlet")) {
        items.push("With no active interactions selected, the rate-form balance collapses to dE_cv/dt = 0 for the displayed sketch.");
      }
    }

    return items;
  }

  async function init(host) {
    if (!host || host.dataset.activityInitialized === "true") return;
    host.dataset.activityInitialized = "true";
    injectStyles();

    instanceCount += 1;
    const instanceId = `beib-${instanceCount}`;
    const svgSource = host.dataset.svgSrc || "assets/boundary-energy-interaction-builder.svg";
    const interfaceRoot = createInterface(instanceId);
    const fallback = host.querySelector(".activity-fallback");

    if (fallback) host.insertBefore(interfaceRoot, fallback);
    else host.appendChild(interfaceRoot);

    const mount = interfaceRoot.querySelector(".beib-svg-mount");
    const modeInputs = Array.from(interfaceRoot.querySelectorAll(`input[name="${instanceId}-mode"]`));
    const interactionInputs = Array.from(interfaceRoot.querySelectorAll("[data-interaction]"));
    const modePill = interfaceRoot.querySelector("[data-beib-mode-pill]");
    const modeFeedback = interfaceRoot.querySelector("[data-beib-mode-feedback]");
    const equationIntro = interfaceRoot.querySelector("[data-beib-equation-intro]");
    const equationBody = interfaceRoot.querySelector("[data-beib-equation-body]");
    const termList = interfaceRoot.querySelector("[data-beib-term-list]");
    const note = interfaceRoot.querySelector("[data-beib-note]");

    let svg = null;
    let modeKey = "closed";
    const activeSet = new Set();

    function getSvgNode(prefix) {
      return svg?.querySelector(`[id^="${prefix}-"]`) || null;
    }

    function setGroupVisible(prefix, visible) {
      const group = getSvgNode(prefix);
      if (!group) return;
      group.classList.toggle("beib-arrow-hidden", !visible);
    }

    function setChipState(prefix, active) {
      const chipGroup = getSvgNode(prefix);
      if (!chipGroup) return;
      const rect = chipGroup.querySelector("rect");
      if (!rect) return;
      rect.setAttribute("class", active ? "beib-energy-chip active" : "beib-energy-chip inactive");
    }

    function applyModeToControls() {
      const mode = MODES[modeKey];

      interactionInputs.forEach((input) => {
        const key = input.dataset.interaction;
        const enabled = mode.enabled.includes(key);
        input.disabled = !enabled;

        if (!enabled) {
          input.checked = false;
          activeSet.delete(key);
        }
      });

      mode.defaultActive.forEach((key) => {
        const checkbox = interactionInputs.find((input) => input.dataset.interaction === key);
        if (checkbox && !checkbox.disabled) {
          checkbox.checked = true;
          activeSet.add(key);
        }
      });
    }

    function updateSvg() {
      if (!svg) return;

      const closedTag = getSvgNode("beib-closed-tag");
      const cvTag = getSvgNode("beib-cv-tag");
      const closedBoundary = getSvgNode("beib-boundary-closed");
      const cvBoundary = getSvgNode("beib-boundary-cv");
      const heatLabel = getSvgNode("beib-heat-label");
      const shaftLabel = getSvgNode("beib-shaft-label");
      const sideNote1 = getSvgNode("beib-side-note-1");
      const sideNote2 = getSvgNode("beib-side-note-2");
      const coreHighlight = getSvgNode("beib-highlight-core");

      if (modeKey === "closed") {
        if (closedTag) closedTag.setAttribute("opacity", "1");
        if (cvTag) cvTag.setAttribute("opacity", "0");
        if (closedBoundary) closedBoundary.setAttribute("opacity", "1");
        if (cvBoundary) cvBoundary.setAttribute("opacity", "0");
        if (coreHighlight) coreHighlight.setAttribute("class", activeSet.size ? "beib-highlight-ring visible" : "beib-highlight-ring");
      } else {
        if (closedTag) closedTag.setAttribute("opacity", "0");
        if (cvTag) cvTag.setAttribute("opacity", "1");
        if (closedBoundary) closedBoundary.setAttribute("opacity", "0");
        if (cvBoundary) cvBoundary.setAttribute("opacity", "1");
        if (coreHighlight) coreHighlight.setAttribute("class", activeSet.size ? "beib-highlight-ring visible" : "beib-highlight-ring");
      }

      if (heatLabel) heatLabel.textContent = MODES[modeKey].heatLabel;
      if (shaftLabel) shaftLabel.textContent = MODES[modeKey].shaftLabel;
      if (sideNote1) sideNote1.textContent = MODES[modeKey].sideNote1;
      if (sideNote2) sideNote2.textContent = MODES[modeKey].sideNote2;

      setGroupVisible("beib-heat-group", activeSet.has("heat"));
      setGroupVisible("beib-shaft-group", activeSet.has("shaft"));
      setGroupVisible("beib-boundary-work-group", activeSet.has("boundary"));
      setGroupVisible("beib-inlet-group", activeSet.has("inlet"));
      setGroupVisible("beib-outlet-group", activeSet.has("outlet"));

      setChipState("beib-chip-U", true);
      setChipState("beib-chip-KE", true);
      setChipState("beib-chip-PE", true);
      setChipState("beib-chip-h", MODES[modeKey].highlightH);
    }

    function updatePanels() {
      const mode = MODES[modeKey];
      modePill.textContent = mode.label;
      modePill.className = `beib-pill ${modeKey}`;
      modeFeedback.textContent = mode.description;
      equationIntro.textContent = mode.equationIntro;
      equationBody.textContent = buildEquation(modeKey, activeSet);
      note.textContent = mode.note;

      termList.innerHTML = buildTermList(modeKey, activeSet)
        .map((item) => `<li>${item}</li>`)
        .join("");
    }

    function refresh() {
      updateSvg();
      updatePanels();
    }

    function setMode(nextMode) {
      modeKey = nextMode;
      activeSet.clear();
      applyModeToControls();
      refresh();
    }

    try {
      const response = await fetch(svgSource);
      if (!response.ok) throw new Error(`Could not load SVG (${response.status}).`);

      const svgText = await response.text();
      const parser = new DOMParser();
      const parsed = parser.parseFromString(svgText, "image/svg+xml");
      const parseError = parsed.querySelector("parsererror");
      if (parseError) throw new Error("The SVG file is not valid XML.");

      svg = document.importNode(parsed.documentElement, true);
      namespaceSvgIds(svg, instanceId);
      svg.classList.add("beib-inline-svg");
      svg.setAttribute("focusable", "false");

      mount.replaceChildren(svg);
      mount.setAttribute("aria-busy", "false");

      setMode("closed");
    } catch (error) {
      mount.setAttribute("aria-busy", "false");
      mount.innerHTML = `<p class="beib-error"><strong>Activity unavailable.</strong> ${error.message}</p>`;
      modeFeedback.textContent = "Use the text fallback below while the interactive diagram is unavailable.";
      note.textContent = "Use the text fallback below while the interactive diagram is unavailable.";
      console.error(`[${ACTIVITY_NAME}]`, error);
    }

    modeInputs.forEach((input) => {
      input.addEventListener("change", () => {
        if (input.checked) setMode(input.value);
      });
    });

    interactionInputs.forEach((input) => {
      input.addEventListener("change", () => {
        const key = input.dataset.interaction;
        if (input.checked) activeSet.add(key);
        else activeSet.delete(key);
        refresh();
      });
    });
  }

  window.TextbookActivities = window.TextbookActivities || {};
  window.TextbookActivities[ACTIVITY_NAME] = { init };
})();
