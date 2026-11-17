// ===== 커뮤니티: 게시판 데이터 (가상의 회원·게시글) =====
const BOARD_GROUPS = [
  { title: "가입인사", boards: ["가입인사요"] },
  {
    title: "함께 떠들어요",
    boards: ["자유게시판", "야구 TALK", "기타 스포츠 TALK", "분석게시판"],
  },
  {
    title: "함께 응원해요",
    boards: [
      "사진/움짤/영상/응원가",
      "응원게시판",
      "투표인증",
      "직관인증 게시판",
      "카풀/택시 동행 게시판",
    ],
  },
  {
    title: "함께 나누어요",
    boards: [
      "나눔게시판",
      "나눔후기게시판",
      "티켓 교환 게시판",
      "굿즈 교환 게시판",
      "중고장터 게시판",
    ],
  },
];

// date: 오늘 글은 "HH:MM", 이전 글은 "YYYY.MM.DD."
const POSTS = [
  {
    id: 1, notice: "필독", board: "공지", author: "라팍지기", date: "2026.06.19.", views: 98412, likes: 512,
    title: "라팍 응원방 이용 규칙 안내 (꼭 읽어 주세요)",
    body: ["라팍 응원방에 오신 모든 분들 환영합니다!", "서로 존중하는 응원 문화를 위해 비방·욕설·도배 글은 예고 없이 삭제됩니다. 티켓·굿즈 거래는 각 교환 게시판에서만 해 주세요.", "즐겁고 따뜻한 커뮤니티를 함께 만들어 가요."],
    comments: [{ author: "푸른사자77", text: "숙지했습니다! 올해도 잘 부탁드려요." }, { author: "삼팬30년차", text: "운영진분들 항상 감사합니다." }],
  },
  {
    id: 2, notice: "필독", board: "공지", author: "라팍지기", date: "2026.06.20.", views: 61230, likes: 230,
    title: "주요 공지 한눈에 모아보기",
    body: ["게시판별 이용 방법, 등급 안내, 이벤트 공지를 한 곳에 모았습니다.", "새 공지가 올라오면 이 글에도 바로 업데이트됩니다."],
    comments: [{ author: "직관요정", text: "정리 최고예요 👍" }],
  },
  {
    id: 3, notice: "공지", board: "공지", author: "응원방운영팀", date: "2026.11.16.", views: 2215, likes: 188, isNew: true,
    title: "[이벤트] V9 우승 기념 응원 메시지 남기기 이벤트",
    body: ["12년 만의 한국시리즈 우승을 함께 축하해요!", "이 글에 선수단에게 전하고 싶은 응원 메시지를 남겨 주시면 추첨을 통해 기념 키링을 드립니다. (11월 30일까지)"],
    comments: [{ author: "응원단장꿈나무", text: "V9 정말 감동이었습니다. 내년에도 함께해요!" }, { author: "치맥러버", text: "라팍에서 운 건 처음이에요 ㅠㅠ" }, { author: "블루클로", text: "선수단 모두 고생 많으셨습니다!" }],
  },
  {
    id: 4, notice: "공지", board: "공지", author: "응원방운영팀", date: "2026.11.14.", views: 1232, likes: 64,
    title: "[당첨자 발표] 포스트시즌 직관 인증 이벤트",
    body: ["참여해 주신 모든 분들 감사합니다.", "당첨자분들께는 쪽지로 개별 안내드렸습니다. 확인 부탁드려요."],
    comments: [{ author: "라팍통신", text: "당첨됐어요!! 감사합니다 🙏" }],
  },
  {
    id: 5, board: "자유게시판", author: "푸른사자77", date: "15:34", views: 38, likes: 4, isNew: true,
    title: "우승 퍼레이드 일정 아직 안 나왔나요?",
    body: ["혹시 우승 퍼레이드나 팬 행사 일정 들으신 분 계신가요?", "휴가 미리 내 두려고 하는데 소식 아시는 분 공유 부탁드려요!"],
    comments: [{ author: "라팍통신", text: "아직 공식 발표는 없었어요. 나오면 바로 공유할게요!" }],
  },
  {
    id: 6, board: "야구 TALK", author: "직관요정", date: "15:12", views: 261, likes: 37, isNew: true,
    title: "KS 5차전 9회 다시 봐도 소름이네요",
    body: ["하이라이트 열 번은 넘게 본 것 같아요.", "마지막 아웃카운트 잡는 순간 라팍 전체가 울리던 함성은 평생 못 잊을 듯합니다."],
    comments: [{ author: "삼팬30년차", text: "저도 그 순간 옆자리 모르는 분이랑 끌어안았어요 ㅋㅋ" }, { author: "블루클로", text: "몇 번을 봐도 눈물 납니다" }],
  },
  {
    id: 7, board: "직관인증 게시판", author: "라팍통신", date: "14:48", views: 412, likes: 58, isNew: true,
    title: "11월 8일 KS 5차전 직관 인증합니다 (V9 현장!)",
    body: ["3루 블루존에서 직관했습니다.", "경기 끝나고 한 시간 넘게 자리를 못 떴네요. 다들 그날 어디 계셨나요?"],
    comments: [{ author: "치맥러버", text: "저 1루 쪽이었어요! 같은 공간에 있었다니 ㅎㅎ" }],
  },
  {
    id: 8, board: "분석게시판", author: "야구분석가K", date: "13:20", views: 534, likes: 71,
    title: "2026 포스트시즌, 팀 기록으로 돌아본 V9",
    body: ["포스트시즌 동안 선발이 긴 이닝을 버텨 준 덕분에 불펜 소모가 적었던 게 컸습니다.", "타선도 찬스에서 집중력이 좋았고, 수비 실책이 거의 없었던 점이 단기전에서 빛났다고 봅니다.", "다음 글에서는 경기별 흐름을 정리해 볼게요."],
    comments: [{ author: "푸른사자77", text: "정리 감사합니다. 다음 글도 기대할게요!" }, { author: "겨울나기", text: "수비 이야기 공감합니다." }],
  },
  {
    id: 9, board: "가입인사요", author: "삼팬30년차", date: "12:05", views: 89, likes: 21,
    title: "30년차 삼성팬 가입 인사드립니다",
    body: ["어릴 때 아버지 손 잡고 처음 야구장에 간 게 시작이었네요.", "이번 V9를 계기로 커뮤니티에도 가입했습니다. 잘 부탁드립니다!"],
    comments: [{ author: "라팍지기", text: "환영합니다! 오래오래 함께해요 🦁" }, { author: "직관요정", text: "대선배님 환영합니다!" }],
  },
  {
    id: 10, board: "응원게시판", author: "응원단장꿈나무", date: "11:47", views: 156, likes: 44,
    title: "내년에도 V10 가즈아!!",
    body: ["우승의 여운이 아직도 가시질 않네요.", "내년 시즌도 지금처럼 다 같이 목이 터져라 응원해요!"],
    comments: [{ author: "블루클로", text: "V10 가즈아!!!" }],
  },
  {
    id: 11, board: "나눔후기게시판", author: "받은사자", date: "08:40", views: 47, likes: 12,
    title: "응원 클래퍼 나눔 받았습니다, 감사해요!",
    body: ["나눔사자님께 클래퍼 잘 받았습니다.", "포장까지 꼼꼼하게 해 주셔서 감동했어요. 다음엔 저도 나눔할게요!"],
    comments: [{ author: "나눔사자", text: "잘 받으셨다니 다행이에요 😊" }],
  },
  {
    id: 12, board: "티켓 교환 게시판", author: "블루티켓", date: "2026.11.16.", views: 203, likes: 3,
    title: "팬 페스티벌 2매 → 1매 교환 원해요",
    body: ["동행이 못 가게 돼서 2매를 1매로 바꾸고 싶어요.", "정가 거래만 합니다. 댓글 남겨 주세요."],
    comments: [{ author: "대구토박이", text: "혹시 좌석 구역이 어디인가요?" }],
  },
  {
    id: 13, board: "카풀/택시 동행 게시판", author: "대구토박이", date: "2026.11.16.", views: 118, likes: 2,
    title: "수성구 → 라팍 팬 페스티벌 카풀 구해요 (2자리)",
    body: ["행사 당일 수성구에서 출발합니다. 2자리 남았어요.", "유류비는 n분의 1로 해요!"],
    comments: [],
  },
  {
    id: 14, board: "굿즈 교환 게시판", author: "굿즈수집가", date: "2026.11.16.", views: 176, likes: 9,
    title: "V9 기념 머플러 ↔ 유니폼 키링 교환해요",
    body: ["머플러가 하나 더 생겨서 키링이랑 교환 원합니다.", "직거래는 라팍 근처에서 가능해요."],
    comments: [{ author: "치맥러버", text: "키링 있어요! 쪽지 드릴게요" }],
  },
  {
    id: 15, board: "나눔게시판", author: "나눔사자", date: "2026.11.16.", views: 322, likes: 40,
    title: "응원 클래퍼 10개 나눔합니다",
    body: ["우승 기념으로 집에 있던 클래퍼 10개 나눔해요.", "택배비만 부담해 주시면 됩니다. 선착순!"],
    comments: [{ author: "받은사자", text: "혹시 아직 남았을까요?" }, { author: "나눔사자", text: "마감되었습니다! 감사해요" }],
  },
  {
    id: 16, board: "사진/움짤/영상/응원가", author: "떼창러버", date: "2026.11.16.", views: 689, likes: 102,
    title: "우승 세리머니 때 응원가 떼창 후기",
    body: ["우승 확정 후 다 같이 부른 응원가, 정말 소름이었어요.", "현장 영상은 용량 문제로 나중에 정리해서 다시 올릴게요!"],
    comments: [{ author: "직관요정", text: "그 떼창 아직도 귀에 맴돌아요" }],
  },
  {
    id: 17, board: "투표인증", author: "투표하는사자", date: "2026.11.15.", views: 94, likes: 15,
    title: "올해의 선수 팬 투표 인증합니다!",
    body: ["오늘 투표 완료했습니다.", "다들 하루 한 번 잊지 말고 투표해요!"],
    comments: [],
  },
  {
    id: 18, board: "기타 스포츠 TALK", author: "겨울나기", date: "2026.11.15.", views: 71, likes: 6,
    title: "야구 끝나서 허전하신 분, 겨울 스포츠 뭐 보세요?",
    body: ["시즌 끝나니 저녁마다 허전하네요.", "다들 비시즌에는 어떤 스포츠 보시나요?"],
    comments: [{ author: "치맥러버", text: "저는 농구 봅니다 ㅎㅎ" }],
  },
  {
    id: 19, board: "중고장터 게시판", author: "중고왕사자", date: "2026.11.14.", views: 140, likes: 1,
    title: "[판매] 2026 홈 유니폼 L 사이즈 (새상품급)",
    body: ["한 번 착용한 홈 유니폼 판매합니다.", "택은 없지만 상태 아주 좋아요. 직거래 우선입니다."],
    comments: [],
  },
  {
    id: 20, board: "자유게시판", author: "치맥러버", date: "2026.11.14.", views: 233, likes: 17,
    title: "다들 우승 기념 굿즈 뭐 사셨어요?",
    body: ["저는 기념 티셔츠랑 머플러 샀어요.", "다른 분들은 뭐 사셨는지 궁금하네요!"],
    comments: [{ author: "굿즈수집가", text: "저는 키링 전 종류요 ㅋㅋ" }, { author: "블루클로", text: "기념 유니폼 하나 장만했습니다" }],
  },
];

