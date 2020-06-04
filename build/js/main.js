let burger = document.querySelector(".burger");
let menu = document.querySelector(".main-nav__menu");

if (burger && menu) {
  // * Функция-обработчик нажатия на кнопку меню

  let oncBurgerClickMenuToggle = () => {
    burger.classList.toggle("burger--active");
    menu.classList.toggle("main-nav__menu--shown");
  };

  burger.addEventListener("click", oncBurgerClickMenuToggle);
}

// ! Объявление слайдера для блока "Promo"

let promoSliderOptions = {
  slidesPerView: 1,
  slidesPerGroup: 1,
  a11y: true,
  initialSlide: 0,
  observer: true,
  updateOnWindowResize: true,
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
};

const promoSlider = new Swiper(".swiper1", promoSliderOptions);

// ! Вычисление и задание высоты слайдеру блока "Promo"

let root = document.documentElement;
let sliderHeight = "";
function calcPromoSlider() {
  let headerHeight = document
    .querySelector(".main-header")
    .getBoundingClientRect().height;
  let promoHeight = document.querySelector(".promo").getBoundingClientRect()
    .height;
  let sliderHeight = headerHeight + promoHeight;
  root.style.setProperty("--sliderHeight", sliderHeight + "px");
}

window.addEventListener("load", calcPromoSlider, false);
window.addEventListener("resize", calcPromoSlider, false);
