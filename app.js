import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
  set,
  update,
  remove,
  onValue,
  onDisconnect,
  serverTimestamp,
  goOnline
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDT4b9oMiVuowe9eDAtRA0x6LgKc2S6LP4",
  authDomain: "stransky-classroom.firebaseapp.com",
  databaseURL: "https://stransky-classroom-default-rtdb.firebaseio.com/",
  projectId: "stransky-classroom",
  storageBucket: "stransky-classroom.firebasestorage.app",
  messagingSenderId: "192133852270",
  appId: "1:192133852270:web:f00ee5c08803cc174b0a7f"
};

const APP_VERSION = "1.0.0";
const STORAGE_KEY = "ritClassroomEngagementState.v1";
const MODULE_LABELS = {
  signin: "Name Sign-In",
  ai: "AI Problem Engagement",
  groups: "Randomized Groups",
  html: "Dynamic HTML Viewer"
};

const configured = isFirebaseConfigured(firebaseConfig);
let firebaseApp = null;
let database = null;
let auth = null;
let activeRoomUnsubscribe = null;
let connectionUnsubscribe = null;
let latestRoomState = null;
let currentRoomId = "";
let currentStudentId = "";
let currentStudentName = "";
let lastStudentHtmlVersion = null;
let authReadyPromise = Promise.resolve(null);

function isFirebaseConfigured(config) {
  return Boolean(
    config &&
    config.apiKey &&
    !config.apiKey.includes("REPLACE_WITH") &&
    config.databaseURL &&
    config.databaseURL.startsWith("https://") &&
    !config.databaseURL.includes("REPLACE_WITH") &&
    !config.databaseURL.includes("PASTE_YOUR_REALTIME_DATABASE_URL_HERE")
  );
}

function initializeFirebase() {
  if (!configured) {
    return { ok: false, message: "Firebase config is not set. Replace the values in app.js before deployment." };
  }

  if (database) {
    return { ok: true, message: "Firebase ready." };
  }

  try {
    firebaseApp = initializeApp(firebaseConfig);
    database = getDatabase(firebaseApp);
    auth = getAuth(firebaseApp);
    authReadyPromise = signInAnonymously(auth).catch(() => null);
    return { ok: true, message: "Firebase ready." };
  } catch (error) {
    return { ok: false, message: `Firebase initialization failed: ${error.message}` };
  }
}

function readStore() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function writeStore(nextState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

function patchStore(patch) {
  const current = readStore();
  const next = { ...current, ...patch, storedAt: Date.now() };
  writeStore(next);
  return next;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cleanText(value, maxLength = 5000) {
  return String(value ?? "").replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, maxLength);
}

function formatTime(value) {
  if (!value || typeof value !== "number") return "—";
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
  }).format(new Date(value));
}

function getUrlParam(name) {
  return new URLSearchParams(window.location.search).get(name) || "";
}

function normalizeRoomId(value) {
  return String(value ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
}

function generateId(prefix) {
  const cryptoApi = globalThis.crypto;
  if (cryptoApi && typeof cryptoApi.randomUUID === "function") {
    return `${prefix}-${cryptoApi.randomUUID()}`;
  }
  const random = Math.random().toString(36).slice(2, 12);
  return `${prefix}-${Date.now().toString(36)}-${random}`;
}

function generateRoomId() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < 6; i += 1) {
    id += alphabet[randomInt(alphabet.length)];
  }
  return id;
}

function randomInt(maxExclusive) {
  if (maxExclusive <= 1) return 0;
  const cryptoApi = globalThis.crypto;
  if (cryptoApi && typeof cryptoApi.getRandomValues === "function") {
    const array = new Uint32Array(1);
    const limit = Math.floor(0x100000000 / maxExclusive) * maxExclusive;
    let value = 0;
    do {
      cryptoApi.getRandomValues(array);
      value = array[0];
    } while (value >= limit);
    return value % maxExclusive;
  }
  return Math.floor(Math.random() * maxExclusive);
}

function fisherYatesShuffle(items) {
  const shuffled = items.slice();
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function roomRef(roomId, childPath = "") {
  if (!database) throw new Error("Realtime database is not initialized.");
  const safeRoom = normalizeRoomId(roomId);
  const path = childPath ? `rooms/${safeRoom}/${childPath}` : `rooms/${safeRoom}`;
  return ref(database, path);
}

function getBaseUrl() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const last = parts[parts.length - 1] || "";
  if (last.endsWith(".html")) parts.pop();
  const path = parts.length ? `/${parts.join("/")}/` : "/";
  return `${window.location.origin}${path}`;
}

function getJoinUrl(roomId) {
  return `${getBaseUrl()}student.html?room=${encodeURIComponent(normalizeRoomId(roomId))}`;
}

function getRosterStudents(roomState) {
  return Object.values(roomState?.students || {})
    .filter(student => student && student.id && student.name)
    .sort((a, b) => String(a.name).localeCompare(String(b.name)));
}

