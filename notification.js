// ===== 알림 신청 폼 =====
{
  const form = document.querySelector("#notification-form");
  const status = document.querySelector("#notification-form-status");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent =
      "입력 내용을 확인했습니다. 실제 알림 신청은 서버 연동 후 이용할 수 있습니다.";
  });
}