// ===== 로그인 상태 & 저장소 (인증 서버가 없는 시안: 이 브라우저의 localStorage에만 저장) =====
const USER_KEY = "lionsCommunityUser";
const DATA_KEY = "lionsCommunityData";

const readJSON = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
const writeJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 저장소를 쓸 수 없으면 이번 화면에서만 반영
  }
};

let user = readJSON(USER_KEY, null);
// data.posts: 내가 쓴 글 / data.extras[postId]: { comments, replies: {commentId: [...]}, liked, views } / data.joined
const data = Object.assign({ posts: [], extras: {}, joined: false }, readJSON(DATA_KEY, {}));
const save = () => writeJSON(DATA_KEY, data);
const extraOf = (id) => (data.extras[id] ??= { comments: [], replies: {}, liked: false, views: 0 });

// ===== 공통 도우미 =====
const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const formatViews = (n) => (n >= 10000 ? `${(n / 10000).toFixed(1)}만` : n.toLocaleString("ko-KR"));
const initial = (name) => String(name).trim().charAt(0) || "?";
const pad = (n) => String(n).padStart(2, "0");
const formatDate = (iso) => {
  const d = new Date(iso);
  const now = new Date();
  return d.toDateString() === now.toDateString()
    ? `${pad(d.getHours())}:${pad(d.getMinutes())}`
    : `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}.`;
};
const isToday = (dateText) => /^\d{2}:\d{2}$/.test(dateText);
const isMe = (name) => Boolean(user) && name === user.nickname;

