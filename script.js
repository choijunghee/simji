const totalPages = 37; // 🔥 페이지 수정

const flipbook = $("#flipbook");
let zoomLevel = 1;

// 📄 페이지 생성
for (let i = 1; i <= totalPages; i++) {
  flipbook.append(`
    <div><img src="images/page${i}.jpg"></div>
  `);
}

// 👉 홀수 페이지면 마지막 빈 페이지 추가 (책 균형)
if (totalPages % 2 !== 0) {
  flipbook.append(`<div></div>`);
}

// 📱 모바일 체크
function isMobile() {
  return window.innerWidth < 768;
}

// 📖 초기화
function initFlipbook() {

  const width = isMobile()
    ? window.innerWidth * 0.95
    : window.innerWidth * 0.9;

  const height = isMobile()
    ? window.innerHeight * 0.85
    : window.innerHeight * 0.9;

  flipbook.turn({
    width: width,
    height: height,
    autoCenter: true,
    display: isMobile() ? "single" : "double",
    duration: 800,
    gradients: true,
    elevation: 50
  });
}

// 🔄 재로드
function reloadFlipbook() {
  if (flipbook.data("turn")) {
    flipbook.turn("destroy");
  }
  initFlipbook();
}

// 🚀 실행
$(document).ready(function () {
  initFlipbook();
});

// 🔄 반응형 대응
window.addEventListener("resize", function () {
  reloadFlipbook();
});

// ▶ 다음
function nextPage() {
  flipbook.turn("next");
}

// ◀ 이전
function prevPage() {
  flipbook.turn("previous");
}

/////////////////////////////////////////////////////
// 🖱 마우스 휠 페이지 넘김
/////////////////////////////////////////////////////
window.addEventListener("wheel", function (e) {

  if (zoomLevel > 1) return;

  if (e.deltaY > 0) {
    flipbook.turn("next");
  } else {
    flipbook.turn("previous");
  }
});

/////////////////////////////////////////////////////
// 🔍 더블클릭 확대
/////////////////////////////////////////////////////
document.getElementById("flipbook").addEventListener("dblclick", function () {

  zoomLevel = (zoomLevel === 1) ? 2 : 1;

  this.style.transform = `scale(${zoomLevel})`;
});

/////////////////////////////////////////////////////
// ⌨ 키보드 확대
/////////////////////////////////////////////////////
document.addEventListener("keydown", function (e) {

  if (e.key === "+") zoomLevel += 0.2;
  if (e.key === "-") zoomLevel = Math.max(1, zoomLevel - 0.2);

  document.getElementById("flipbook").style.transform =
    `scale(${zoomLevel})`;
});