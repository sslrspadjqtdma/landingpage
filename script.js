// ===== 슬라이더 =====
new Swiper(".hero-swiper", {
  loop: true,
  speed: 600,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".hero-swiper .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".hero-swiper .swiper-button-next",
    prevEl: ".hero-swiper .swiper-button-prev",
  },
});

new Swiper(".cards-swiper", {
  slidesPerView: 1.15,
  spaceBetween: 12,
  grabCursor: true,
  keyboard: { enabled: true, onlyInViewport: true },
  // 점 페이지 표시 대신 드래그할 수 있는 스크롤바
  scrollbar: {
    el: ".cards-scrollbar",
    draggable: true,
    hide: false,
  },
  breakpoints: {
    681: { slidesPerView: 1.7, spaceBetween: 18 },
    1101: { slidesPerView: 3.2, spaceBetween: 22 },
  },
});

// ===== 스크롤 등장 효과 (유튜브 영상은 카드가 보일 때 불러옴) =====
{
  document.documentElement.classList.add("reveal-on");
  const revealGroups = document.querySelectorAll(
    ".cards-swiper, .apply-section",
  );

  revealGroups.forEach((group) =>
    group.querySelectorAll(".reveal").forEach((item, i) => {
      item.style.setProperty("--reveal-delay", `${i * 110}ms`);
    }),
  );

  const updateReveal = () => {
    const vh = window.innerHeight;
    revealGroups.forEach((group) => {
      const { top, bottom } = group.getBoundingClientRect();
      const items = group.querySelectorAll(".reveal");
      if (top < vh * 0.85 && bottom > 0) {
        items.forEach((item) => item.classList.add("is-visible"));
        group.querySelectorAll("iframe[data-src]").forEach((frame) => {
          frame.src = frame.dataset.src;
          frame.removeAttribute("data-src");
        });
      } else if (top >= vh) {
        items.forEach((item) => item.classList.remove("is-visible"));
      }
    });
  };

  window.addEventListener("scroll", updateReveal, { passive: true });
  window.addEventListener("resize", updateReveal);
  updateReveal();
}

// ===== 스크롤: 히어로·헤더 함께 축소 + 헤더 흰색 전환 =====
{
  const root = document.documentElement;
  const header = document.querySelector(".landing-header");
  const heroBox = document.querySelector(".hero-swiper");
  const heroPin = document.querySelector(".hero-pin");
  const cardSection = document.querySelector(".feature-section");
  const SHRINK_DISTANCE = 180;
  const isWide = window.matchMedia("(min-width: 681px)");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // 스크롤바를 뺀 실제 화면 폭 (100vw는 스크롤바까지 포함해 옆 슬라이드가 비침)
  const updatePageWidth = () => {
    root.style.setProperty("--page-width", `${root.clientWidth}px`);
  };

  // 히어로가 다 줄어든 뒤: 아래로 내리면 헤더 숨김, 위로 올리면 다시 보임 (메뉴가 열려 있으면 숨기지 않음)
  const menuToggle = document.querySelector("#menu-toggle");
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

  const updateScroll = () => {
    const y = window.scrollY;
    root.classList.toggle("header-scrolled", y > 40);
    updateHeaderHide(y);
    if (!heroBox || !cardSection) return;

    // 지정된 스크롤 거리 동안 화면 가득에서 카드 섹션 폭까지 축소
    // (동작 줄이기 설정이면 단계 없이 바로 전환)
    const progress = reduceMotion ? Number(y > 40) : Math.min(y / SHRINK_DISTANCE, 1);
    const fullWidth = root.clientWidth;
    const minWidth = cardSection.offsetWidth;
    const width = fullWidth - (fullWidth - minWidth) * progress;

    // PC·태블릿: 줄어드는 동안 헤더 높이만큼 내려와 다 줄면 헤더 바로 아래에 위치
    const headerHeight = isWide.matches && header ? header.offsetHeight : 0;
    heroBox.style.setProperty(
      "--hero-shift",
      `${(headerHeight * progress).toFixed(1)}px`,
    );

    // 히어로가 줄어든 만큼 아래 내용을 끌어올려 히어로 밑에 큰 빈칸이 생기지 않게 함
    const shrunkHeight =
      heroBox.offsetHeight * (1 - minWidth / fullWidth) - headerHeight;
    heroPin?.style.setProperty(
      "--hero-pin-pull",
      `${Math.max(0, Math.min(shrunkHeight, SHRINK_DISTANCE)).toFixed(1)}px`,
    );

    heroBox.style.setProperty("--hero-scale", (width / fullWidth).toFixed(4));
    header?.style.setProperty("--header-width", `${width.toFixed(1)}px`);
    header?.style.setProperty("--header-radius", `${(26 * progress).toFixed(1)}px`);
  };

  updatePageWidth();
  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("resize", () => {
    updatePageWidth();
    updateScroll();
  });
}

