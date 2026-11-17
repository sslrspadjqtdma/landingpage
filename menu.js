// ===== 소개 페이지 공통 헤더: 모바일 햄버거 메뉴 + 메인과 같은 스크롤 효과 =====
{
  const root = document.documentElement;
  const header = document.querySelector(".header");
  const pageShell = document.querySelector(".page-shell");
  const menuToggle = document.querySelector("#menu-toggle");
  const menuLinks = document.querySelectorAll("#primary-navigation a");
  const SHRINK_DISTANCE = 400;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // --- 모바일 메뉴 ---
  const setMenu = (open) => {
    menuToggle.checked = open;
    menuToggle.setAttribute("aria-expanded", String(open));
    if (open) root.classList.remove("header-hidden");
  };

  if (menuToggle) {
    menuToggle.addEventListener("change", () => setMenu(menuToggle.checked));
    menuLinks.forEach((link) =>
      link.addEventListener("click", () => setMenu(false)),
    );
  }

  // --- 400px 이후: 내리면 헤더 숨김, 올리면 다시 등장 (메뉴가 열려 있으면 숨기지 않음) ---
  let lastY = window.scrollY;
  const updateHeaderHide = (y) => {
    if (y <= SHRINK_DISTANCE || menuToggle?.checked) {
      root.classList.remove("header-hidden");
    } else if (Math.abs(y - lastY) > 4) {
      root.classList.toggle("header-hidden", y > lastY);
    } else {
      return; // 아주 작은 움직임은 무시해서 깜빡임 방지
    }
    lastY = y;
  };

  // --- 스크롤: 흰색 전환 + 화면 가득 → 페이지 콘텐츠 폭으로 축소, 라운드 0 → 26px ---
  const updateScroll = () => {
    const y = window.scrollY;
    root.classList.toggle("header-scrolled", y > 40);
    updateHeaderHide(y);
    if (!header || !pageShell) return;

    const progress = reduceMotion
      ? Number(y > 40)
      : Math.min(y / SHRINK_DISTANCE, 1);
    const fullWidth = root.clientWidth;
    const minWidth = pageShell.clientWidth;
    const width = fullWidth - (fullWidth - minWidth) * progress;

    header.style.setProperty("--header-width", `${width.toFixed(1)}px`);
    header.style.setProperty(
      "--header-radius",
      `${(26 * progress).toFixed(1)}px`,
    );
  };

  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("resize", updateScroll);
}
