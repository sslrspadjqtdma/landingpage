// ===== 알림 신청 폼 =====
{
  const form = document.querySelector("#notification-form");
  const status = document.querySelector("#notification-form-status");

  // 캡차 인증을 통과한 뒤에만 실행됨 → EmailJS로 신청 내용 전송 → 신청 완료 안내
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
    status.textContent = "신청이 완료되었습니다.";
    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "success",
        title: "신청이 완료되었습니다.",
        confirmButtonText: "확인",
        buttonsStyling: false,
        customClass: { popup: "mock-captcha-result", confirmButton: "mock-captcha-result-btn" },
      });
    }
  });
}
