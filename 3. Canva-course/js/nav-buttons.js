(function () {
  const ORDER = [
    { id: "index",    title: "Overview",           file: "index.html"    },
    { id: "schedule", title: "Schedule",           file: "schedule.html" },
    { id: "session1", title: "Design Foundations", file: "session1.html" },
    { id: "session2", title: "Canva Basics",       file: "session2.html" },
    { id: "session3", title: "Colour & Type",      file: "session3.html" },
    { id: "session4", title: "Design a Poster",    file: "session4.html" },
    { id: "session5", title: "Logo & Social Kit",  file: "session5.html" },
    { id: "wrapup",   title: "Wrap-up",            file: "wrapup.html"   }
  ];

  document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("nav-buttons-container");
    if (!container) return;

    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    const idx = ORDER.findIndex(o => o.file === currentFile);
    if (idx === -1) return;

    const prev = ORDER[idx - 1];
    const next = ORDER[idx + 1];

    container.innerHTML = `
      <div class="d-flex justify-content-between align-items-center my-5 flex-wrap gap-2">
        ${prev ? `<a href="${prev.file}" class="btn btn-outline-secondary btn-nav">← Previous: ${prev.title}</a>` : `<span></span>`}
        ${next ? `<a href="${next.file}" class="btn btn-primary btn-nav">Next: ${next.title} →</a>` : `<span></span>`}
      </div>
    `;
  });
})();