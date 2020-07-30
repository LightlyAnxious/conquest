const ENTER_KEYCODE = 13;
const ESC_KEYCODE = 27;
let winX = null,
  winY = null;

// * Добавление активного класса элементу
const addActiveClass = (el, activeClass) => {
  if (!el.classList.contains(activeClass)) {
    el.classList.add(activeClass);
  }

  return el;
};

// * Удаление активного класса у элемента
const removeActiveClass = (el, activeClass) => {
  if (el.classList.contains(activeClass)) {
    el.classList.remove(activeClass);
  }

  return el;
};

// * Функция блокировки скролла

window.addEventListener('scroll', function() {
  if (winX !== null && winY !== null) {
    window.scrollTo(winX, winY);
  }
});

function disableWindowScroll() {
  winX = window.scrollX;
  winY = window.scrollY;
}

function enableWindowScroll() {
  winX = null;
  winY = null;
}

// * Функция проверки медиа запросов

const breakpointChecker = function(media, enableCallback, disableCallback) {
  if (media.matches === true) {
    return enableCallback();
  } else if (media.matches === false) {
    return disableCallback();
  }
};

// * Функция обработки нажатия esc

const onEscEvent = function(evt, action) {
  if (evt.keyCode === ESC_KEYCODE) {
    action();
  }
};

// * Функция создания кнопки

const createBtn = btnClass => {
  let btn = document.createElement('button');
  btn.classList.add(btnClass);

  return btn;
};

// * Debounce

function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this,
      args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// * Функция отображения кнопок слайдера

const manageControls = (
  prevCssClass,
  nextCssClass,
  currentSlider,
  index,
  length
) => {
  const prevBtn = document.querySelector(prevCssClass);
  const nextBtn = document.querySelector(nextCssClass);

  if (prevBtn && currentSlider && index > 0) {
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
  }

  if (prevBtn && currentSlider && index === 0) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'block';
  }

  if (prevBtn && currentSlider && index === length - 1) {
    nextBtn.style.display = 'none';
  }
};

// * Функция изменения состояния aria-expanded

const setExpanded = el => {
  let isExpanded = el.getAttribute('aria-expanded') === 'true' || false;

  el.setAttribute('aria-expanded', !isExpanded);

  return el;
};

const turnOffListener = function(event, elem, callback, capture) {
  if (typeof elem === 'function') {
    capture = callback;
    callback = elem;
    elem = window;
  }
  capture = capture ? true : false;
  elem = typeof elem === 'string' ? document.querySelector(elem) : elem;
  if (!elem) return;
  elem.removeEventListener(event, callback, capture);
};

export {
  ESC_KEYCODE,
  ENTER_KEYCODE,
  disableWindowScroll,
  enableWindowScroll,
  breakpointChecker,
  onEscEvent,
  debounce,
  manageControls,
  setExpanded,
  createBtn,
  addActiveClass,
  removeActiveClass,
  turnOffListener
};