// 기본 글 + 내가 쓴 글 (내 글이 위로)
const allPosts = () => [
  ...data.posts.map((p) => ({ ...p, date: formatDate(p.createdAt), mine: true })),
  ...POSTS,
];
const findPost = (id) => allPosts().find((p) => p.id === id);
const commentsOf = (p) => [
  ...p.comments.map((c, i) => ({ ...c, id: `s${p.id}-${i}` })),
  ...extraOf(p.id).comments,
];
const likesOf = (p) => p.likes + (extraOf(p.id).liked ? 1 : 0);
const viewsOf = (p) => p.views + extraOf(p.id).views;

// ===== 화면 요소 =====
const $ = (selector) => document.querySelector(selector);
const rowsEl = $("#cm-rows");
const hideNoticeEl = $("#cm-hide-notice");
const searchInput = $("#cm-search-input");
const postDialog = $("#cm-post-dialog");
const loginDialog = $("#cm-login-dialog");
const writeDialog = $("#cm-write-dialog");
const profileDialog = $("#cm-profile-dialog");
const commentInput = $("#cm-comment-input");

const state = { board: "all", keyword: "", openPostId: null };

// ===== 로그인 상태에 따라 사이드바·댓글창 표시 =====
const renderAuth = () => {
  $("#cm-me").hidden = !user;
  if (user) {
    $("#cm-me-avatar").textContent = initial(user.nickname);
    $("#cm-me-name").textContent = `${user.nickname}님`;
    $("#cm-me-name").dataset.user = user.nickname;
  }
  // 로그인 전에는 "로그인하기"만, 로그인 후에는 가입하기·글쓰기
  $("#cm-login-link").hidden = Boolean(user);
  $("#cm-join").hidden = !user;
  $("#cm-side-write").hidden = !user;

  const joinButton = $("#cm-join");
  joinButton.textContent = user && data.joined ? "✓ 가입한 멤버입니다" : "커뮤니티 가입하기";
  joinButton.disabled = Boolean(user && data.joined);
  commentInput.placeholder = user ? "따뜻한 댓글을 남겨 주세요." : "로그인 후 댓글을 남길 수 있어요.";
  commentInput.readOnly = !user;
};

