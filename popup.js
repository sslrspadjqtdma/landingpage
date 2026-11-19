// ===== 메인 팝업 (V9 우승 기념) =====
// - "오늘 하루 보지 않기": 이번 접속 동안(같은 탭에서 다른 페이지를 다녀와도) 다시 뜨지 않음
//                          → 브라우저나 탭을 닫고 사이트에 다시 들어오면 다시 뜸 (sessionStorage)
// - "닫기": 지금만 닫음 → 다른 페이지에 갔다가 메인으로 돌아오면 다시 뜸
// - PC(1101px 이상): 대기업 사이트처럼 화면 왼쪽 위에 떠 있는 레이어 팝업, 마우스로 끌어서 이동 가능
//                    (뒤 페이지도 그대로 보고 스크롤·클릭 가능)
// - 모바일·태블릿: 화면 아래에서 올라오는 시트 (뒤 화면은 어둡게, 스크롤 잠금)
{
  const POPUP_HIDE_KEY = "lionsV9PopupHidden";
  const popup = document.querySelector("#promo-popup");
  const desktopQuery = window.matchMedia("(min-width: 1101px)");

  const isHidden = () => {
    try {
      return sessionStorage.getItem(POPUP_HIDE_KEY) === "1";
    } catch {
      return false; // 저장소를 못 쓰는 환경에서는 그냥 띄움
    }
  };

  const openPopup = () => {
    if (desktopQuery.matches) {
      popup.classList.add("is-floating");
      popup.show(); // 뒤 페이지를 막지 않는 레이어 팝업
    } else {
      popup.classList.remove("is-floating");
      popup.style.left = "";
      popup.style.top = "";
      popup.showModal();
      document.documentElement.classList.add("promo-popup-open");
    }
  };

  if (popup && !isHidden()) openPopup();

  popup?.addEventListener("close", () => {
    document.documentElement.classList.remove("promo-popup-open");
  });

  // 화면 크기가 PC ↔ 모바일로 바뀌면 그에 맞는 방식으로 다시 띄움
  desktopQuery.addEventListener("change", () => {
    if (!popup?.open) return;
    popup.close();
    openPopup();
  });

  popup?.querySelector("[data-promo-hide-today]")?.addEventListener("click", () => {
    try {
      sessionStorage.setItem(POPUP_HIDE_KEY, "1");
    } catch {
      // 저장 못 해도 지금은 닫기
    }
    popup.close();
  });

  popup?.querySelector("[data-promo-close]")?.addEventListener("click", () => popup.close());

  // ===== PC: 마우스로 끌어서 위치 이동 =====
  let drag = null;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), Math.max(min, max));

  popup?.addEventListener("pointerdown", (event) => {
    if (!popup.classList.contains("is-floating")) return;
    if (event.button !== 0 || event.target.closest("button")) return; // 버튼 클릭은 그대로
    const rect = popup.getBoundingClientRect();
    drag = { offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top };
    popup.setPointerCapture(event.pointerId);
    popup.classList.add("is-dragging");
    event.preventDefault(); // 이미지 끌기·글자 선택 방지
  });

  popup?.addEventListener("pointermove", (event) => {
    if (!drag) return;
    // 팝업이 화면 밖으로 완전히 나가지 않게 화면 안으로 제한
    const left = clamp(event.clientX - drag.offsetX, 0, window.innerWidth - popup.offsetWidth);
    const top = clamp(event.clientY - drag.offsetY, 0, window.innerHeight - popup.offsetHeight);
    popup.style.left = `${left}px`;
    popup.style.top = `${top}px`;
  });

  const endDrag = (event) => {
    if (!drag) return;
    drag = null;
    popup.classList.remove("is-dragging");
    if (popup.hasPointerCapture(event.pointerId)) popup.releasePointerCapture(event.pointerId);
  };
  popup?.addEventListener("pointerup", endDrag);
  popup?.addEventListener("pointercancel", endDrag);

  // 창 크기를 줄였을 때 팝업이 화면 밖으로 밀려나지 않게
  window.addEventListener("resize", () => {
    if (!popup?.open || !popup.classList.contains("is-floating") || !popup.style.left) return;
    popup.style.left = `${clamp(popup.offsetLeft, 0, window.innerWidth - popup.offsetWidth)}px`;
    popup.style.top = `${clamp(popup.offsetTop, 0, window.innerHeight - popup.offsetHeight)}px`;
  });
}