function makeEmptyRoom(roomId) {
  const safeRoom = normalizeRoomId(roomId);
  return {
    meta: {
      roomId: safeRoom,
      appVersion: APP_VERSION,
      joinUrl: getJoinUrl(safeRoom),
      createdAt: serverTimestamp(),
      createdLocalAt: Date.now()
    },
    activeModule: "signin",
    students: {},
    groups: {
      mode: "auto",
      targetSize: 4,
      targetCount: 4,
      version: Date.now(),
      groups: [],
      assignments: {}
    },
    ai: {
      title: "AI Problem Engagement",
      instructions: "Read your assigned problem variation. Make a prediction, justify it, and submit a brief response.",
      source: "",
      version: Date.now(),
      payloads: {}
    },
    html: {
      title: "Interactive HTML Sandbox",
      content: defaultSandboxHtml(),
      version: Date.now()
    },
    submissions: {}
  };
}

async function createRoom() {
  await ensureReady();
  let roomId = "";
  let exists = true;
  let attempts = 0;

  while (exists && attempts < 10) {
    roomId = generateRoomId();
    const snapshot = await get(roomRef(roomId));
    exists = snapshot.exists();
    attempts += 1;
  }

  if (exists) {
    throw new Error("Could not create a unique room ID. Try again.");
  }

  await set(roomRef(roomId), makeEmptyRoom(roomId));
  patchStore({ instructorRoomId: roomId });
  return roomId;
}

async function openOrCreateInstructorRoom(requestedRoomId) {
  await ensureReady();
  const roomId = normalizeRoomId(requestedRoomId);
  if (!roomId) return createRoom();

  const snapshot = await get(roomRef(roomId));
  if (!snapshot.exists()) {
    await set(roomRef(roomId), makeEmptyRoom(roomId));
  }
  patchStore({ instructorRoomId: roomId });
  return roomId;
}

async function setActiveModule(roomId, mode) {
  await ensureReady();
  if (!Object.prototype.hasOwnProperty.call(MODULE_LABELS, mode)) {
    throw new Error("Invalid module.");
  }
  await update(roomRef(roomId), {
    activeModule: mode,
    updatedAt: serverTimestamp()
  });
}

async function clearRoster(roomId) {
  await ensureReady();
  await remove(roomRef(roomId, "students"));
  await remove(roomRef(roomId, "submissions"));
  await update(roomRef(roomId), {
    groups: {
      mode: "auto",
      targetSize: 4,
      targetCount: 4,
      version: Date.now(),
      groups: [],
      assignments: {}
    },
    updatedAt: serverTimestamp()
  });
}

function buildGroups(studentsObject, config) {
  const roster = Object.values(studentsObject || {})
    .filter(student => student && student.id && student.name)
    .map(student => ({
      id: student.id,
      name: cleanText(student.name, 80),
      active: student.active !== false,
      lastSeen: student.lastSeen || 0
    }));

  const total = roster.length;
  if (total === 0) {
    return {
      mode: config.mode,
      targetSize: config.targetSize,
      targetCount: config.targetCount,
      version: Date.now(),
      groups: [],
      assignments: {}
    };
  }

  const shuffled = fisherYatesShuffle(roster);
  let groupCount = 1;

  if (config.mode === "size") {
    const size = Math.max(2, Math.min(12, Number(config.targetSize) || 4));
    groupCount = Math.ceil(total / size);
  } else if (config.mode === "count") {
    const requested = Math.max(1, Math.min(40, Number(config.targetCount) || 1));
    groupCount = Math.min(requested, total);
  } else {
    groupCount = calculateAutoGroupCount(total);
  }

  const groups = Array.from({ length: groupCount }, (_, index) => ({
    groupNumber: index + 1,
    label: `Group ${index + 1}`,
    members: []
  }));
  shuffled.forEach((student, index) => {
    groups[index % groupCount].members.push(student);
  });

  const assignments = {};
  groups.forEach(group => {
    group.members.forEach(member => {
      assignments[member.id] = {
        groupNumber: group.groupNumber,
        label: group.label,
        teammates: group.members.map(item => ({ id: item.id, name: item.name }))
      };
    });
  });

  return {
    mode: config.mode,
    targetSize: Math.max(2, Math.min(12, Number(config.targetSize) || 4)),
    targetCount: Math.max(1, Math.min(40, Number(config.targetCount) || 1)),
    version: Date.now(),
    groups,
    assignments
  };
}

function calculateAutoGroupCount(total) {
  if (total <= 4) return 1;
  let count = Math.ceil(total / 4);
  while (count > 1 && Math.floor(total / count) < 2) {
    count -= 1;
  }
  return Math.max(1, count);
}

async function assignGroups(roomId, config) {
  await ensureReady();
  const snapshot = await get(roomRef(roomId));
  if (!snapshot.exists()) throw new Error("Room not found.");
  const roomState = snapshot.val();
  const groupState = buildGroups(roomState.students || {}, config);
  await update(roomRef(roomId), {
    activeModule: "groups",
    groups: groupState,
    updatedAt: serverTimestamp()
  });
  return groupState;
}