// ===== 왼쪽 게시판 메뉴 =====
const renderBoards = () => {
  const posts = allPosts();
  const hasNew = (board) => posts.some((p) => p.board === board && isToday(p.date));
  $("#cm-board-groups").innerHTML = BOARD_GROUPS.map(
    (group) => `
      <div class="cm-board-group">
        <p class="cm-board-group-title">★ ${escapeHtml(group.title)}</p>
        <ul>
          ${group.boards
            .map(
              (board) => `
            <li>
              <button type="button" data-board="${escapeHtml(board)}" class="${state.board === board ? "is-active" : ""}">
                <span>${escapeHtml(board)}</span>
                ${hasNew(board) ? '<span class="cm-new" aria-label="새 글">N</span>' : ""}
              </button>
            </li>`,
            )
            .join("")}
        </ul>
      </div>`,
  ).join("");
};

// ===== 게시글 목록 =====
const render = () => {
  const keyword = state.keyword.toLowerCase();
  const matches = (p) => !keyword || `${p.title} ${p.body.join(" ")}`.toLowerCase().includes(keyword);
  const posts = allPosts();

  const notices = state.board === "all" && !hideNoticeEl.checked ? posts.filter((p) => p.notice && matches(p)) : [];
  const normal = posts.filter((p) => !p.notice && (state.board === "all" || p.board === state.board) && matches(p));
  const list = [...notices, ...normal];

  $("#cm-board-title").textContent = state.board === "all" ? "전체글보기" : state.board;
  $("#cm-board-count").textContent = normal.length.toLocaleString("ko-KR");
  $("#cm-total-count").textContent = posts.filter((p) => !p.notice).length.toLocaleString("ko-KR");
  $("#cm-empty").hidden = list.length > 0;

  rowsEl.innerHTML = list
    .map((p) => {
      const commentCount = commentsOf(p).length;
      return `
      <div class="cm-row${p.notice ? " is-notice" : ""}${p.mine ? " is-mine" : ""}" role="row">
        <span class="cm-cell-title" role="cell">
          ${p.notice ? `<span class="cm-tag${p.notice === "필독" ? " is-must" : ""}">${p.notice}</span>` : `<span class="cm-board-label">${escapeHtml(p.board)}</span>`}
          <button type="button" class="cm-title-link" data-post="${p.id}">
            ${escapeHtml(p.title)}
            ${commentCount ? `<span class="cm-reply-count">[${commentCount}]</span>` : ""}
            ${p.isNew || isToday(p.date) ? '<span class="cm-new" aria-label="새 글">N</span>' : ""}
          </button>
        </span>
        <span class="cm-cell-author" role="cell">
          <button type="button" class="cm-user-link" data-action="profile" data-user="${escapeHtml(p.author)}">${escapeHtml(p.author)}</button>
        </span>
        <span class="cm-cell-date" role="cell">${p.date}</span>
        <span class="cm-cell-views" role="cell">${formatViews(viewsOf(p))}</span>
      </div>`;
    })
    .join("");
};

