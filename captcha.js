// ===== 캡차 문제 데이터 =====
// 이미지를 바꾸거나 추가하려면 tiles 에 { src, isAnswer } 만 넣으면 됩니다. (정답 = isAnswer: true)
// 창이 열릴 때마다 정답 사진 answerCount 장 + 나머지 사진을 무작위로 골라 총 9장(3x3)을 섞어서 보여 줍니다.
// 문제를 여러 개 넣으면 새로고침(↻) 때 다음 문제로 넘어갑니다.
const captchaProblems = [
  {
    keyword: "신호등",
    answerCount: 3,
    tiles: [
      // 정답: 신호등이 있는 사진
      { src: "./images/captcha/도로신호등1.png", isAnswer: true },
      { src: "./images/captcha/도로신호등2.jpg", isAnswer: true },
      { src: "./images/captcha/도로신호등3.jpg", isAnswer: true },
      // 오답: 신호등이 없는 도로 사진 (이 중 6장이 무작위로 뽑힘)
      { src: "./images/captcha/횡단보도1.png", isAnswer: false },
      { src: "./images/captcha/횡단보도2.png", isAnswer: false },
      { src: "./images/captcha/횡단보도3.png", isAnswer: false },
      { src: "./images/captcha/횡단보도4.png", isAnswer: false },
      { src: "./images/captcha/횡단보도5.png", isAnswer: false },
      { src: "./images/captcha/횡단보도6.png", isAnswer: false },
      { src: "./images/captcha/도로사진1.jpg", isAnswer: false },
      { src: "./images/captcha/도로사진2.jpg", isAnswer: false },
    ],
  },
];
const CAPTCHA_TILE_COUNT = 9; // 3x3

// 인증을 거칠 버튼 문구 (버튼 글자가 이 문구로 시작하면 연결)
const CAPTCHA_BUTTON_LABELS = ["로그인", "회원가입", "알림 신청하기"];