function parseProblemPayloads(rawText) {
  const source = String(rawText ?? "").trim();
  if (!source) {
    return [{ title: "Problem Variation", body: "No problem payload was provided. Ask the instructor for the prompt." }];
  }

  try {
    const parsed = JSON.parse(source);
    if (Array.isArray(parsed)) {
      const normalized = parsed.map((item, index) => normalizeProblemPayload(item, index)).filter(Boolean);
      if (normalized.length > 0) return normalized;
    }
    if (parsed && typeof parsed === "object") {
      return [normalizeProblemPayload(parsed, 0)];
    }
  } catch {
    const blocks = source.includes("\n\n")
      ? source.split(/\n\s*\n/g)
      : source.split(/\n/g);
    const normalized = blocks.map((item, index) => normalizeProblemPayload(item, index)).filter(Boolean);
    if (normalized.length > 0) return normalized;
  }

  return [{ title: "Problem Variation", body: source }];
}

function normalizeProblemPayload(item, index) {
  if (item === null || item === undefined) return null;
  if (typeof item === "string") {
    const body = cleanText(item, 6000);
    if (!body) return null;
    return { title: `Variation ${index + 1}`, body };
  }
  if (typeof item === "object") {
    const title = cleanText(item.title || item.name || `Variation ${index + 1}`, 120);
    const body = cleanText(item.body || item.prompt || item.text || JSON.stringify(item, null, 2), 6000);
    return { title, body };
  }
  return { title: `Variation ${index + 1}`, body: cleanText(item, 6000) };
}

function buildProblemAssignments(studentsObject, payloads) {
  const roster = Object.values(studentsObject || {})
    .filter(student => student && student.id && student.name)
    .map(student => ({ id: student.id, name: cleanText(student.name, 80) }));

  const shuffledStudents = fisherYatesShuffle(roster);
  const safePayloads = payloads.length ? payloads : [{ title: "Problem Variation", body: "No problem payload was provided." }];
  const assignments = {};

  shuffledStudents.forEach((student, index) => {
    const base = safePayloads[index % safePayloads.length];
    assignments[student.id] = {
      studentId: student.id,
      studentName: student.name,
      title: base.title || `Variation ${index + 1}`,
      body: base.body || "No problem text was provided.",
      variationNumber: index + 1,
      variationSourceIndex: (index % safePayloads.length) + 1,
      uniqueToken: `${student.id.slice(-6)}-${Date.now().toString(36)}-${index + 1}`,
      assignedLocalAt: Date.now()
    };
  });

  return assignments;
}

async function distributeAiProblems(roomId, options) {
  await ensureReady();
  const snapshot = await get(roomRef(roomId));
  if (!snapshot.exists()) throw new Error("Room not found.");
  const roomState = snapshot.val();
  const payloads = parseProblemPayloads(options.payloadText);
  const assignments = buildProblemAssignments(roomState.students || {}, payloads);
  const version = Date.now();

  await update(roomRef(roomId), {
    activeModule: "ai",
    ai: {
      title: cleanText(options.title || "AI Problem Engagement", 120),
      instructions: cleanText(options.instructions || "Read your assigned problem and submit a brief response.", 1000),
      source: cleanText(options.payloadText || "", 12000),
      version,
      payloads: assignments
    },
    updatedAt: serverTimestamp()
  });

  return assignments;
}

async function broadcastHtml(roomId, options) {
  await ensureReady();
  const html = String(options.html ?? "").trim() || defaultSandboxHtml();
  await update(roomRef(roomId), {
    activeModule: "html",
    html: {
      title: cleanText(options.title || "Interactive HTML Sandbox", 120),
      content: html.slice(0, 60000),
      version: Date.now()
    },
    updatedAt: serverTimestamp()
  });
}

async function joinRoom(roomId, studentId, name) {
  await ensureReady();
  const safeRoom = normalizeRoomId(roomId);
  const safeName = cleanText(name, 80);
  if (!safeRoom) throw new Error("Room ID is required.");
  if (!safeName) throw new Error("Name is required.");

  const roomSnapshot = await get(roomRef(safeRoom, "meta"));
  if (!roomSnapshot.exists()) throw new Error("Room not found. Check the room ID or ask the instructor for a new link.");

  const safeStudentId = studentId || generateId("student");
  const studentReference = roomRef(safeRoom, `students/${safeStudentId}`);

  await onDisconnect(studentReference).update({
    active: false,
    lastSeen: serverTimestamp()
  });

  await update(studentReference, {
    id: safeStudentId,
    name: safeName,
    active: true,
    joinedAt: serverTimestamp(),
    lastSeen: serverTimestamp(),
    client: navigator.userAgent.slice(0, 180)
  });

  const previousStore = readStore();
  const roomChanged = previousStore.roomId !== safeRoom || previousStore.studentId !== safeStudentId;
  patchStore({
    roomId: safeRoom,
    studentId: safeStudentId,
    name: safeName,
    assignedGroup: roomChanged ? null : previousStore.assignedGroup || null,
    aiProblem: roomChanged ? null : previousStore.aiProblem || null
  });
  currentRoomId = safeRoom;
  currentStudentId = safeStudentId;
  currentStudentName = safeName;
  return { roomId: safeRoom, studentId: safeStudentId, name: safeName };
}

