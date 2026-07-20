(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) return;

  document.body.classList.add("motion-enabled");

  const revealItems = document.querySelectorAll(
    ".section:not(#featured) .card, .section:not(#featured) .project-shot"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("motion-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -36px"
  });

  revealItems.forEach((item, index) => {
    item.classList.add("motion-reveal");
    item.style.setProperty("--reveal-delay", `${(index % 3) * 80}ms`);
    observer.observe(item);
  });
})();
