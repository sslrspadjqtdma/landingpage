// ===== 로그인 후 돌아갈 페이지 (예: login.html?redirect=community.html) =====
// 다른 사이트로 보내는 악용을 막기 위해 이 사이트의 .html 파일 이름만 허용
const params = new URLSearchParams(window.location.search);
const redirectParam = params.get("redirect") || "";
const redirectTo = /^[a-z0-9-]+\.html(#[\w-]*)?$/i.test(redirectParam)
  ? redirectParam
  : "";
const PAGE_NAMES = { "community.html": "커뮤니티" };
const redirectName = PAGE_NAMES[redirectTo.split("#")[0]] || "이전 페이지";

if (redirectTo) {
  // 상단 "메인으로 돌아가기" → 돌아갈 페이지로
  const backLink = document.querySelector(".auth-home-link");
  if (backLink) {
    backLink.href = redirectTo;
    backLink.textContent = `${redirectName}로 돌아가기`;
  }
  // 로그인 ↔ 회원가입 이동 시에도 돌아갈 페이지 정보 유지
  document.querySelectorAll('.auth-switch a[href$=".html"]').forEach((link) => {
    link.href = `${link.getAttribute("href")}?redirect=${encodeURIComponent(redirectTo)}`;
  });
}

document.querySelectorAll(".auth-form").forEach((form) => {
  const status = form.querySelector(".auth-status");
  const password = form.querySelector('[name="password"]');
  const passwordConfirm = form.querySelector('[name="password-confirm"]');

  const validatePassword = () => {
    if (form.dataset.authForm !== "signup" || !password) return;

    const value = password.value;
    const meetsRequirements =
      value.length >= 8 &&
      /[A-Z]/.test(value) &&
      /[a-z]/.test(value) &&
      /[^\p{L}\p{N}\s]/u.test(value);

    password.setCustomValidity(
      value && !meetsRequirements
        ? "비밀번호는 대문자와 소문자, 특수기호를 이용하여 8자 이상 포함되어야 합니다."
        : "",
    );

    if (!passwordConfirm) return;
    passwordConfirm.setCustomValidity(
      passwordConfirm.value && passwordConfirm.value !== value
        ? "비밀번호가 일치하지 않습니다."
        : "",
    );
  };

  password?.addEventListener("input", validatePassword);
  passwordConfirm?.addEventListener("input", validatePassword);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    validatePassword();
    if (!form.reportValidity()) return;

    const isSignup = form.dataset.authForm === "signup";
    const submitButton = form.querySelector('[type="submit"]');

    // 회원가입: 메인으로 자동 이동하지 않고 "로그인하시겠습니까?" 창 → 로그인하기 클릭 시 로그인 페이지로
    if (isSignup) {
      const loginUrl = redirectTo ? `login.html?redirect=${encodeURIComponent(redirectTo)}` : "login.html";
      status.textContent = "회원가입이 완료되었습니다.";
      submitButton.disabled = true;

      if (typeof Swal === "undefined") {
        if (window.confirm("회원가입이 완료되었습니다.\n로그인하시겠습니까?")) window.location.assign(loginUrl);
        submitButton.disabled = false;
        return;
      }
      Swal.fire({
        icon: "success",
        title: "회원가입이 완료되었습니다",
        text: "로그인하시겠습니까?",
        confirmButtonText: "로그인하기",
        buttonsStyling: false,
        customClass: { popup: "mock-captcha-result", confirmButton: "mock-captcha-result-btn" },
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => window.location.assign(loginUrl));
      return;
    }

    // 로그인 상태를 이 브라우저에 저장 (인증 서버가 없는 시안이라 이메일·닉네임만, 비밀번호는 저장하지 않음)
    const email = form.querySelector('[name="email"]')?.value.trim() || "";
    const name = form.querySelector('[name="name"]')?.value.trim() || "";
    const nickname = (name || email.split("@")[0]).slice(0, 20) || "라이온즈팬";
    try {
      localStorage.setItem("lionsCommunityUser", JSON.stringify({ email, nickname }));
    } catch {
      // 저장소를 쓸 수 없는 환경(사생활 보호 모드 등)에서는 저장 없이 진행
    }

    const target = redirectTo || "index.html";
    const targetName = redirectTo ? redirectName : "메인 페이지";
    status.textContent = `${nickname}님, 로그인되었습니다! 잠시 후 ${targetName}로 이동합니다.`;
    submitButton.disabled = true;
    setTimeout(() => window.location.assign(target), 1200);
  });
});