async function markStudentSeen(roomId, studentId) {
  if (!configured || !database || !roomId || !studentId) return;
  try {
    await authReadyPromise;
    await update(roomRef(roomId, `students/${studentId}`), {
      active: true,
      lastSeen: serverTimestamp()
    });
  } catch {
    undefined;
  }
}

async function submitResponse(roomId, studentId, moduleName, responseText) {
  await ensureReady();
  const safeRoom = normalizeRoomId(roomId);
  const safeModule = String(moduleName || "general").replace(/[^a-z0-9_-]/gi, "").toLowerCase() || "general";
  const safeText = cleanText(responseText, 10000);
  if (!safeText) throw new Error("Enter a response before submitting.");

  await set(roomRef(safeRoom, `submissions/${safeModule}/${studentId}`), {
    studentId,
    studentName: currentStudentName || readStore().name || "Student",
    module: safeModule,
    response: safeText,
    submittedAt: serverTimestamp(),
    submittedLocalAt: Date.now()
  });
}

function listenToRoom(roomId, callback, errorCallback) {
  assertReady();
  if (activeRoomUnsubscribe) activeRoomUnsubscribe();
  activeRoomUnsubscribe = onValue(
    roomRef(roomId),
    snapshot => {
      latestRoomState = snapshot.val();
      callback(latestRoomState);
    },
    error => {
      if (errorCallback) errorCallback(error);
    }
  );
  return activeRoomUnsubscribe;
}

function listenToConnection(callback) {
  if (!configured || !database) {
    callback(false, "Not configured");
    return () => undefined;
  }
  if (connectionUnsubscribe) connectionUnsubscribe();
  connectionUnsubscribe = onValue(ref(database, ".info/connected"), snapshot => {
    callback(Boolean(snapshot.val()), snapshot.val() ? "Connected" : "Offline");
  });
  return connectionUnsubscribe;
}

async function reconnectNow() {
  if (!database) return;
  try {
    await goOnline(database);
  } catch {
    undefined;
  }
}

function assertReady() {
  if (!configured) throw new Error("Firebase config is not set in app.js.");
  if (!database) throw new Error("Firebase is not initialized.");
}

async function ensureReady() {
  assertReady();
  await authReadyPromise;
}

const PROBLEM_MANIFEST_PATH = "problems/manifest.json";

function insertProblemLibraryUi() {
  const htmlInput = document.getElementById("htmlInput");
  const htmlTitle = document.getElementById("htmlTitleInput");
  if (!htmlInput || !htmlTitle || document.getElementById("problemLibraryBlock")) return;

  const block = document.createElement("div");
  block.id = "problemLibraryBlock";
  block.className = "problem-library-block";
  block.innerHTML = `
    <label for="problemLibrarySelect">Problem library</label>
    <div class="inline-controls">
      <select id="problemLibrarySelect" aria-label="Choose an HTML problem from the repository folder">
        <option value="">Loading problem library...</option>
      </select>
      <button class="secondary-button" id="loadProblemFromLibraryBtn" type="button">Load selected problem</button>
    </div>
    <p class="form-message" id="problemLibraryMessage" role="status" aria-live="polite"></p>
  `;
  const titleLabel = document.querySelector("label[for='htmlTitleInput']");
  if (titleLabel && titleLabel.parentNode) {
    titleLabel.parentNode.insertBefore(block, titleLabel);
  } else {
    htmlInput.parentNode.insertBefore(block, htmlInput);
  }

  loadProblemLibraryOptions();

  document.getElementById("loadProblemFromLibraryBtn")?.addEventListener("click", async () => {
    const select = document.getElementById("problemLibrarySelect");
    const option = select?.selectedOptions?.[0];
    const file = select?.value || "";
    const title = option?.dataset?.title || "Interactive HTML Sandbox";
    const message = document.getElementById("problemLibraryMessage");

    if (!file) {
      setMessage(message, "Choose a problem first.", "error");
      return;
    }
    try {
      const response = await fetch(file, { cache: "no-store" });
      if (!response.ok) throw new Error(`Could not load ${file}.`);
      const content = await response.text();
      htmlTitle.value = title;
      htmlTitle.dataset.userEdited = "true";
      htmlInput.value = content;
      htmlInput.dataset.userEdited = "true";
      setMessage(message, `Loaded: ${title}. Use Preview or Broadcast HTML and start.`, "success");
      const frame = document.getElementById("htmlPreviewFrame");
      if (frame) frame.srcdoc = makeSandboxDocument(content);
    } catch (error) {
      setMessage(message, error.message, "error");
    }
  });
}

