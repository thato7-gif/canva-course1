(function () {
  document.addEventListener("DOMContentLoaded", () => {
    // Inject floating background blobs
    if (!document.querySelector(".floating-shapes")) {
      const wrap = document.createElement("div");
      wrap.className = "floating-shapes";
      wrap.innerHTML = `
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
      `;
      document.body.insertBefore(wrap, document.body.firstChild);
    }

    // Auto-tag sections for reveal
    const targets = document.querySelectorAll(
      ".card, .section-title, .js-quiz, .design-textarea, .cta-ikworx, .table-responsive, .alert, .tab-collapse, .type-preview, .swatch"
    );
    targets.forEach(t => t.classList.add("reveal"));

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      targets.forEach(t => io.observe(t));
    } else {
      document.documentElement.classList.add("no-io");
    }

    // Stagger
    document.querySelectorAll(".reveal").forEach((el, i) => {
      el.style.transitionDelay = (i % 6) * 0.06 + "s";
    });
  });
})();