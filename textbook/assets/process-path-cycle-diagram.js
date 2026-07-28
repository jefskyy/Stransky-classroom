(function () {
  "use strict";

  const ACTIVITY_NAME = "process-path-cycle-diagram";
  let instanceCount = 0;

  const PATH_MODELS = {
    "path-a": {
      label: "Known path A",
      description:
        "A smooth, solid curve connects state 1 to state 2.",
      endpointResult:
        "The property changes are fixed by state 1 and state 2.",
      pathResult:
        "Heat and work can take values specific to this curved path."
    },

    "path-b": {
      label: "Known path B",
      description:
        "A dashed, two-stage path connects the same states.",
      endpointResult:
        "The property changes are unchanged because the endpoints are unchanged.",
      pathResult:
        "Heat and work may differ from path A because the process route is different."
    },

    "path-unknown": {
      label: "Unknown path",
      description:
        "Only the endpoints are known; the detailed process route is unspecified.",
      endpointResult:
        "Property changes can still be determined from the endpoint states.",
      pathResult:
        "Heat and work generally cannot be determined without additional path information."
    }
  };

  function injectStyles() {
    if (document.getElementById("ppc-inline-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "ppc-inline-styles";

    style.textContent = `
      .ppc-shell {
        display: grid;
        gap: 1rem;
        margin: 2rem 0;
      }

      .ppc-svg-mount {
        overflow: hidden;
        border: 1px solid var(--border, #d0d7de);
        border-radius: 1rem;
        background: #ffffff;
      }

      .ppc-inline-svg {
        display: block;
        width: 100%;
        height: auto;
      }

      .ppc-loading,
      .ppc-error {
        margin: 0;
        padding: 1rem;
      }

      .ppc-error {
        border-left: 0.4rem solid #DA291C;
        background: rgba(218, 41, 28, 0.08);
      }

      .ppc-controls {
        display: grid;
        grid-template-columns:
          minmax(0, 1.4fr)
          minmax(15rem, 0.8fr);
        gap: 1rem;
      }

      .ppc-panel {
        padding: 1rem;
        border: 1px solid var(--border, #d0d7de);
        border-radius: 1rem;
        background: #ffffff;
      }

      .ppc-panel h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
      }

      .ppc-button-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
        margin-top: 0.8rem;
      }

      .ppc-button-row button {
        min-height: 2.6rem;
        padding: 0.55rem 0.9rem;
        border: 2px solid #ACA39A;
        border-radius: 0.7rem;
        background: #ffffff;
        color: #222222;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
      }

      .ppc-button-row button[data-path-button="path-a"] {
        border-color: #F76902;
      }

      .ppc-button-row button[data-path-button="path-b"] {
        border-color: #009CBD;
        border-style: dashed;
      }

      .ppc-button-row button[data-path-button="path-unknown"] {
        border-color: #7D55C7;
        border-style: dotted;
      }

      .ppc-button-row button[aria-pressed="true"] {
        background: #FFF4ED;
        box-shadow: 0 0 0 3px #F6BE00;
      }

      .ppc-button-row button:focus-visible,
      .ppc-cycle-toggle:focus-visible {
        outline: 3px solid #F76902;
        outline-offset: 3px;
      }

      .ppc-result-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.8rem;
        margin-top: 0.9rem;
      }

      .ppc-result-card {
        padding: 0.8rem;
        border-radius: 0.75rem;
        background: rgba(215, 210, 203, 0.24);
      }

      .ppc-result-card.endpoint {
        border-left: 0.4rem solid #009CBD;
      }

      .ppc-result-card.path {
        border-left: 0.4rem solid #DA291C;
      }

      .ppc-result-card strong {
        display: block;
        margin-bottom: 0.25rem;
      }

      .ppc-cycle-toggle {
        min-height: 2.7rem;
        padding: 0.6rem 1rem;
        border: 2px solid #84BD00;
        border-radius: 0.7rem;
        background: #84BD00;
        color: #10220a;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
      }

      .ppc-feedback {
        margin-top: 0.85rem;
        padding: 0.8rem 1rem;
        border-left: 0.4rem solid #84BD00;
        background: rgba(132, 189, 0, 0.08);
      }

      .ppc-muted {
        color: #555555;
      }

      @media (max-width: 760px) {
        .ppc-controls,
        .ppc-result-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 420px) {
        .ppc-button-row {
          display: grid;
          grid-template-columns: 1fr;
        }

        .ppc-button-row button,
        .ppc-cycle-toggle {
          width: 100%;
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

    ["aria-labelledby", "aria-describedby"].forEach(
      (attribute) => {
        svg
          .querySelectorAll(`[${attribute}]`)
          .forEach((element) => {
            const value =
              element.getAttribute(attribute);

            if (!value) {
              return;
            }

            element.setAttribute(
              attribute,
              value
                .split(/\s+/)
                .map(
                  (token) =>
                    idMap.get(token) || token
                )
                .join(" ")
            );
          });
      }
    );

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
      svg
        .querySelectorAll(`[${attribute}]`)
        .forEach((element) => {
          let value =
            element.getAttribute(attribute);

          if (!value) {
            return;
          }

          idMap.forEach((newId, oldId) => {
            value = value
              .replace(
                new RegExp(
                  `url\\(#${oldId}\\)`,
                  "g"
                ),
                `url(#${newId})`
              )
              .replace(
                new RegExp(`^#${oldId}$`),
                `#${newId}`
              );
          });

          element.setAttribute(
            attribute,
            value
          );
        });
    });

    svg
      .querySelectorAll("style")
      .forEach((styleElement) => {
        let cssText =
          styleElement.textContent;

        idMap.forEach((newId, oldId) => {
          cssText = cssText.replace(
            new RegExp(
              `url\\(#${oldId}\\)`,
              "g"
            ),
            `url(#${newId})`
          );
        });

        styleElement.textContent =
          cssText;
      });
  }

  function createInterface(instanceId) {
    const wrapper =
      document.createElement("div");

    wrapper.className = "ppc-shell";

    wrapper.innerHTML = `
      <div
        class="ppc-svg-mount"
        aria-busy="true"
      >
        <p class="ppc-loading">
          Loading interactive diagram...
        </p>
      </div>

      <div class="ppc-controls">
        <section
          class="ppc-panel"
          aria-labelledby="${instanceId}-path-title"
        >
          <h3 id="${instanceId}-path-title">
            Compare paths
          </h3>

          <p class="ppc-muted">
            Choose a path between state 1
            and state 2.
          </p>

          <div
            class="ppc-button-row"
            role="group"
            aria-label="Path selection"
          >
            <button
              type="button"
              data-path-button="path-a"
              aria-pressed="false"
            >
              Known path A
            </button>

            <button
              type="button"
              data-path-button="path-b"
              aria-pressed="false"
            >
              Known path B
            </button>

            <button
              type="button"
              data-path-button="path-unknown"
              aria-pressed="false"
            >
              Unknown path
            </button>
          </div>

          <p
            data-ppc-path-description
            class="ppc-feedback"
            role="status"
            aria-live="polite"
          >
            Select a path to compare
            endpoint-determined quantities
            with path-dependent transfers.
          </p>

          <div class="ppc-result-grid">
            <div
              class="ppc-result-card endpoint"
            >
              <strong>
                Determined by endpoints
              </strong>

              <span
                data-ppc-endpoint-result
              >
                Property changes depend only
                on state 1 and state 2.
              </span>
            </div>

            <div
              class="ppc-result-card path"
            >
              <strong>
                May depend on the path
              </strong>

              <span data-ppc-path-result>
                Heat and work can depend on
                the process route.
              </span>
            </div>
          </div>
        </section>

        <section
          class="ppc-panel"
          aria-labelledby="${instanceId}-cycle-title"
        >
          <h3 id="${instanceId}-cycle-title">
            Toggle cycle direction
          </h3>

          <p class="ppc-muted">
            The direction changes the
            orientation of the cycle, but the
            system still returns to its
            initial state.
          </p>

          <button
            type="button"
            class="ppc-cycle-toggle"
            data-ppc-cycle-toggle
            aria-pressed="false"
          >
            Switch to counterclockwise
          </button>

          <div
            class="ppc-feedback"
            data-ppc-cycle-feedback
            role="status"
            aria-live="polite"
          >
            Clockwise cycle shown. All
            property changes are zero over
            the complete cycle.
          </div>
        </section>
      </div>
    `;

    return wrapper;
  }

  function setCycleDirection(
    svg,
    clockwise
  ) {
    const topArrow = svg.querySelector(
      '[id^="ppc-cycle-arrow-top-"]'
    );

    const bottomArrow = svg.querySelector(
      '[id^="ppc-cycle-arrow-bottom-"]'
    );

    const directionLabel =
      svg.querySelector(
        '[id^="ppc-cycle-direction-label-"]'
      );

    if (
      !topArrow ||
      !bottomArrow ||
      !directionLabel
    ) {
      return;
    }

    if (clockwise) {
      topArrow.setAttribute(
        "d",
        "M63 93 C90 68 135 68 162 92"
      );

      bottomArrow.setAttribute(
        "d",
        "M162 168 C135 192 90 192 63 168"
      );

      directionLabel.textContent =
        "clockwise direction";
    } else {
      topArrow.setAttribute(
        "d",
        "M162 92 C135 68 90 68 63 93"
      );

      bottomArrow.setAttribute(
        "d",
        "M63 168 C90 192 135 192 162 168"
      );

      directionLabel.textContent =
        "counterclockwise direction";
    }
  }

  async function init(host) {
    if (
      !host ||
      host.dataset.activityInitialized ===
        "true"
    ) {
      return;
    }

    host.dataset.activityInitialized =
      "true";

    injectStyles();

    instanceCount += 1;

    const instanceId =
      `ppc-${instanceCount}`;

    const svgSource =
      host.dataset.svgSrc ||
      "assets/process-path-cycle-diagram.svg";

    const interfaceRoot =
      createInterface(instanceId);

    const fallback =
      host.querySelector(
        ".activity-fallback"
      );

    if (fallback) {
      host.insertBefore(
        interfaceRoot,
        fallback
      );
    } else {
      host.appendChild(interfaceRoot);
    }

    const mount =
      interfaceRoot.querySelector(
        ".ppc-svg-mount"
      );

    const pathDescription =
      interfaceRoot.querySelector(
        "[data-ppc-path-description]"
      );

    const endpointResult =
      interfaceRoot.querySelector(
        "[data-ppc-endpoint-result]"
      );

    const pathResult =
      interfaceRoot.querySelector(
        "[data-ppc-path-result]"
      );

    const cycleToggle =
      interfaceRoot.querySelector(
        "[data-ppc-cycle-toggle]"
      );

    const cycleFeedback =
      interfaceRoot.querySelector(
        "[data-ppc-cycle-feedback]"
      );

    let svg = null;
    let clockwise = true;

    function selectPath(pathId) {
      const model =
        PATH_MODELS[pathId];

      if (!model || !svg) {
        return;
      }

      svg
        .querySelectorAll(
          ".ppc-path-group"
        )
        .forEach((group) => {
          const selected =
            group.dataset.pathId ===
            pathId;

          group.classList.toggle(
            "is-selected",
            selected
          );

          group.setAttribute(
            "aria-pressed",
            selected
              ? "true"
              : "false"
          );
        });

      interfaceRoot
        .querySelectorAll(
          "[data-path-button]"
        )
        .forEach((button) => {
          button.setAttribute(
            "aria-pressed",
            button.dataset.pathButton ===
              pathId
              ? "true"
              : "false"
          );
        });

      pathDescription.innerHTML =
        `<strong>${model.label}.</strong> ` +
        model.description;

      endpointResult.textContent =
        model.endpointResult;

      pathResult.textContent =
        model.pathResult;
    }

    try {
      const response =
        await fetch(svgSource);

      if (!response.ok) {
        throw new Error(
          `Could not load SVG (${response.status}).`
        );
      }

      const svgText =
        await response.text();

      const parser =
        new DOMParser();

      const parsed =
        parser.parseFromString(
          svgText,
          "image/svg+xml"
        );

      const parseError =
        parsed.querySelector(
          "parsererror"
        );

      if (parseError) {
        throw new Error(
          "The SVG file is not valid XML."
        );
      }

      svg = document.importNode(
        parsed.documentElement,
        true
      );

      namespaceSvgIds(
        svg,
        instanceId
      );

      svg.classList.add(
        "ppc-inline-svg"
      );

      svg.setAttribute(
        "focusable",
        "false"
      );

      mount.replaceChildren(svg);

      mount.setAttribute(
        "aria-busy",
        "false"
      );

      svg
        .querySelectorAll(
          ".ppc-path-group"
        )
        .forEach((group) => {
          const pathId =
            group.dataset.pathId;

          group.addEventListener(
            "click",
            () => selectPath(pathId)
          );

          group.addEventListener(
            "keydown",
            (event) => {
              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                event.preventDefault();
                selectPath(pathId);
              }
            }
          );
        });

      setCycleDirection(
        svg,
        clockwise
      );
    } catch (error) {
      mount.setAttribute(
        "aria-busy",
        "false"
      );

      mount.innerHTML = `
        <p class="ppc-error">
          <strong>
            Activity unavailable.
          </strong>
          ${error.message}
        </p>
      `;

      pathDescription.textContent =
        "Use the text fallback below while the interactive diagram is unavailable.";

      cycleFeedback.textContent =
        "Use the text fallback below while the interactive diagram is unavailable.";

      console.error(
        `[${ACTIVITY_NAME}]`,
        error
      );
    }

    interfaceRoot
      .querySelectorAll(
        "[data-path-button]"
      )
      .forEach((button) => {
        button.addEventListener(
          "click",
          () => {
            selectPath(
              button.dataset.pathButton
            );
          }
        );
      });

    cycleToggle.addEventListener(
      "click",
      () => {
        clockwise = !clockwise;

        if (svg) {
          setCycleDirection(
            svg,
            clockwise
          );
        }

        cycleToggle.setAttribute(
          "aria-pressed",
          clockwise
            ? "false"
            : "true"
        );

        cycleToggle.textContent =
          clockwise
            ? "Switch to counterclockwise"
            : "Switch to clockwise";

        cycleFeedback.textContent =
          clockwise
            ? "Clockwise cycle shown. All property changes are zero over the complete cycle."
            : "Counterclockwise cycle shown. All property changes are still zero over the complete cycle.";
      }
    );
  }

  window.TextbookActivities =
    window.TextbookActivities || {};

  window.TextbookActivities[
    ACTIVITY_NAME
  ] = {
    init
  };
})();
