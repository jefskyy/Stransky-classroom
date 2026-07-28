(() => {
  const TEXTBOOK_ROOT = "./";
  const CONTENT_ROOT = "content/";
  const MANIFEST_PATH = `${CONTENT_ROOT}manifest.json`;

  const state = {
    manifest: null,
    pages: [],
    currentSlug: "",
    currentMarkdown: "",
    searchQuery: ""
  };

  const elements = {};

  document.addEventListener("DOMContentLoaded", bootTextbook);

  async function bootTextbook() {
    cacheElements();
    bindEvents();

    try {
      await loadManifest();

      const requestedTopic = getQueryParam("topic");
      const initialSlug = requestedTopic || state.pages[0]?.slug || "";

      renderNavigation();
      await loadTopic(initialSlug, { pushState: false });
    } catch (error) {
      setStatus(`Textbook failed to load: ${error.message}`, "error");
    }
  }

  function cacheElements() {
    elements.title = document.getElementById("textbookTitle");
    elements.status = document.getElementById("textbookStatus");
    elements.content = document.getElementById("textbookContent");
    elements.nav = document.getElementById("textbookNav");
    elements.layout = document.querySelector(".textbook-layout");
    elements.pageList = document.getElementById("textbookPageList");
    elements.search = document.getElementById("textbookSearch");
    elements.toggleNavButton = document.getElementById("toggleNavButton");
  }

  function bindEvents() {
    elements.search?.addEventListener("input", event => {
      state.searchQuery = event.target.value.trim().toLowerCase();
      renderNavigation();
    });

    elements.toggleNavButton?.addEventListener("click", () => {
      const collapsed = elements.nav.classList.toggle("collapsed");
      elements.layout.classList.toggle("nav-collapsed", collapsed);
      elements.toggleNavButton.setAttribute("aria-expanded", collapsed ? "false" : "true");
    });

    window.addEventListener("popstate", async () => {
      const topic = getQueryParam("topic") || state.pages[0]?.slug || "";
      await loadTopic(topic, { pushState: false });
    });

    document.addEventListener("click", async event => {
      const link = event.target.closest("a[data-textbook-slug]");
      if (!link) return;

      event.preventDefault();
      const slug = link.dataset.textbookSlug;
      if (slug) {
        await loadTopic(slug, { pushState: true });
      }
    });
  }

  async function loadManifest() {
    const response = await fetch(MANIFEST_PATH, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`Could not fetch ${MANIFEST_PATH}`);
    }

    const manifest = await response.json();

    if (!manifest || !Array.isArray(manifest.pages)) {
      throw new Error("Textbook manifest must contain a pages array.");
    }

    state.manifest = manifest;
    state.pages = manifest.pages
      .filter(page => page && page.slug && page.file && page.title)
      .map(page => ({
        slug: sanitizeSlug(page.slug),
        title: String(page.title),
        description: String(page.description || ""),
        file: String(page.file),
        keywords: Array.isArray(page.keywords) ? page.keywords.map(String) : []
      }));

    if (state.pages.length === 0) {
      throw new Error("No valid textbook pages were found in manifest.json.");
    }
  }

  async function loadTopic(slug, options = { pushState: true }) {
    const safeSlug = sanitizeSlug(slug);
    const page = findPageBySlug(safeSlug) || state.pages[0];

    if (!page) {
      throw new Error("No textbook page available.");
    }

    state.currentSlug = page.slug;
    setStatus(`Loading ${page.title}...`, "neutral");

    const markdownUrl = `${CONTENT_ROOT}${encodeURIComponent(page.file)}`;
    const response = await fetch(markdownUrl, { cache: "no-cache" });

    if (!response.ok) {
      throw new Error(`Could not load ${markdownUrl}`);
    }

    const markdown = await response.text();
    state.currentMarkdown = markdown;

    renderPage(page, markdown);
    renderNavigation();

    if (options.pushState) {
      const nextUrl = makeViewerUrl(page.slug);
      window.history.pushState({ topic: page.slug }, page.title, nextUrl);
    }

    setStatus("", "neutral");
  }

  function renderPage(page, markdown) {
    document.title = `${page.title} | Textbook`;
    if (elements.title) elements.title.textContent = page.title;

    const linkedMarkdown = transformWikiLinks(markdown);
    const html = parseMarkdown(linkedMarkdown);

    elements.content.innerHTML = html;
    normalizeRelativeLinks(elements.content);
    renderMath(elements.content);
  }

  function parseMarkdown(markdown) {
    if (!window.marked || !window.marked.parse) {
      return `<p>Markdown renderer unavailable. Check the Marked.js script in viewer.html.</p><pre>${escapeHtml(markdown)}</pre>`;
    }

    window.marked.setOptions({
      gfm: true,
      breaks: false,
      mangle: false,
      headerIds: true
    });

    return window.marked.parse(markdown);
  }

  function transformWikiLinks(markdown) {
    return String(markdown).replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_match, rawSlug, rawLabel) => {
      const slug = sanitizeSlug(rawSlug);
      const page = findPageBySlug(slug);
      const label = rawLabel ? String(rawLabel).trim() : page?.title || rawSlug.trim();

      if (!page) {
        return `<span class="missing-wiki-link" title="Missing page: ${escapeHtml(slug)}">${escapeHtml(label)}</span>`;
      }

      return `<a href="${makeViewerUrl(slug)}" data-textbook-slug="${escapeHtml(slug)}">${escapeHtml(label)}</a>`;
    });
  }

  function normalizeRelativeLinks(container) {
    const links = Array.from(container.querySelectorAll("a[href]"));

    links.forEach(link => {
      const href = link.getAttribute("href") || "";

      if (
        href.startsWith("#") ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("data:")
      ) {
        return;
      }

      const mdMatch = href.match(/([^/]+)\.md(?:#(.+))?$/i);
      if (mdMatch) {
        const slug = sanitizeSlug(mdMatch[1]);
        const hash = mdMatch[2] ? `#${mdMatch[2]}` : "";
        link.href = makeViewerUrl(slug) + hash;
        link.dataset.textbookSlug = slug;
        return;
      }

      const slugOnly = href.replace(/^\.\//, "").replace(/\/$/, "");
      const page = findPageBySlug(slugOnly);
      if (page) {
        link.href = makeViewerUrl(page.slug);
        link.dataset.textbookSlug = page.slug;
      }
    });
  }

  function renderMath(container) {
    if (typeof window.renderMathInElement !== "function") {
      return;
    }

    window.renderMathInElement(container, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false }
      ],
      throwOnError: false
    });
  }

  function renderNavigation() {
    if (!elements.pageList) return;

    const query = state.searchQuery;
    const filteredPages = query
      ? state.pages.filter(page => pageMatchesSearch(page, query))
      : state.pages;

    if (filteredPages.length === 0) {
      elements.pageList.innerHTML = `<div class="empty-state">No matching textbook pages.</div>`;
      return;
    }

    elements.pageList.innerHTML = filteredPages.map(page => {
      const active = page.slug === state.currentSlug ? " active" : "";
      return `
        <a class="textbook-page-link${active}" href="${makeViewerUrl(page.slug)}" data-textbook-slug="${escapeHtml(page.slug)}">
          <strong>${escapeHtml(page.title)}</strong>
          <span>${escapeHtml(page.description || page.keywords.join(", "))}</span>
        </a>
      `;
    }).join("");
  }

  function pageMatchesSearch(page, query) {
    const haystack = [
      page.slug,
      page.title,
      page.description,
      ...(page.keywords || [])
    ].join(" ").toLowerCase();

    return haystack.includes(query);
  }

  function findPageBySlug(slug) {
    const safeSlug = sanitizeSlug(slug);
    return state.pages.find(page => page.slug === safeSlug);
  }

  function sanitizeSlug(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\.md$/i, "")
      .replace(/[^a-z0-9-_]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function makeViewerUrl(slug) {
    return `viewer.html?topic=${encodeURIComponent(sanitizeSlug(slug))}`;
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name) || "";
  }

  function setStatus(message, kind = "neutral") {
    if (!elements.status) return;
    elements.status.textContent = message || "";
    elements.status.dataset.kind = kind;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
