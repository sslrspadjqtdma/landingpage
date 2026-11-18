// ===== EmailJS 설정 =====
// https://dashboard.emailjs.com 에서 발급받은 값으로 바꿔 넣으세요.
//  - Public Key : Account → General → Public Key
//  - Service ID : Email Services 에서 연결한 메일 서비스의 ID
//  - Template ID: Email Templates 에서 만든 템플릿의 ID
const EMAILJS_CONFIG = {
  publicKey: "UA_MgP-hZcDZAcPTa",
  serviceId: "service_96m2y0e",
  templateId: "template_ejfn4ct",
};

// 템플릿에서 쓸 수 있는 변수 (EmailJS 템플릿 본문에 {{변수명}} 으로 넣기)
//  {{user_name}}         이름
//  {{user_email}}        이메일 주소
//  {{updates}}           선택한 소식 목록 (예: "경기 일정 및 구단 소식, 티켓 예매 일정 및 오픈 안내")
//  {{updates_schedule}}  경기 일정 및 구단 소식 선택 여부 (선택 / 선택 안 함)
//  {{updates_tickets}}   티켓 예매 일정 및 오픈 안내 선택 여부 (선택 / 선택 안 함)
//  {{consent}}           이메일 수집 동의 여부
//  {{submitted_at}}      신청 시각
//  {{page}}              신청한 페이지 (메인 / 알림 신청 페이지)
// EmailJS 기본 "Contact Us" 템플릿용 변수도 함께 보냄 (템플릿을 고치지 않아도 내용이 채워짐)
//  {{name}} 이름, {{email}} 이메일, {{title}} 제목, {{message}} 신청 내용 전체, {{time}} 신청 시각

const isEmailjsConfigured = () =>
  Object.values(EMAILJS_CONFIG).every((value) => value && !value.startsWith("YOUR_"));

if (typeof emailjs !== "undefined" && isEmailjsConfigured()) {
  emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
}

// 폼 내용 → EmailJS 템플릿 변수
const collectNotificationParams = (form) => {
  const field = (name) => form.querySelector(`[name="${name}"]`);
  const labelOf = (input) => input.closest("label")?.textContent.trim() || input.value;
  const updates = [...form.querySelectorAll('input[name="updates"]')];
  const picked = (value) => updates.some((input) => input.value === value && input.checked);

  const params = {
    user_name: field("name")?.value.trim() || "",
    user_email: field("email")?.value.trim() || "",
    updates: updates.filter((input) => input.checked).map(labelOf).join(", ") || "선택 안 함",
    updates_schedule: picked("schedule") ? "선택" : "선택 안 함",
    updates_tickets: picked("tickets") ? "선택" : "선택 안 함",
    consent: field("consent")?.checked ? "동의" : "동의 안 함",
    submitted_at: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
    page: form.closest("dialog") ? "메인 페이지" : "알림 신청 페이지",
  };

  // 기본 "Contact Us" 템플릿 변수
  return {
    ...params,
    name: params.user_name,
    email: params.user_email,
    title: "예매 알림 신청",
    time: params.submitted_at,
    message: [
      `이름: ${params.user_name}`,
      `이메일: ${params.user_email}`,
      `받고 싶은 소식: ${params.updates}`,
      ` - 경기 일정 및 구단 소식: ${params.updates_schedule}`,
      ` - 티켓 예매 일정 및 오픈 안내: ${params.updates_tickets}`,
      `이메일 수집 동의: ${params.consent}`,
      `신청 위치: ${params.page}`,
    ].join("\n"),
  };
};

// 알림 신청 내용을 EmailJS로 보내기 (성공하면 resolve, 실패하면 reject)
window.sendNotificationEmail = async (form) => {
  if (typeof emailjs === "undefined") {
    throw new Error("EmailJS 스크립트를 불러오지 못했습니다.");
  }
  if (!isEmailjsConfigured()) {
    throw new Error("EmailJS 설정(publicKey, serviceId, templateId)이 아직 입력되지 않았습니다.");
  }
  return emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, collectNotificationParams(form));
};
