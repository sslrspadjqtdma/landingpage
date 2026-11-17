// ===== 스크롤 등장 효과 (카드·제목이 화면에 들어오면 등장, 화면 아래로 내려가면 숨김) =====
{
  const targets = document.querySelectorAll(".sl-fade, .sl-timeline-item");

  if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("sl-reveal-on");

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove("is-visible");
          }
        }),
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
  }
}

// ===== 연도 구간 메뉴: 지금 보고 있는 구간 강조 =====
{
  const navLinks = document.querySelectorAll(".hp-era-nav a");
  const eras = document.querySelectorAll(".hp-era");

  const setActive = (id) =>
    navLinks.forEach((link) =>
      link.classList.toggle("is-active", link.hash === `#${id}`),
    );

  if (eras.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );

    eras.forEach((era) => observer.observe(era));
    setActive(eras[0].id);
  }
}
