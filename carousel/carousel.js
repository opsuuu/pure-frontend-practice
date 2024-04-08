const items = document.querySelectorAll(".item");
const pagnation = document.querySelector(".carousel-pagnation");
const carouselBox = document.querySelector(".carousel-slider");

//自動添加照片及自動產生切換span.page
items.forEach((item, index) => {
  const image = document.createElement("img");
  const span = document.createElement("span");
  span.className = "page";
  //span增加索引屬性
  span.index = index;
  pagnation.appendChild(span);
  image.src = "./images/" + (index + 1).toString().padStart(2, "0") + ".jpg";
  item.appendChild(image);
});

let timer;
let totalIndex = items.length;
let currentIndex = 0;
let prevIndex = currentIndex - 1 < 0 ? totalIndex - 1 : currentIndex - 1;
let nextIndex = currentIndex + 1 == totalIndex ? 0 : currentIndex + 1;
let current, previous, next;
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const bg = document.querySelector("body");

let pages = document.querySelectorAll(".page");
pages[currentIndex].classList.add("active");

initCarousel();

//點擊切換鈕
pages.forEach((page) => {
  page.addEventListener("click", (e) => {
    //console.log(e.currentTarget.index);
    reset();
    currentIndex = e.currentTarget.index;
    prevIndex =
      e.currentTarget.index - 1 < 0
        ? totalIndex - 1
        : e.currentTarget.index - 1;
    nextIndex =
      e.currentTarget.index + 1 > totalIndex - 1
        ? 0
        : e.currentTarget.index + 1;
    carousel();
    resetCarouselTimer();
  });
});

//箭頭控制輪播
nextBtn.addEventListener("click", () => {
  reset();
  currentIndex = currentIndex + 1 <= totalIndex - 1 ? currentIndex + 1 : 0;
  prevIndex = currentIndex - 1 < 0 ? totalIndex - 1 : currentIndex - 1;
  nextIndex = currentIndex + 1 == totalIndex ? 0 : currentIndex + 1;
  carousel();
  resetCarouselTimer();
});

prevBtn.addEventListener("click", () => {
  reset();
  currentIndex = currentIndex - 1 < 0 ? totalIndex - 1 : currentIndex - 1;
  prevIndex = currentIndex - 1 < 0 ? totalIndex - 1 : currentIndex - 1;
  nextIndex = currentIndex + 1 == totalIndex ? 0 : currentIndex + 1;
  carousel();
  resetCarouselTimer();
});

//重置class們
function reset() {
  current.classList.remove("active");
  previous.classList.remove("previous");
  next.classList.remove("next");
  pages[currentIndex].classList.remove("active");
}

function carousel() {
  current = items[currentIndex];
  previous = items[prevIndex];
  next = items[nextIndex];
  current.classList.add("active");
  previous.classList.add("previous");
  next.classList.add("next");
  //背景圖更換
  bg.style.background =
    "url(./images/" + (currentIndex + 1).toString().padStart(2, "0") + ".jpg)";
  bg.style.backgroundSize = "cover";
  pages[currentIndex].classList.add("active");
}

//設定計時器
function carouselTimer() {
  timer = setInterval(() => {
    nextBtn.click();
  }, 3000);
}

//計時器重置
function resetCarouselTimer() {
  clearInterval(timer);
  carouselTimer();
}

//鼠標懸停效果
carouselBox.addEventListener("mouseenter", () => {
  clearInterval(timer);
  carousel();
});
carouselBox.addEventListener("mouseleave", () => {
  initCarousel();
  resetCarouselTimer();
});

//初始輪播
function initCarousel() {
  carousel();
  carouselTimer();
}
