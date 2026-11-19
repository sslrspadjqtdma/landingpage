// ===== 관리자 로그인 =====
// 주의: 이 사이트는 서버가 없는 정적 사이트(GitHub Pages)라서 브라우저 코드만으로는
//       진짜 관리자 인증을 할 수 없습니다. (JS에 넣은 아이디·비밀번호는 누구나 볼 수 있음)
//       실제로 쓰려면 서버(또는 Firebase Auth 같은 인증 서비스)와 연결해야 합니다.
{
  const form = document.querySelector("#admin-form");
  const password = document.querySelector("#admin-password");
  const eye = document.querySelector("#admin-eye");
  const capsLock = document.querySelector("#admin-capslock");
  const status = document.querySelector("#admin-status");
  const submit = form.querySelector('[type="submit"]');

  const MESSAGES = {
    "site-id": "사이트 ID를 입력해 주세요.",
    "admin-id": "관리자ID를 입력해 주세요.",
    password: "비밀번호를 입력해 주세요.",
  };

  // 비밀번호 보기 / 숨기기
  eye.addEventListener("click", () => {
    const show = password.type === "password";
    password.type = show ? "text" : "password";
    eye.setAttribute("aria-pressed", String(show));
    eye.setAttribute("aria-label", show ? "비밀번호 숨기기" : "비밀번호 보기");
    password.focus();
  });

  // Caps Lock 안내
  const checkCapsLock = (event) => {
    if (typeof event.getModifierState !== "function") return;
    capsLock.hidden = !event.getModifierState("CapsLock");
  };
  password.addEventListener("keydown", checkCapsLock);
  password.addEventListener("keyup", checkCapsLock);
  password.addEventListener("blur", () => (capsLock.hidden = true));

  // 입력하면 빨간 테두리 해제
  form.addEventListener("input", (event) => {
    event.target.closest(".admin-field")?.classList.remove("is-invalid");
    status.classList.remove("is-error");
    status.textContent = "";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // 빈칸 확인: 첫 번째 빈칸에 빨간 테두리 + 안내
    const empty = [...form.querySelectorAll("input[required]")].find((input) => !input.value.trim());
    form.querySelectorAll(".admin-field").forEach((field) => field.classList.remove("is-invalid"));
    if (empty) {
      empty.closest(".admin-field").classList.add("is-invalid");
      status.classList.add("is-error");
      status.textContent = MESSAGES[empty.name];
      empty.focus();
      return;
    }

    // 서버 인증 자리 (지금은 시안이라 전송하지 않음)
    submit.disabled = true;
    status.classList.remove("is-error");
    status.textContent = "확인 중입니다…";
    setTimeout(() => {
      submit.disabled = false;
      password.value = "";
      status.classList.add("is-error");
      status.textContent = "관리자 인증 서버가 아직 연결되지 않았습니다.";
    }, 700);
  });
}
