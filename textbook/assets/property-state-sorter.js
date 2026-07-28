(function () {
  "use strict";

  const ACTIVITY_NAME = "property-state-sorter";
  let instanceCount = 0;

  const CARD_MODELS = {
    mass: {
      label: "Mass",
      short: "m",
      category: "extensive",
      kind: "extensive"
    },
    pressure: {
      label: "Pressure",
      short: "P",
      category: "intensive",
      kind: "intensive"
    },
    temperature: {
      label: "Temperature",
      short: "T",
      category: "intensive",
      kind: "intensive"
    },
    volume: {
      label: "Volume",
      short: "V",
      category: "extensive",
      kind: "extensive"
    },
    "specific-volume": {
      label: "Specific volume",
      short: "v",
      category: "specific",
      kind: "intensive"
    },
    "internal-energy": {
      label: "Internal energy",
      short: "U",
      category: "extensive",
      kind: "extensive"
    },
    heat: {
      label: "Heat",
      short: "Q",
      category: "process-dependent",
      kind: "process"
    },
    work: {
      label: "Work",
      short: "W",
      category: "process-dependent",
      kind: "process"
    }
  };

  const REGION_SLOTS = {
    extensive: [
      [50, 126],
      [50, 168],
      [50, 210]
    ],
    intensive: [
      [280, 126],
      [280, 168],
      [280, 210]
    ],
    specific: [
      [510, 126],
      [510, 168],
      [510, 210]
    ],
    "process-dependent": [
      [740, 126],
      [740, 168],
      [740, 210]
    ]
  };

  const DECK_POSITIONS = {
    mass: [20, 348],
    pressure: [180, 348],
    temperature: [20, 410],
    volume: [180, 410],
    "specific-volume": [20, 472],
    "internal-energy": [180, 472],
    heat: [20, 534],
    work: [180, 534]
  };

  function injectStyles() {
    if (document.getElementById("pss-inline-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "pss-inline-styles";

    style.textContent = `
      .pss-shell {
        display: grid;
        gap: 1rem;
        margin: 2rem 0;
      }

      .pss-svg-mount {
        overflow: hidden;
        border: 1px solid var(--border, #d0d7de);
        border-radius: 1rem;
        background: #ffffff;
      }

      .pss-inline-svg {
        display: block;
        width: 100%;
        height: auto;
      }

      .pss-loading,
      .pss-error {
        margin: 0;
        padding: 1rem;
      }

      .pss-error {
        border-left: 0.4rem solid #DA291C;
        background: rgba(218, 41, 28, 0.08);
      }

      .pss-panels {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      .pss-panel {
        padding: 1rem;
        border: 1px solid var(--border, #d0d7de);
        border-radius: 1rem;
        background: rgba(255, 255, 255, 0.98);
      }

      .pss-panel h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
      }

      .pss-panel p {
        margin-top: 0.35rem;
      }

      .pss-selection {
        font-weight: 700;
      }

      .pss-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
        margin-top: 0.85rem;
      }

      .pss-actions button,
      .pss-panel select {
        font: inherit;
      }

      .pss-actions button,
      .pss-mobile-assign button {
        min-height: 2.5rem;
        padding: 0.55rem 0.9rem;
        border: 2px solid transparent;
        border-radius: 0.7rem;
        cursor: pointer;
      }

      .pss-actions button[data-category="extensive"] {
        background: #F76902;
        color: #ffffff;
      }

      .pss-actions button[data-category="intensive"] {
        background: #009CBD;
        color: #ffffff;
      }

      .pss-actions button[data-category="specific"] {
        background: #84BD00;
        color: #10220a;
      }

      .pss-actions button[data-category="process-dependent"] {
        background: #7D55C7;
        color: #ffffff;
      }

      .pss-actions button[data-pss-reset] {
        border-color: #ACA39A;
        background: #ffffff;
        color: #222222;
      }

      .pss-actions button:focus-visible,
      .pss-mobile-assign button:focus-visible,
      .pss-pair-controls button:focus-visible,
      .pss-panel select:focus-visible {
        outline: 3px solid #F76902;
        outline-offset: 2px;
      }

      .pss-mobile-assign {
        display: none;
        align-items: center;
        gap: 0.6rem;
        margin-top: 0.85rem;
      }

      .pss-mobile-assign select {
        min-height: 2.5rem;
        padding: 0.45rem 0.6rem;
        border-radius: 0.7rem;
      }

      .pss-mobile-assign button {
        background: #F76902;
        color: #ffffff;
      }

      .pss-feedback {
        margin-top: 0.9rem;
        padding: 0.85rem 1rem;
        border-left: 0.4rem solid #ACA39A;
        background: #ffffff;
      }

      .pss-feedback.is-good {
        border-left-color: #84BD00;
      }

      .pss-feedback.is-warn {
        border-left-color: #F76902;
      }

      .pss-feedback.is-bad {
        border-left-color: #DA291C;
      }

      .pss-pair-controls {
        display: grid;
        grid-template-columns: 1fr 1fr auto;
        align-items: end;
        gap: 0.65rem;
      }

      .pss-pair-controls label {
        display: grid;
        gap: 0.35rem;
      }

      .pss-pair-controls select {
        min-height: 2.5rem;
        padding: 0.45rem 0.6rem;
        border-radius: 0.7rem;
      }

      .pss-pair-controls button {
        min-height: 2.5rem;
        padding: 0.55rem 0.9rem;
        border: 2px solid #009CBD;
        border-radius: 0.7rem;
        background: #009CBD;
        color: #ffffff;
        cursor: pointer;
      }

      .pss-muted {
        color: #555555;
        font-size: 0.95rem;
      }

      .pss-visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }

      @media (max-width: 760px) {
        .pss-panels {
          grid-template-columns: 1fr;
        }

        .pss-pair-controls {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 480px) {
        .pss-actions[data-desktop-actions] {
          display: none;
        }

        .pss-mobile-assign {
          display: flex;
          flex-wrap: wrap;
        }
      }
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

        if (!existing) {
          return;
        }

        const updated = existing
          .split(/\s+/)
          .map((token) => idMap.get(token) || token)
          .join(" ");

        element.setAttribute(attribute, updated);
      });
    });

    const referenceAttributes = [
      "href",
      "marker-start",
      "marker-mid",
      "marker-end",
      "fill",
      "stroke",
      "filter",
      "clip-path",
      "mask"
    ];

    referenceAttributes.forEach((attribute) => {
      svg.querySelectorAll(`[${attribute}]`).forEach((element) => {
        let value = element.getAttribute(attribute);

        if (!value) {
          return;
        }

        idMap.forEach((newId, oldId) => {
          value = value
            .replace(
              new RegExp(`url\\(#${oldId}\\)`, "g"),
              `url(#${newId})`
            )
            .replace(
              new RegExp(`^#${oldId}$`),
              `#${newId}`
            );
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

  function createInterface(instanceId) {
    const wrapper = document.createElement("div");
    wrapper.className = "pss-shell";

    wrapper.innerHTML = `
      <div class="pss-svg-mount" aria-busy="true">
        <p class="pss-loading">Loading interactive diagram...</p>
      </div>

      <div class="pss-panels">
        <section
          class="pss-panel"
          aria-labelledby="${instanceId}-sort-title"
        >
          <h3 id="${instanceId}-sort-title">
            Sort the property cards
          </h3>

          <p class="pss-selection" data-pss-selection>
            Select a card in the diagram.
          </p>

          <p class="pss-muted">
            Then assign it to one of the four categories.
          </p>

          <div class="pss-actions" data-desktop-actions>
            <button type="button" data-category="extensive">
              Assign to extensive
            </button>

            <button type="button" data-category="intensive">
              Assign to intensive
            </button>

            <button type="button" data-category="specific">
              Assign to specific
            </button>

            <button type="button" data-category="process-dependent">
              Assign to process dependent
            </button>

            <button type="button" data-pss-reset>
              Reset cards
            </button>
          </div>

          <div class="pss-mobile-assign">
            <label>
              <span class="pss-visually-hidden">
                Choose a category
              </span>

              <select data-pss-mobile-category>
                <option value="">Choose category</option>
                <option value="extensive">Extensive</option>
                <option value="intensive">Intensive</option>
                <option value="specific">Specific</option>
                <option value="process-dependent">
                  Process dependent
                </option>
              </select>
            </label>

            <button type="button" data-pss-mobile-assign>
              Assign
            </button>
          </div>

          <div
            class="pss-feedback"
            data-pss-sort-feedback
            role="status"
            aria-live="polite"
          >
            Every quantity starts unsorted. Sort all eight cards.
          </div>
        </section>

        <section
          class="pss-panel"
          aria-labelledby="${instanceId}-pair-title"
        >
          <h3 id="${instanceId}-pair-title">
            Test a property pair
          </h3>

          <p class="pss-muted">
            Assumption: simple compressible substance in a stated
            single phase.
          </p>

          <div class="pss-pair-controls">
            <label>
              <span>Property 1</span>

              <select data-pss-pair-a>
                <option value="">Choose one</option>
              </select>
            </label>

            <label>
              <span>Property 2</span>

              <select data-pss-pair-b>
                <option value="">Choose one</option>
              </select>
            </label>

            <button type="button" data-pss-check-pair>
              Check pair
            </button>
          </div>

          <div
            class="pss-feedback"
            data-pss-pair-feedback
            role="status"
            aria-live="polite"
          >
            Two independent intensive properties fix a simple
            compressible state in a single phase.
          </div>
        </section>
      </div>
    `;

    return wrapper;
  }

  function getIndependentPropertyResult(cardA, cardB) {
    if (!cardA || !cardB) {
      return {
        short: "Choose two properties.",
        detail: "Select two property names before checking the pair.",
        status: "bad"
      };
    }

    if (cardA === cardB) {
      return {
        short: "Not independent.",
        detail:
          "The same property chosen twice cannot provide two independent property specifications.",
        status: "bad"
      };
    }

    const modelA = CARD_MODELS[cardA];
    const modelB = CARD_MODELS[cardB];

    if (!modelA || !modelB) {
      return {
        short: "Choose valid properties.",
        detail:
          "Both selections must be from the provided property list.",
        status: "bad"
      };
    }

    if (modelA.kind === "process" || modelB.kind === "process") {
      return {
        short: "State not fixed.",
        detail:
          "Heat and work are process-dependent transfers, not state properties, so they cannot be used to fix a thermodynamic state.",
        status: "bad"
      };
    }

    if (
      modelA.kind !== "intensive" ||
      modelB.kind !== "intensive"
    ) {
      return {
        short: "State not fixed.",
        detail:
          "You need two independent intensive properties. Extensive properties such as mass, volume, and total internal energy do not satisfy that rule.",
        status: "warn"
      };
    }

    return {
      short: "Yes — independent.",
      detail:
        `${modelA.label} and ${modelB.label} are both intensive properties. ` +
        "For a simple compressible substance in a stated single phase, " +
        "two independent intensive properties fix the state.",
      status: "good"
    };
  }

  function updateIndependenceIndicator(svg, message, status) {
    const target = svg.querySelector(
      '[id^="pss-independence-status-"]'
    );

    if (!target) {
      return;
    }

    target.textContent = message;

    const statusColor =
      status === "good"
        ? "#548000"
        : status === "bad"
          ? "#DA291C"
          : "#F76902";

    target.setAttribute("fill", statusColor);
  }

  function applyResponsiveLayout(svg) {
    svg.setAttribute("viewBox", "0 0 960 640");
  }

  async function init(host) {
    if (!host || host.dataset.activityInitialized === "true") {
      return;
    }

    host.dataset.activityInitialized = "true";
    injectStyles();

    instanceCount += 1;

    const instanceId = `pss-${instanceCount}`;
    const svgSource =
      host.dataset.svgSrc || "assets/property-state-sorter.svg";

    const interfaceRoot = createInterface(instanceId);
    const fallback = host.querySelector(".activity-fallback");

    if (fallback) {
      host.insertBefore(interfaceRoot, fallback);
    } else {
      host.appendChild(interfaceRoot);
    }

    const mount =
      interfaceRoot.querySelector(".pss-svg-mount");

    const selectionText =
      interfaceRoot.querySelector("[data-pss-selection]");

    const sortFeedback =
      interfaceRoot.querySelector("[data-pss-sort-feedback]");

    const pairFeedback =
      interfaceRoot.querySelector("[data-pss-pair-feedback]");

    const pairA =
      interfaceRoot.querySelector("[data-pss-pair-a]");

    const pairB =
      interfaceRoot.querySelector("[data-pss-pair-b]");

    const pairButton =
      interfaceRoot.querySelector("[data-pss-check-pair]");

    const resetButton =
      interfaceRoot.querySelector("[data-pss-reset]");

    const mobileCategory =
      interfaceRoot.querySelector("[data-pss-mobile-category]");

    const mobileAssignButton =
      interfaceRoot.querySelector("[data-pss-mobile-assign]");

    let svg = null;
    let selectedCardId = null;

    const assignments = {};

    function populatePairSelects() {
      Object.entries(CARD_MODELS).forEach(([id, model]) => {
        const optionA = document.createElement("option");
        optionA.value = id;
        optionA.textContent = model.label;

        const optionB = optionA.cloneNode(true);

        pairA.appendChild(optionA);
        pairB.appendChild(optionB);
      });
    }

    function setSelectedCard(cardId) {
      selectedCardId = cardId;

      selectionText.textContent = cardId
        ? `Selected card: ${CARD_MODELS[cardId].label}`
        : "Select a card in the diagram.";

      if (!svg) {
        return;
      }

      svg.querySelectorAll(".pss-card").forEach((card) => {
        const selected = card.dataset.cardId === cardId;

        card.classList.toggle("is-selected", selected);
        card.setAttribute(
          "aria-pressed",
          selected ? "true" : "false"
        );
      });
    }

    function updateSortFeedback() {
      const totalAssigned = Object.keys(assignments).length;

      const incorrectAssignments =
        Object.entries(assignments).filter(
          ([cardId, category]) =>
            CARD_MODELS[cardId].category !== category
        );

      if (totalAssigned === 0) {
        sortFeedback.className = "pss-feedback";
        sortFeedback.textContent =
          "Every quantity starts unsorted. Sort all eight cards.";
        return;
      }

      if (totalAssigned < 8) {
        sortFeedback.className = "pss-feedback is-warn";
        sortFeedback.textContent =
          `${totalAssigned} of 8 cards sorted. ` +
          "Continue until all cards are assigned.";
        return;
      }

      if (incorrectAssignments.length === 0) {
        sortFeedback.className = "pss-feedback is-good";
        sortFeedback.textContent =
          "Excellent. All eight quantities are correctly classified.";
        return;
      }

      sortFeedback.className = "pss-feedback is-bad";
      sortFeedback.textContent =
        `All cards are placed, but ` +
        `${incorrectAssignments.length} assignment(s) are incorrect. ` +
        "Recheck the category definitions.";
    }

    function repositionCards() {
      if (!svg) {
        return;
      }

      Object.keys(CARD_MODELS).forEach((cardId) => {
        const card = svg.querySelector(
          `.pss-card[data-card-id="${cardId}"]`
        );

        if (!card) {
          return;
        }

        const category = assignments[cardId];

        if (!category) {
          const [x, y] = DECK_POSITIONS[cardId];

          card.setAttribute(
            "transform",
            `translate(${x} ${y})`
          );

          card.classList.remove("is-assigned");
          return;
        }

        const cardsInCategory = Object.entries(assignments)
          .filter(
            ([, assignedCategory]) =>
              assignedCategory === category
          )
          .map(([id]) => id)
          .sort(
            (a, b) =>
              Object.keys(CARD_MODELS).indexOf(a) -
              Object.keys(CARD_MODELS).indexOf(b)
          );

        const slotIndex = cardsInCategory.indexOf(cardId);
        const slots = REGION_SLOTS[category];
        const slot =
          slots[Math.min(slotIndex, slots.length - 1)];

        card.setAttribute(
          "transform",
          `translate(${slot[0]} ${slot[1]}) scale(0.78)`
        );

        card.classList.add("is-assigned");
      });
    }

    function assignSelectedCard(category) {
      if (!selectedCardId) {
        sortFeedback.className = "pss-feedback is-warn";
        sortFeedback.textContent =
          "Select a card first, then assign it to a category.";
        return;
      }

      assignments[selectedCardId] = category;

      setSelectedCard(null);
      repositionCards();
      updateSortFeedback();
    }

    function resetAssignments() {
      Object.keys(assignments).forEach((key) => {
        delete assignments[key];
      });

      setSelectedCard(null);
      repositionCards();
      updateSortFeedback();
    }

    function checkPair() {
      const result = getIndependentPropertyResult(
        pairA.value,
        pairB.value
      );

      const feedbackClass =
        result.status === "good"
          ? "is-good"
          : result.status === "warn"
            ? "is-warn"
            : "is-bad";

      pairFeedback.className =
        `pss-feedback ${feedbackClass}`;

      pairFeedback.innerHTML =
        `<strong>${result.short}</strong> ${result.detail}`;

      if (svg) {
        updateIndependenceIndicator(
          svg,
          result.short,
          result.status
        );
      }
    }

    try {
      const response = await fetch(svgSource);

      if (!response.ok) {
        throw new Error(
          `Could not load SVG (${response.status}).`
        );
      }

      const svgText = await response.text();
      const parser = new DOMParser();

      const parsed = parser.parseFromString(
        svgText,
        "image/svg+xml"
      );

      const parseError =
        parsed.querySelector("parsererror");

      if (parseError) {
        throw new Error(
          "The SVG file is not valid XML."
        );
      }

      svg = document.importNode(
        parsed.documentElement,
        true
      );

      namespaceSvgIds(svg, instanceId);

      svg.classList.add("pss-inline-svg");
      svg.setAttribute("focusable", "false");

      mount.replaceChildren(svg);
      mount.setAttribute("aria-busy", "false");

      svg.querySelectorAll(".pss-card").forEach((card) => {
        const cardId = card.dataset.cardId;

        card.addEventListener("click", () => {
          setSelectedCard(cardId);
        });

        card.addEventListener("keydown", (event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            setSelectedCard(cardId);
          }
        });
      });

      applyResponsiveLayout(svg);
    } catch (error) {
      mount.setAttribute("aria-busy", "false");

      mount.innerHTML = `
        <p class="pss-error">
          <strong>Activity unavailable.</strong>
          ${error.message}
        </p>
      `;

      sortFeedback.textContent =
        "Use the text fallback below while the interactive diagram is unavailable.";

      pairFeedback.textContent =
        "Use the text fallback below while the interactive diagram is unavailable.";

      console.error(`[${ACTIVITY_NAME}]`, error);
    }

    interfaceRoot
      .querySelectorAll("[data-category]")
      .forEach((button) => {
        button.addEventListener("click", () => {
          assignSelectedCard(button.dataset.category);
        });
      });

    resetButton.addEventListener(
      "click",
      resetAssignments
    );

    mobileAssignButton.addEventListener("click", () => {
      if (mobileCategory.value) {
        assignSelectedCard(mobileCategory.value);
      }
    });

    pairButton.addEventListener(
      "click",
      checkPair
    );

    populatePairSelects();
  }

  window.TextbookActivities =
    window.TextbookActivities || {};

  window.TextbookActivities[ACTIVITY_NAME] = {
    init
  };
})();
