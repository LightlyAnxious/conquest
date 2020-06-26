import Swiper from 'swiper';
const tablet = window.matchMedia('(min-width: 768px)');

// * Опции слайдеров

const promoSliderOptions = {
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
    disableOnInteraction: false
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  }
};
const advantagesSliderOptions = {
  slidesPerView: 1,
  slidesPerGroup: 1,
  a11y: true,
  initialSlide: 0,
  observer: true,
  updateOnWindowResize: true,
  navigation: {
    nextEl: '.advantages__control-btn--next',
    prevEl: '.advantages__control-btn--prev'
  },
  runCallbacksOnInit: true,
  on: {
    init: function() {
      const sliderNumerationBar = document.querySelector(
        '.advantages__slider-progress'
      );

      sliderNumerationBar.innerHTML = '0' + (this.realIndex + 1);
    },

    slideChange: function() {
      const sliderNumerationBar = document.querySelector(
        '.advantages__slider-progress'
      );

      sliderNumerationBar.innerHTML = '0' + (this.realIndex + 1);
    }
  },
  loop: true,
  speed: 1000,
  // autoplay: {
  //   delay: 4000,
  //   disableOnInteraction: false
  // },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  }
};

// ! Инициализация слайдеров

const promoSlider = new Swiper('.swiper1', promoSliderOptions);
const advantagesSlider = new Swiper('.swiper2', advantagesSliderOptions);

// ! Вычисление и задание высоты слайдеру блока "Promo"

let root = document.documentElement;
let sliderHeight = '';
function calcPromoSlider() {
  let headerHeight = document
    .querySelector('.main-header')
    .getBoundingClientRect().height;
  let promoHeight = document.querySelector('.promo').getBoundingClientRect()
    .height;
  let sliderHeight = headerHeight + promoHeight;
  root.style.setProperty('--sliderHeight', sliderHeight + 'px');
}

window.addEventListener('load', calcPromoSlider, false);
window.addEventListener('resize', calcPromoSlider, false);
