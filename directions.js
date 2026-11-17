// ===== 지도 선택 다이얼로그 =====
{
  const dialog = document.querySelector("#map-choice-dialog");
  const triggers = document.querySelectorAll(".directions-map-trigger");
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

  triggers.forEach((trigger) =>
    trigger.addEventListener("click", () => dialog.showModal()),
  );
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