const refresh = () => {
  renderAuth();
  renderBoards();
  render();
};

// ===== 게시글 보기 (로그인 없이 가능) =====
const renderComments = (p) => {
  const comments = commentsOf(p);
  const replies = extraOf(p.id).replies;
  $("#cm-post-comment-count").textContent = comments.length;
  $("#cm-comments").innerHTML = comments.length
    ? comments
        .map(
          (c) => `
        <li class="cm-comment">
          <span class="cm-avatar cm-avatar-sm" aria-hidden="true">${escapeHtml(initial(c.author))}</span>
          <div class="cm-comment-main">
            <div class="cm-comment-meta">
              <button type="button" class="cm-user-link" data-action="profile" data-user="${escapeHtml(c.author)}">${escapeHtml(c.author)}</button>
              ${c.date ? `<span>${formatDate(c.date)}</span>` : ""}
            </div>
            <p>${escapeHtml(c.text)}</p>
            <div class="cm-comment-tools">
              <button type="button" class="cm-reply" data-action="reply" data-comment="${c.id}">답글</button>
              ${c.date && isMe(c.author) ? `<button type="button" class="cm-reply" data-delete-comment="${c.id}">삭제</button>` : ""}
            </div>
            ${(replies[c.id] || [])
              .map(
                (r) => `
              <div class="cm-sub-reply">
                <span class="cm-sub-arrow" aria-hidden="true">ㄴ</span>
                <div>
                  <div class="cm-comment-meta">
                    <button type="button" class="cm-user-link" data-action="profile" data-user="${escapeHtml(r.author)}">${escapeHtml(r.author)}</button>
                    <span>${formatDate(r.date)}</span>
                  </div>
                  <p>${escapeHtml(r.text)}</p>
                </div>
              </div>`,
              )
              .join("")}
            <form class="cm-reply-form" data-reply-form="${c.id}" hidden>
              <input type="text" maxlength="300" placeholder="${escapeHtml(c.author)}님에게 답글 남기기" required />
              <button type="submit" class="cm-btn cm-btn-primary">등록</button>
            </form>
          </div>
        </li>`,
        )
        .join("")
    : '<li class="cm-comment-empty">첫 댓글을 남겨 보세요.</li>';
};

const renderLike = (p) => {
  const liked = extraOf(p.id).liked;
  $("#cm-post-likes").textContent = likesOf(p);
  $("#cm-like").classList.toggle("is-liked", Boolean(user) && liked);
  $("#cm-like").setAttribute("aria-pressed", String(Boolean(user) && liked));
};

