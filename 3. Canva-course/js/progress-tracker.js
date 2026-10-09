(function () {
  const SESSIONS = ["session1", "session2", "session3", "session4", "session5", "wrapup"];
  const STORAGE_KEY = "canvaCourseProgress";

  function getProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveProgress(p) { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }

  function currentSessionId() {
    const path = window.location.pathname.split("/").pop().replace(".html", "");
    return SESSIONS.includes(path) ? path : null;
  }

  function renderProgressBar() {
    const progress = getProgress();
    const done = SESSIONS.filter(s => progress[s]).length;
    const pct = Math.round((done / SESSIONS.length) * 100);

    const bar = document.createElement("div");
    bar.className = "progress-tracker-bar";
    bar.innerHTML = `
      <div class="container d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div class="d-flex align-items-center gap-2 flex-grow-1">
          <span class="fw-bold small">📊 Course Progress</span>
          <div class="progress flex-grow-1" style="height:10px; max-width:400px;">
            <div class="progress-bar" role="progressbar"
                 style="width:${pct}%" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <span class="small fw-semibold">${done}/${SESSIONS.length} (${pct}%)</span>
        </div>
        <button class="btn btn-sm btn-outline-light reset-progress-btn">↺ Reset</button>
      </div>
    `;
    document.body.insertBefore(bar, document.body.firstChild);

    bar.querySelector(".reset-progress-btn").addEventListener("click", () => {
      if (confirm("Reset all progress? This cannot be undone.")) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
      }
    });
  }

  function renderMarkCompleteButton() {
    const sid = currentSessionId();
    if (!sid) return;
    const container = document.getElementById("mark-complete-container");
    if (!container) return;

    const progress = getProgress();
    const isDone = !!progress[sid];

    container.innerHTML = `
      <button class="btn mark-complete-btn ${isDone ? "btn-success" : "btn-outline-success"}">
        ${isDone ? "✅ Completed — click to unmark" : "☐ Mark this session as complete"}
      </button>
    `;

    container.querySelector("button").addEventListener("click", () => {
      const p = getProgress();
      if (p[sid]) delete p[sid];
      else p[sid] = Date.now();
      saveProgress(p);
      location.reload();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderProgressBar();
    renderMarkCompleteButton();
  });
})();