// ===== 연혁 섹션 스크롤 효과 =====
{
  const scrollArea = document.querySelector(".sl-timeline-scroll");
  const fadeBlocks = document.querySelectorAll(".sl-fade");
  const items = document.querySelectorAll(".sl-timeline-item");
  const isDesktop = window.matchMedia("(min-width: 1101px)"); // history.css의 내부 스크롤 영역 기준과 같게

  if (scrollArea && "IntersectionObserver" in window) {
    document.documentElement.classList.add("sl-reveal-on");

    // 섹션 제목·요약·타임라인: 페이지 스크롤로 화면에 들어오면 등장, 화면 아래로 내려가면 숨김
    const sectionObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove("is-visible");
          }
        }),
      { threshold: 0.15 },
    );
    fadeBlocks.forEach((block) => sectionObserver.observe(block));

    // 카드: PC는 타임라인 스크롤 영역 안에서 보이면 등장·벗어나면 사라짐(위·아래 모두)
    //       모바일은 페이지 스크롤 기준으로 등장
    let cardObserver;
    const observeCards = () => {
      cardObserver?.disconnect();
      const desktop = isDesktop.matches;

      cardObserver = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
            } else if (desktop || entry.boundingClientRect.top > 0) {
              entry.target.classList.remove("is-visible");
            }
          }),
        desktop
          ? { root: scrollArea, threshold: 0.35, rootMargin: "-6% 0px -6% 0px" }
          : { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
      );
      items.forEach((item) => cardObserver.observe(item));
    };

    observeCards();
    isDesktop.addEventListener("change", observeCards);
  }
}

// ===== 모바일 메뉴 =====
{
  const menuToggle = document.querySelector("#menu-toggle");
  const menuLinks = document.querySelectorAll("#primary-navigation a");

  const setMenu = (open) => {
    menuToggle.checked = open;
    menuToggle.setAttribute("aria-expanded", String(open));
  };

  menuToggle?.addEventListener("change", () => setMenu(menuToggle.checked));
  menuLinks.forEach((link) =>
    link.addEventListener("click", () => setMenu(false)),
  );
}

// ===== 지도 선택 다이얼로그 =====
{
  const dialog = document.querySelector("#map-choice-dialog");
  const trigger = document.querySelector(".map-choice-trigger");
  const closeButton = document.querySelector("[data-close-map-dialog]");
  const routeLink = document.querySelector(".map-choice-route");
  const providerInputs = document.querySelectorAll('input[name="map-provider"]');
  const providers = {
    naver: {
      name: "네이버 지도",
      url: "https://map.naver.com/p/search/%EC%82%BC%EC%84%B1%20%EB%9D%BC%EC%9D%B4%EC%98%A8%EC%A6%88%20%ED%8C%8C%ED%81%AC/place/19909612",
    },
    kakao: {
      name: "카카오맵",
      url: "https://place.map.kakao.com/12864272",
    },
  };

  trigger?.addEventListener("click", () => dialog.showModal());
  closeButton?.addEventListener("click", () => dialog.close());
  providerInputs.forEach((input) =>
    input.addEventListener("change", () => {
      if (!input.checked) return;
      const provider = providers[input.value];
      routeLink.href = provider.url;
      routeLink.setAttribute("aria-label", `${provider.name} 길찾기`);
    }),
  );
}

// ===== 이미지 크게 보기 (data-zoom-image 가 붙은 이미지 클릭 시) =====
{
  const lightbox = document.querySelector("#image-lightbox");
  const lightboxImg = lightbox?.querySelector(".image-lightbox-img");
  const caption = lightbox?.querySelector(".image-lightbox-caption");

  const open = (img) => {
    if (img.naturalWidth && img.naturalHeight) {
      lightboxImg.style.setProperty("--ratio", img.naturalWidth / img.naturalHeight);
    }
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    caption.textContent = img.alt;
    lightbox.showModal();
  };

  document.querySelectorAll("[data-zoom-image]").forEach((img) => {
    img.addEventListener("click", () => open(img));
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(img);
      }
    });
  });

  // 닫기: X 버튼, 사진 바깥(어두운 배경) 클릭, ESC 키(브라우저 기본)
  lightbox?.querySelector("[data-close-image-lightbox]").addEventListener("click", () => lightbox.close());
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target === lightboxImg) lightbox.close();
  });
}

// ===== 알림 신청 다이얼로그 =====
{
  const dialog = document.querySelector("#notification-dialog");
  const triggers = document.querySelectorAll(
    ".notification-dialog-trigger, [data-open-notification-dialog]",
  );
  const closeButton = document.querySelector("[data-close-notification-dialog]");
  const form = document.querySelector("#home-notification-form");
  const status = document.querySelector("#home-notification-form-status");

  triggers.forEach((trigger) =>
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      dialog.showModal();
    }),
  );
  closeButton?.addEventListener("click", () => dialog.close());
  // 캡차 인증을 통과한 뒤에만 실행됨 → EmailJS로 신청 내용 전송 → 신청 창을 닫고 완료 안내
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('[type="submit"]');
    submitButton.disabled = true;
    status.textContent = "신청 내용을 보내는 중입니다…";

    try {
      await window.sendNotificationEmail(form);
    } catch (error) {
      console.error("알림 신청 전송 실패:", error);
      status.textContent = "신청 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.";
      return;
    } finally {
      submitButton.disabled = false;
    }

    form.reset();
    status.textContent = "";
    dialog.close(); // 신청 창이 열려 있으면 완료 안내가 그 뒤에 가려지므로 먼저 닫기
    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "success",
        title: "신청이 완료되었습니다.",
        confirmButtonText: "확인",
        buttonsStyling: false,
        customClass: { popup: "mock-captcha-result", confirmButton: "mock-captcha-result-btn" },
      });
    } else {
      window.alert("신청이 완료되었습니다.");
    }
  });
}