(() => {
  if (typeof Swal === "undefined") return; // CDN을 못 불러오면 기존 동작 그대로

  let problemIndex = 0;

  const shuffle = (list) => {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const escapeAttr = (value) => String(value).replace(/[&"<>]/g, (ch) => `&#${ch.charCodeAt(0)};`);

  // 지금 화면에 보이는 9장 (검증할 때 이 목록 기준으로 비교)
  let currentTiles = [];

  // 정답 사진 answerCount 장 + 오답 사진 나머지를 무작위로 뽑아 섞기
  const pickTiles = (problem) => {
    const answers = shuffle(problem.tiles.filter((tile) => tile.isAnswer));
    const others = shuffle(problem.tiles.filter((tile) => !tile.isAnswer));
    const answerCount = Math.min(problem.answerCount ?? answers.length, answers.length, CAPTCHA_TILE_COUNT);
    return shuffle([
      ...answers.slice(0, answerCount),
      ...others.slice(0, CAPTCHA_TILE_COUNT - answerCount),
    ]);
  };

  // 새로 뽑은 9장을 그리드에 그리기 (선택 상태도 함께 초기화)
  const renderTiles = (grid, problem) => {
    currentTiles = pickTiles(problem);
    grid.innerHTML = currentTiles
      .map(
        (tile, index) => `
          <button type="button" class="mock-captcha-tile" data-index="${index}" aria-pressed="false">
            <img src="${escapeAttr(tile.src)}" alt="" draggable="false" />
            <span class="mock-captcha-check" aria-hidden="true">✓</span>
          </button>`,
      )
      .join("");
  };

  const renderKeyword = (popup, problem) => {
    popup.querySelector(".mock-captcha-keyword").textContent = problem.keyword;
  };

  const openCaptcha = () =>
    Swal.fire({
      html: `
        <div class="mock-captcha-header">
          <p class="mock-captcha-guide">
            <strong class="mock-captcha-keyword"></strong>이(가) 있는 이미지를 모두 선택하세요
          </p>
          <p class="mock-captcha-sub">해당되는 이미지가 없으면 새로고침을 누르세요.</p>
        </div>
        <div class="mock-captcha-grid" role="group" aria-label="이미지 선택"></div>`,
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      reverseButtons: true,
      buttonsStyling: false,
      focusConfirm: false,
      customClass: {
        popup: "mock-captcha-popup",
        htmlContainer: "mock-captcha-body",
        actions: "mock-captcha-actions",
        confirmButton: "mock-captcha-confirm",
        cancelButton: "mock-captcha-cancel",
        validationMessage: "mock-captcha-error",
      },
      didOpen: (popup) => {
        const grid = popup.querySelector(".mock-captcha-grid");
        const problem = captchaProblems[problemIndex];
        renderKeyword(popup, problem);
        renderTiles(grid, problem);

        // 타일 클릭 → 선택 토글 (축소 + 체크 표시)
        grid.addEventListener("click", (event) => {
          const tile = event.target.closest(".mock-captcha-tile");
          if (!tile) return;
          const selected = tile.classList.toggle("is-selected");
          tile.setAttribute("aria-pressed", String(selected));
          Swal.resetValidationMessage();
        });

        // 새로고침 버튼: 하단 왼쪽 (확인/취소와 같은 줄)
        const refresh = document.createElement("button");
        refresh.type = "button";
        refresh.className = "mock-captcha-refresh";
        refresh.setAttribute("aria-label", "새 문제 받기");
        refresh.title = "새 문제 받기";
        refresh.textContent = "↻";
        refresh.addEventListener("click", () => {
          problemIndex = (problemIndex + 1) % captchaProblems.length; // 문제가 1개면 같은 문제에서 9장을 새로 뽑음
          const next = captchaProblems[problemIndex];
          renderKeyword(popup, next);
          renderTiles(grid, next);
          Swal.resetValidationMessage();
        });
        popup.querySelector(".swal2-actions").prepend(refresh);
      },
      preConfirm: () => {
        const popup = Swal.getPopup();
        const selected = new Set(
          [...popup.querySelectorAll(".mock-captcha-tile.is-selected")].map((tile) => Number(tile.dataset.index)),
        );
        // 정답 사진은 모두 선택, 오답 사진은 하나도 선택하지 않아야 통과
        const allCorrect = currentTiles.every((tile, index) => tile.isAnswer === selected.has(index));

        if (allCorrect) {
          return true; // 정답 → 팝업 닫힘
        } else {
          Swal.showValidationMessage("잘못 된 사진입니다.");
          return false; // 오답 → 팝업 유지
        }
      },
    }).then((result) => result.isConfirmed);

  const showSuccess = () =>
    Swal.fire({
      icon: "success",
      title: "인증 완료",
      text: "보안 인증이 완료되었습니다.",
      timer: 1200,
      showConfirmButton: false,
      customClass: { popup: "mock-captcha-result" },
    });

  // ===== 대상 버튼 연결 =====
  // 버튼 글자 끝의 ↗ 와 공백은 빼고 비교 ("로그인하기"처럼 "하기"가 붙은 버튼도 포함)
  const labelOf = (el) => el.textContent.replace(/[↗\s]+$/u, "").trim();
  const isTarget = (el) => {
    const label = labelOf(el);
    return CAPTCHA_BUTTON_LABELS.some((target) => label === target || label === `${target}하기`);
  };

  // 인증을 통과한 바로 그 제출 1번만 그대로 보내기 위한 표시
  let allowNextSubmit = false;
  let busy = false;
  // 캡차를 한 번 통과한 폼은 (새로고침 전까지) 다시 묻지 않고 바로 제출
  const passedForms = new WeakSet();

  const submitWithoutCaptcha = (button) => {
    allowNextSubmit = true;
    button.form.requestSubmit(button);
  };

  // ===== 필수 동의 체크 확인 (체크 안 하면 캡차 대신 빨간 안내 문구) =====
  const CONSENT_MESSAGE = "필수 동의 항목에 체크해 주세요.";

  const consentOf = (form) => form.querySelector('input[type="checkbox"][name="consent"][required]');

  const hideConsentError = (form) => {
    form.querySelector(".mock-captcha-consent-error")?.remove();
  };

  const showConsentError = (form, consent) => {
    hideConsentError(form);
    const message = document.createElement("p");
    message.className = "mock-captcha-consent-error";
    message.setAttribute("role", "alert");
    message.textContent = CONSENT_MESSAGE;
    (consent.closest("label") || consent).after(message);
    consent.focus();
    consent.addEventListener("change", () => consent.checked && hideConsentError(form), { once: true });
  };

  // 입력값 확인: 빈칸 등은 브라우저 기본 안내, 동의 체크 누락은 빨간 문구
  const checkForm = (form) => {
    const consent = consentOf(form);
    const firstInvalid = [...form.elements].find(
      (field) => field !== consent && field.willValidate && !field.checkValidity(),
    );
    if (firstInvalid) {
      firstInvalid.reportValidity();
      return false;
    }
    if (consent && !consent.checked) {
      showConsentError(form, consent);
      return false;
    }
    hideConsentError(form);
    return true;
  };

  // 인증 창을 띄우고, 통과하면 원래 제출 동작을 이어서 실행
  const runGate = async (button) => {
    if (busy) return;

    // 모달 <dialog> 안의 버튼이면 잠시 닫아야 팝업이 위에 보임
    const dialog = button.closest("dialog[open]");
    const wasModal = Boolean(dialog?.matches(":modal"));
    if (wasModal) dialog.close();

    busy = true;
    const passed = await openCaptcha();
    if (passed) await showSuccess();
    busy = false;

    if (wasModal) dialog.showModal();
    if (passed) {
      passedForms.add(button.form);
      submitWithoutCaptcha(button); // 원래 제출 동작 (로그인 처리, 신청 완료 문구 등)
    }
  };

  // 폼 안의 실제 제출 버튼만 대상
  // (헤더 로그인·회원가입 링크, 메인의 신청 창 열기 버튼은 인증 없이 그대로 동작)
  const isGatedSubmit = (el) => el?.matches('button[type="submit"]') && el.form && isTarget(el);

  // 1) 클릭: 캡처 단계에서 먼저 가로채서 입력 확인 → 캡차
  document.addEventListener(
    "click",
    (event) => {
      const el = event.target.closest("button");
      if (!isGatedSubmit(el) || el.closest(".swal2-container")) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      if (!checkForm(el.form)) return;
      if (passedForms.has(el.form)) {
        submitWithoutCaptcha(el); // 이미 인증 통과 → 캡차 없이 바로 신청 완료
        return;
      }
      runGate(el);
    },
    true,
  );

  // 2) 제출: 클릭 없이 제출되는 경우(엔터 키, 자동 제출 등)도 인증 없이는 통과 못 하게 막음
  document.addEventListener(
    "submit",
    (event) => {
      if (allowNextSubmit) {
        allowNextSubmit = false; // 인증 통과한 제출 → 그대로 진행
        return;
      }
      const form = event.target;
      if (passedForms.has(form)) return; // 이미 인증 통과한 폼
      const button = isGatedSubmit(event.submitter)
        ? event.submitter
        : [...form.querySelectorAll('button[type="submit"]')].find(isGatedSubmit);
      if (!button) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      if (!checkForm(form)) return;
      runGate(button);
    },
    true,
  );
})();
