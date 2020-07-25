import {
  Swiper as SwiperClass,
  Pagination,
  Navigation,
  Autoplay,
  EffectFade
} from 'swiper/core';
import { createRangeSlider } from '../../components/js/range-slider.js';
const promo = document.querySelector('.promo');
const slides = document.querySelectorAll('.card__image');

SwiperClass.use([Pagination, Autoplay, EffectFade, Navigation]);

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
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  }
};
const catalogSliderOptions = {
  a11y: true,
  initialSlide: 0,
  observer: true,
  updateOnWindowResize: true,
  navigation: {
    nextEl: '.slide-control--next',
    prevEl: '.slide-control--prev'
  },
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    550: {
      slidesPerView: 2,
      slidesPerGroup: 2
    },
    768: {
      slidesPerView: 3,
      slidesPerGroup: 3
    }
  }
};
const cardSliderOptions = {
  slidesPerView: 1,
  a11y: true,
  initialSlide: 0,
  observer: true,
  updateOnWindowResize: true,
  navigation: {
    nextEl: '.card__control--next',
    prevEl: '.card__control--prev'
  },
  pagination: {
    el: '.card__pagination',
    clickable: true,
    renderBullet: function(index, className) {
      return `<button class="${className} card__bullet"></button>`;
    }
  }
};

// Функция создания изображений для пагинации
function renderPaginationImages(imgClass) {
  const bullets = document.querySelectorAll('.swiper-pagination-bullet');

  bullets.forEach((bullet, index) => {
    let bulletImage = slides[index].cloneNode(true);
    let pictureElement = document.createElement('picture');
    pictureElement.classList.add(imgClass);
    pictureElement.appendChild(bulletImage);
    bullet.appendChild(pictureElement);
  });
}

// ! Инициализация слайдеров

const promoSlider = new SwiperClass('.swiper1', promoSliderOptions);
const advantagesSlider = new SwiperClass('.swiper2', advantagesSliderOptions);
const catalogSlider = new SwiperClass('.swiper3', catalogSliderOptions);
const cardSlider = new SwiperClass('.swiper4', cardSliderOptions);

// ! Вычисление и задание высоты слайдеру блока "Promo"

if (promo) {
  let root = document.documentElement;
  let sliderHeight = '';
  function calcPromoSlider() {
    let headerHeight = document
      .querySelector('.page-header')
      .getBoundingClientRect().height;
    let promoHeight = document.querySelector('.promo').getBoundingClientRect()
      .height;
    let sliderHeight = headerHeight + promoHeight;
    root.style.setProperty('--sliderHeight', sliderHeight + 'px');
  }

  window.addEventListener('load', calcPromoSlider, false);
  window.addEventListener('resize', calcPromoSlider, false);
}

renderPaginationImages('card__bullet-media');

createRangeSlider();
