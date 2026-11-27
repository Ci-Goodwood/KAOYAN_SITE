let observer = null;

export function refreshReveal() {
  if (typeof document === "undefined") return;
  const targets = Array.from(document.querySelectorAll(".reveal:not(.is-in)"));
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-in"));
    return;
  }

  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
  }

  targets.forEach((el) => observer.observe(el));
}

export function animateNumber(value, duration, onUpdate) {
  const target = Number(value) || 0;
  if (target === 0) {
    onUpdate(0);
    return;
  }
  const start = performance.now();
  const step = (now) => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    onUpdate(Math.round(target * eased));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