async function loadProblemLibraryOptions() {
  const select = document.getElementById("problemLibrarySelect");
  const message = document.getElementById("problemLibraryMessage");
  if (!select) return;

  try {
    const response = await fetch(PROBLEM_MANIFEST_PATH, { cache: "no-store" });
    if (!response.ok) throw new Error("No problems/manifest.json file found yet.");
    const manifest = await response.json();
    const problems = normalizeProblemManifest(manifest);
    if (!problems.length) throw new Error("The problem library manifest is empty.");

    select.innerHTML = `<option value="">Choose a problem...</option>` + problems.map(problem => {
      return `<option value="${escapeHtml(problem.file)}" data-title="${escapeHtml(problem.title)}">${escapeHtml(problem.title)}</option>`;
    }).join("");
    setMessage(message, `${problems.length} problem${problems.length === 1 ? "" : "s"} available.`, "success");
  } catch (error) {
    select.innerHTML = `<option value="">No problem library found</option>`;
    setMessage(message, `${error.message} You can still paste HTML directly below.`, "neutral");
  }
}

function normalizeProblemManifest(manifest) {
  const list = Array.isArray(manifest) ? manifest : Array.isArray(manifest?.problems) ? manifest.problems : [];
  return list.map((item, index) => {
    const title = cleanText(item?.title || item?.name || `Problem ${index + 1}`, 120);
    const file = normalizeProblemFilePath(item?.file || item?.path || "");
    if (!file) return null;
    return { title, file };
  }).filter(Boolean);
}

function normalizeProblemFilePath(path) {
  const raw = String(path || "").trim().replaceAll("\\", "/");
  if (!raw || raw.includes("..") || raw.startsWith("/") || /^[a-z][a-z0-9+.-]*:/i.test(raw)) return "";
  return raw.startsWith("problems/") ? raw : `problems/${raw}`;
}

function defaultSandboxHtml() {
  return `<section style="font-family: system-ui, -apple-system, Segoe UI, sans-serif; line-height: 1.45; padding: 1rem; color: #1b1b1b;">
  <h2 style="margin-top: 0; color: #F76902;">What-if Slider</h2>
  <p>Move the slider and write a local observation. This runs independently on each student device.</p>
  <label for="sandboxSlider" style="font-weight: 700; display: block; margin-top: 1rem;">Input value</label>
  <input id="sandboxSlider" type="range" min="0" max="100" value="50" oninput="document.getElementById('sandboxReadout').textContent = this.value" style="width: 100%;">
  <p>Current value: <strong id="sandboxReadout">50</strong></p>
  <label for="sandboxNote" style="font-weight: 700; display: block; margin-top: 1rem;">Local note</label>
  <textarea id="sandboxNote" rows="4" style="width: 100%; box-sizing: border-box; border: 1px solid #7C878E; border-radius: 10px; padding: .75rem;">My observation is...</textarea>
</section>`;
}