const openPost = (id) => {
  const p = findPost(id);
  if (!p) return;
  state.openPostId = id;
  extraOf(id).views += 1; // 조회수 +1
  save();

  $("#cm-post-board").textContent = p.notice ? `${p.notice} · 공지` : p.board;
  $("#cm-post-title").textContent = p.title;
  $("#cm-post-avatar").textContent = initial(p.author);
  $("#cm-post-author").textContent = p.author;
  $("#cm-post-author").dataset.user = p.author;
  $("#cm-post-date").textContent = isToday(p.date) ? `오늘 ${p.date}` : p.date;
  $("#cm-post-views").textContent = `조회 ${viewsOf(p).toLocaleString("ko-KR")}`;
  $("#cm-post-body").innerHTML = p.body.map((line) => `<p>${escapeHtml(line)}</p>`).join("");
  $("#cm-post-delete").hidden = !(p.mine && isMe(p.author));
  commentInput.value = "";
  renderLike(p);
  renderComments(p);
  render();
  if (!postDialog.open) postDialog.showModal();
  postDialog.querySelector(".cm-post").scrollTop = 0;
};

// ===== 회원 프로필 (로그인 후) =====
const openProfile = (name) => {
  const posts = allPosts().filter((p) => p.author === name);
  let commentCount = 0;
  allPosts().forEach((p) => {
    commentsOf(p).forEach((c) => {
      if (c.author === name) commentCount += 1;
      (extraOf(p.id).replies[c.id] || []).forEach((r) => {
        if (r.author === name) commentCount += 1;
      });
    });
  });

  $("#cm-profile-avatar").textContent = initial(name);
  $("#cm-profile-name").textContent = name;
  $("#cm-profile-role").textContent = name === "라팍지기" ? "매니저" : isMe(name) ? "나" : "멤버";
  $("#cm-profile-posts").textContent = posts.length;
  $("#cm-profile-comments").textContent = commentCount;
  $("#cm-profile-list").innerHTML = posts.length
    ? posts
        .map(
          (p) => `
        <li>
          <button type="button" class="cm-title-link" data-post="${p.id}">${escapeHtml(p.title)}</button>
          <span>${escapeHtml(p.notice ? "공지" : p.board)} · ${p.date}</span>
        </li>`,
        )
        .join("")
    : '<li class="cm-comment-empty">아직 작성한 글이 없어요.</li>';
  if (!profileDialog.open) profileDialog.showModal();
};

// ===== 글쓰기 (로그인 후) =====
const writeBoard = $("#cm-write-board");
writeBoard.innerHTML = BOARD_GROUPS.map(
  (group) => `
    <optgroup label="${escapeHtml(group.title)}">
      ${group.boards.map((b) => `<option value="${escapeHtml(b)}">${escapeHtml(b)}</option>`).join("")}
    </optgroup>`,
).join("");

const openWrite = () => {
  $("#cm-write-form").reset();
  writeBoard.value = state.board !== "all" ? state.board : "자유게시판";
  writeDialog.showModal();
  $("#cm-write-title").focus();
};

$("#cm-write-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = $("#cm-write-title").value.trim();
  const body = $("#cm-write-body").value.trim();
  if (!title || !body) return;
  const post = {
    id: Date.now(),
    board: writeBoard.value,
    author: user.nickname,
    createdAt: new Date().toISOString(),
    views: 0,
    likes: 0,
    title,
    body: body.split(/\n+/).map((line) => line.trim()).filter(Boolean),
    comments: [],
  };
  data.posts.unshift(post);
  save();
  writeDialog.close();
  refresh();
  openPost(post.id);
});

// ===== 로그인이 필요한 동작 처리 =====
const askLogin = () => {
  if (!loginDialog.open) loginDialog.showModal();
};