function makeSandboxDocument(snippet) {
  const content = String(snippet || defaultSandboxHtml());
  if (/<html[\s>]/i.test(content)) return content;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  html, body { margin: 0; min-height: 100%; background: #ffffff; }
  * { box-sizing: border-box; }
  button, input, select, textarea { font: inherit; }
  :focus-visible { outline: 3px solid #F6BE00; outline-offset: 2px; }
</style>
</head>
<body>${content}</body>
</html>`;
}

function setStatus(element, online, text) {
  if (!element) return;
  element.textContent = text || (online ? "Connected" : "Offline");
  element.classList.toggle("is-online", Boolean(online));
  element.classList.toggle("is-offline", !online);
}

function setMessage(element, text, kind = "neutral") {
  if (!element) return;
  element.textContent = text || "";
  element.dataset.kind = kind;
}

function showOnly(ids, activeId) {
  ids.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.classList.toggle("hidden", id !== activeId);
  });
}

function renderQr(joinUrl) {
  const canvas = document.getElementById("qrCanvas");
  const fallback = document.getElementById("qrFallback");
  if (!canvas || !joinUrl) return;

  if (window.QRCode && typeof window.QRCode.toCanvas === "function") {
    window.QRCode.toCanvas(canvas, joinUrl, {
      width: 230,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#FFFFFF"
      }
    }, error => {
      if (fallback) {
        fallback.textContent = error ? "QR code could not be generated. Use the join link." : "Scan to join.";
      }
    });
  } else if (fallback) {
    fallback.textContent = "QR library unavailable. Use the join link.";
  }
}

function renderInstructorRoom(roomState) {
  if (!roomState) return;
  const roomId = roomState.meta?.roomId || currentRoomId;
  const joinUrl = roomState.meta?.joinUrl || getJoinUrl(roomId);
  const activeMode = roomState.activeModule || "signin";
  const students = getRosterStudents(roomState);

  document.getElementById("roomIdText").textContent = roomId || "—";
  document.getElementById("joinLink").value = joinUrl;
  document.getElementById("rosterCount").textContent = String(students.length);
  document.getElementById("onlineCount").textContent = String(students.filter(student => student.active !== false).length);
  document.getElementById("activeModuleBanner").textContent = `Active: ${MODULE_LABELS[activeMode] || activeMode}`;

  document.querySelectorAll(".module-button").forEach(button => {
    const selected = button.dataset.mode === activeMode;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });

  renderQr(joinUrl);
  renderRoster(students);
  renderGroupSummary(roomState.groups || {});
  renderSubmissionList(roomState.submissions || {}, roomState.students || {});

  const htmlInput = document.getElementById("htmlInput");
  const htmlTitle = document.getElementById("htmlTitleInput");
  if (htmlInput && !htmlInput.dataset.userEdited && roomState.html?.content) htmlInput.value = roomState.html.content;
  if (htmlTitle && !htmlTitle.dataset.userEdited && roomState.html?.title) htmlTitle.value = roomState.html.title;
}

function renderRoster(students) {
  const grid = document.getElementById("rosterGrid");
  if (!grid) return;
  if (students.length === 0) {
    grid.innerHTML = `<div class="empty-state">No students signed in yet.</div>`;
    return;
  }

  grid.innerHTML = students.map(student => {
    const active = student.active !== false;
    return `<article class="student-chip ${active ? "active" : "inactive"}">
      <strong>${escapeHtml(student.name)}</strong>
      <span>${active ? "Connected" : "Disconnected"}</span>
      <small>Last seen: ${formatTime(student.lastSeen)}</small>
    </article>`;
  }).join("");
}

function renderGroupSummary(groupState) {
  const container = document.getElementById("groupSummary");
  if (!container) return;
  const groups = groupState.groups || [];
  if (!groups.length) {
    container.innerHTML = `<div class="empty-state">No groups assigned yet.</div>`;
    return;
  }

  container.innerHTML = groups.map(group => {
    const members = (group.members || []).map(member => `<li>${escapeHtml(member.name)}</li>`).join("");
    return `<article class="group-card">
      <h3>${escapeHtml(group.label || `Group ${group.groupNumber}`)}</h3>
      <ul>${members}</ul>
    </article>`;
  }).join("");
}

function renderSubmissionList(submissions, studentsObject) {
  const container = document.getElementById("submissionList");
  if (!container) return;

  const rows = [];
  Object.entries(submissions || {}).forEach(([moduleName, moduleSubmissions]) => {
    Object.values(moduleSubmissions || {}).forEach(submission => {
      if (submission && submission.response) {
        const studentName = studentsObject?.[submission.studentId]?.name || submission.studentName || "Student";
        rows.push({ ...submission, moduleName, studentName });
      }
    });
  });

  rows.sort((a, b) => (b.submittedLocalAt || 0) - (a.submittedLocalAt || 0));

  if (!rows.length) {
    container.innerHTML = `<div class="empty-state">No submissions yet.</div>`;
    return;
  }

  container.innerHTML = rows.slice(0, 20).map(row => `<article class="submission-item">
    <div><strong>${escapeHtml(row.studentName)}</strong> <span>${escapeHtml(row.moduleName)}</span></div>
    <p>${escapeHtml(row.response)}</p>
    <small>${formatTime(row.submittedAt || row.submittedLocalAt)}</small>
  </article>`).join("");
}

async function bootInstructor() {
  insertProblemLibraryUi();
  const status = initializeFirebase();
  const statusEl = document.getElementById("connectionStatus");
  const htmlInput = document.getElementById("htmlInput");
  if (htmlInput && !htmlInput.value.trim()) htmlInput.value = defaultSandboxHtml();

  if (!status.ok) {
    setStatus(statusEl, false, status.message);
    document.getElementById("activeModuleBanner").textContent = status.message;
    return;
  }

  listenToConnection((online, text) => setStatus(statusEl, online, text));

  const stored = readStore();
  const requested = normalizeRoomId(getUrlParam("room") || stored.instructorRoomId || "");

  try {
    currentRoomId = await openOrCreateInstructorRoom(requested);
    listenToRoom(currentRoomId, renderInstructorRoom, error => setStatus(statusEl, false, error.message));
  } catch (error) {
    setStatus(statusEl, false, error.message);
  }

  bindInstructorEvents();
}

function bindInstructorEvents() {
  document.getElementById("newRoomBtn")?.addEventListener("click", async () => {
    try {
      currentRoomId = await createRoom();
      listenToRoom(currentRoomId, renderInstructorRoom);
      history.replaceState(null, "", `?room=${currentRoomId}`);
    } catch (error) {
      alert(error.message);
    }
  });

  document.getElementById("copyJoinLinkBtn")?.addEventListener("click", async () => {
    const link = document.getElementById("joinLink")?.value || "";
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setMessage(document.getElementById("qrFallback"), "Join link copied.", "success");
    } catch {
      window.prompt("Copy this join link:", link);
    }
  });
  document.getElementById("openRoomForm")?.addEventListener("submit", async event => {
    event.preventDefault();
    const requested = normalizeRoomId(document.getElementById("existingRoomInput")?.value || "");
    if (!requested) return;
    try {
      currentRoomId = await openOrCreateInstructorRoom(requested);
      listenToRoom(currentRoomId, renderInstructorRoom);
      history.replaceState(null, "", `?room=${currentRoomId}`);
    } catch (error) {
      alert(error.message);
    }
  });

  document.querySelectorAll(".module-button").forEach(button => {
    button.addEventListener("click", async () => {
      if (!currentRoomId) return;
      try {
        await setActiveModule(currentRoomId, button.dataset.mode);
      } catch (error) {
        alert(error.message);
      }
    });
  });

  document.getElementById("clearRosterBtn")?.addEventListener("click", async () => {
    if (!currentRoomId) return;
    const confirmed = window.confirm("Clear the roster, group assignments, and submissions for this room?");
    if (!confirmed) return;
    try {
      await clearRoster(currentRoomId);
    } catch (error) {
      alert(error.message);
    }
  });

  document.getElementById("groupModeSelect")?.addEventListener("change", event => {
    const mode = event.target.value;
    document.getElementById("groupSizeBlock")?.classList.toggle("hidden", mode !== "size");
    document.getElementById("groupCountBlock")?.classList.toggle("hidden", mode !== "count");
  });

  document.getElementById("assignGroupsBtn")?.addEventListener("click", async () => {
    if (!currentRoomId) return;
    const config = {
      mode: document.getElementById("groupModeSelect")?.value || "auto",
      targetSize: Number(document.getElementById("groupSizeInput")?.value || 4),
      targetCount: Number(document.getElementById("groupCountInput")?.value || 5)
    };
    try {
      await assignGroups(currentRoomId, config);
    } catch (error) {
      alert(error.message);
    }
  });

  document.getElementById("startAiBtn")?.addEventListener("click", async () => {
    if (!currentRoomId) return;
    try {
      await distributeAiProblems(currentRoomId, {
        title: document.getElementById("aiTitleInput")?.value,
        instructions: document.getElementById("aiInstructionsInput")?.value,
        payloadText: document.getElementById("aiPayloadInput")?.value
      });
    } catch (error) {
      alert(error.message);
    }
  });

  document.getElementById("loadSampleHtmlBtn")?.addEventListener("click", () => {
    const htmlInput = document.getElementById("htmlInput");
    if (htmlInput) {
      htmlInput.value = defaultSandboxHtml();
      htmlInput.dataset.userEdited = "true";
    }
  });

  document.getElementById("htmlInput")?.addEventListener("input", event => {
    event.target.dataset.userEdited = "true";
  });

  document.getElementById("htmlTitleInput")?.addEventListener("input", event => {
    event.target.dataset.userEdited = "true";
  });
  document.getElementById("previewHtmlBtn")?.addEventListener("click", () => {
    const frame = document.getElementById("htmlPreviewFrame");
    const html = document.getElementById("htmlInput")?.value || defaultSandboxHtml();
    if (frame) frame.srcdoc = makeSandboxDocument(html);
  });

  document.getElementById("broadcastHtmlBtn")?.addEventListener("click", async () => {
    if (!currentRoomId) return;
    try {
      await broadcastHtml(currentRoomId, {
        title: document.getElementById("htmlTitleInput")?.value,
        html: document.getElementById("htmlInput")?.value
      });
    } catch (error) {
      alert(error.message);
    }
  });
}

async function bootStudent() {
  const status = initializeFirebase();
  const statusEl = document.getElementById("studentConnectionStatus");
  const stored = readStore();
  const requestedRoom = normalizeRoomId(getUrlParam("room") || stored.roomId || "");
  const storedStudentId = stored.studentId || generateId("student");
  const storedName = stored.name || "";

  document.getElementById("studentRoomInput").value = requestedRoom;
  document.getElementById("studentNameInput").value = storedName;
  currentStudentId = storedStudentId;

  if (!status.ok) {
    setStatus(statusEl, false, status.message);
    setMessage(document.getElementById("joinMessage"), status.message, "error");
    return;
  }

  listenToConnection((online, text) => setStatus(statusEl, online, text));
  bindStudentEvents();

  if (requestedRoom && storedName) {
    try {
      await startStudentSession(requestedRoom, storedStudentId, storedName);
    } catch (error) {
      setMessage(document.getElementById("joinMessage"), error.message, "error");
    }
  }

  window.addEventListener("online", async () => {
    await reconnectNow();
    const cache = readStore();
    if (cache.roomId && cache.studentId && cache.name) {
      await markStudentSeen(cache.roomId, cache.studentId);
    }
  });

  document.addEventListener("visibilitychange", async () => {
    if (document.visibilityState === "visible") {
      await reconnectNow();
      const cache = readStore();
      if (cache.roomId && cache.studentId && cache.name) {
        await markStudentSeen(cache.roomId, cache.studentId);
      }
    }
  });
}

function bindStudentEvents() {
  document.getElementById("studentJoinForm")?.addEventListener("submit", async event => {
    event.preventDefault();
    const name = document.getElementById("studentNameInput")?.value || "";
    const room = document.getElementById("studentRoomInput")?.value || "";
    const studentId = currentStudentId || readStore().studentId || generateId("student");
    try {
      await startStudentSession(room, studentId, name);
    } catch (error) {
      setMessage(document.getElementById("joinMessage"), error.message, "error");
    }
  });

  document.getElementById("submitAiAnswerBtn")?.addEventListener("click", async () => {
    try {
      await submitResponse(currentRoomId, currentStudentId, "ai", document.getElementById("aiAnswerInput")?.value || "");
      setMessage(document.getElementById("aiSubmitMessage"), "Response submitted.", "success");
    } catch (error) {
      setMessage(document.getElementById("aiSubmitMessage"), error.message, "error");
    }
  });

  document.getElementById("submitHtmlResponseBtn")?.addEventListener("click", async () => {
    try {
      await submitResponse(currentRoomId, currentStudentId, "html", document.getElementById("htmlResponseInput")?.value || "");
      setMessage(document.getElementById("htmlSubmitMessage"), "Observation submitted.", "success");
    } catch (error) {
      setMessage(document.getElementById("htmlSubmitMessage"), error.message, "error");
    }
  });
}

async function startStudentSession(room, studentId, name) {
  const session = await joinRoom(room, studentId, name);
  currentRoomId = session.roomId;
  currentStudentId = session.studentId;
  currentStudentName = session.name;
  document.getElementById("joinPanel")?.classList.add("hidden");
  document.getElementById("studentApp")?.classList.remove("hidden");
  document.getElementById("studentNameLabel").textContent = session.name;
  document.getElementById("studentRoomLabel").textContent = session.roomId;
  document.getElementById("studentHeaderTitle").textContent = `Room ${session.roomId}`;
  setMessage(document.getElementById("joinMessage"), "", "neutral");

  listenToRoom(session.roomId, renderStudentRoom, error => {
    setMessage(document.getElementById("joinMessage"), error.message, "error");
  });
}

function renderStudentRoom(roomState) {
  if (!roomState) return;
  const activeMode = roomState.activeModule || "signin";
  document.getElementById("studentModuleLabel").textContent = MODULE_LABELS[activeMode] || activeMode;

  if (activeMode === "signin") {
    showOnly(["waitingView", "signinView", "aiView", "groupsView", "htmlView"], "signinView");
    return;
  }

  if (activeMode === "ai") {
    renderStudentAi(roomState.ai || {});
    showOnly(["waitingView", "signinView", "aiView", "groupsView", "htmlView"], "aiView");
    return;
  }

  if (activeMode === "groups") {
    renderStudentGroups(roomState.groups || {});
    showOnly(["waitingView", "signinView", "aiView", "groupsView", "htmlView"], "groupsView");
    return;
  }

  if (activeMode === "html") {
    renderStudentHtml(roomState.html || {});
    showOnly(["waitingView", "signinView", "aiView", "groupsView", "htmlView"], "htmlView");
    return;
  }

  showOnly(["waitingView", "signinView", "aiView", "groupsView", "htmlView"], "waitingView");
}

function renderStudentAi(aiState) {
  const cached = readStore();
  const payload = aiState.payloads?.[currentStudentId] || cached.aiProblem || null;
  document.getElementById("aiStudentTitle").textContent = aiState.title || "AI Problem Engagement";
  document.getElementById("aiStudentInstructions").textContent = aiState.instructions || "Read your assigned problem and submit a brief response.";

  const card = document.getElementById("studentProblemCard");
  if (!payload) {
    card.innerHTML = `<h3>No problem assigned yet</h3><p>Ask the instructor to distribute problem payloads.</p>`;
    return;
  }

  patchStore({ aiProblem: payload });
  card.innerHTML = `<div class="problem-meta">Variation ${escapeHtml(payload.variationNumber || "")}</div>
    <h3>${escapeHtml(payload.title || "Problem Variation")}</h3>
    <p>${escapeHtml(payload.body || "No problem text provided.")}</p>
    <small>Assignment token: ${escapeHtml(payload.uniqueToken || "local")}</small>`;
}

function renderStudentGroups(groupState) {
  const cached = readStore();
  const assignment = groupState.assignments?.[currentStudentId] || cached.assignedGroup || null;
  const groupNumber = document.getElementById("studentGroupNumber");
  const teammateList = document.getElementById("studentTeammatesList");

  if (!assignment) {
    groupNumber.textContent = "Not assigned yet";
    teammateList.innerHTML = `<li>Waiting for the instructor to assign groups.</li>`;
    return;
  }

  patchStore({ assignedGroup: assignment });
  groupNumber.textContent = assignment.label || `Group ${assignment.groupNumber}`;
  const teammates = (assignment.teammates || []).filter(person => person.id !== currentStudentId);
  teammateList.innerHTML = teammates.length
    ? teammates.map(person => `<li>${escapeHtml(person.name)}</li>`).join("")
    : `<li>You are currently working individually.</li>`;
}

function renderStudentHtml(htmlState) {
  document.getElementById("htmlStudentTitle").textContent = htmlState.title || "Interactive HTML Sandbox";
  const frame = document.getElementById("studentHtmlFrame");
  const version = htmlState.version || 0;
  if (frame && lastStudentHtmlVersion !== version) {
    frame.srcdoc = makeSandboxDocument(htmlState.content || defaultSandboxHtml());
    lastStudentHtmlVersion = version;
  }
}

window.RITClassroom = {
  createRoom,
  setActiveModule,
  assignGroups,
  distributeAiProblems,
  broadcastHtml,
  joinRoom,
  submitResponse,
  fisherYatesShuffle,
  defaultSandboxHtml
};

window.addEventListener("DOMContentLoaded", () => {
  const page = document.body?.dataset?.page;
  if (page === "instructor") bootInstructor();
  if (page === "student") bootStudent();
});