const actions = {
  write: openWrite,
  join: () => {
    data.joined = true;
    save();
    renderAuth();
  },
  profile: (button) => openProfile(button.dataset.user || button.textContent.trim()),
  like: () => {
    const p = findPost(state.openPostId);
    if (!p) return;
    const extra = extraOf(p.id);
    extra.liked = !extra.liked;
    save();
    renderLike(p);
  },
  reply: (button) => {
    const form = document.querySelector(`[data-reply-form="${button.dataset.comment}"]`);
    if (!form) return;
    form.hidden = !form.hidden;
    if (!form.hidden) form.querySelector("input").focus();
  },
};

document.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (actionButton) {
    event.preventDefault();
    if (!user) return askLogin();
    actions[actionButton.dataset.action]?.(actionButton);
    return;
  }

  // 게시판 선택
  const boardButton = event.target.closest(".cm-boards [data-board]");
  if (boardButton) {
    state.board = boardButton.dataset.board;
    document.querySelector(".cm-board-all").classList.toggle("is-active", state.board === "all");
    renderBoards();
    render();
    if (window.matchMedia("(max-width: 900px)").matches) {
      document.querySelector(".cm-board-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return;
  }

  // 게시글 열기 (목록·프로필 어디서든)
  const postLink = event.target.closest("[data-post]");
  if (postLink) {
    if (profileDialog.open) profileDialog.close();
    openPost(Number(postLink.dataset.post));
    return;
  }

  // 내 댓글 삭제
  const deleteComment = event.target.closest("[data-delete-comment]");
  if (deleteComment && user) {
    const extra = extraOf(state.openPostId);
    const id = deleteComment.dataset.deleteComment;
    extra.comments = extra.comments.filter((c) => !(c.id === id && isMe(c.author)));
    delete extra.replies[id];
    save();
    renderComments(findPost(state.openPostId));
    render();
  }
});

// 댓글 등록
$("#cm-comment-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!user) return askLogin();
  const text = commentInput.value.trim();
  if (!text) return commentInput.focus();
  extraOf(state.openPostId).comments.push({
    id: `u${Date.now()}`,
    author: user.nickname,
    text,
    date: new Date().toISOString(),
  });
  save();
  commentInput.value = "";
  renderComments(findPost(state.openPostId));
  render();
});

commentInput.addEventListener("focus", () => {
  if (user) return;
  commentInput.blur();
  askLogin();
});

// 답글 등록
$("#cm-comments").addEventListener("submit", (event) => {
  const form = event.target.closest("[data-reply-form]");
  if (!form) return;
  event.preventDefault();
  if (!user) return askLogin();
  const input = form.querySelector("input");
  const text = input.value.trim();
  if (!text) return;
  const replies = extraOf(state.openPostId).replies;
  (replies[form.dataset.replyForm] ??= []).push({
    author: user.nickname,
    text,
    date: new Date().toISOString(),
  });
  save();
  renderComments(findPost(state.openPostId));
});

// 내 글 삭제
$("#cm-post-delete").addEventListener("click", () => {
  const p = findPost(state.openPostId);
  if (!p || !p.mine || !isMe(p.author)) return;
  if (!window.confirm("이 글을 삭제할까요?")) return;
  data.posts = data.posts.filter((post) => post.id !== p.id);
  delete data.extras[p.id];
  save();
  postDialog.close();
  refresh();
});

// 로그아웃
$("#cm-logout").addEventListener("click", () => {
  try {
    localStorage.removeItem(USER_KEY);
  } catch {
    // 무시
  }
  user = null;
  refresh();
});

// 목록 도구
hideNoticeEl.addEventListener("change", render);
$("#cm-search").addEventListener("submit", (event) => {
  event.preventDefault();
  state.keyword = searchInput.value.trim();
  render();
});
searchInput.addEventListener("search", () => {
  state.keyword = searchInput.value.trim();
  render();
});

// 닫기 버튼 / 바깥 영역 클릭으로 닫기
document.querySelectorAll("[data-close-dialog]").forEach((button) =>
  button.addEventListener("click", () => button.closest("dialog").close()),
);
[postDialog, loginDialog, writeDialog, profileDialog].forEach((dialog) =>
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  }),
);

// 다른 탭에서 로그인/로그아웃하면 바로 반영
window.addEventListener("storage", (event) => {
  if (event.key === USER_KEY) {
    user = readJSON(USER_KEY, null);
    refresh();
  }
});

refresh();
