import { onEscEvent } from '../main/utils.js';

const cardLinks = document.querySelectorAll('.card__link');
const overlay = document.querySelector('.overlay');

// * Функция закрытия модального окна
const closeModalView = () =>
  overlay.classList.contains('overlay--shown')
    ? overlay.classList.remove('overlay--shown')
    : null;

// * Функция создания изображения
const createImage = (source, imgClass = 'modal-view__image') => {
  let image = document.createElement('img');
  image.src = source;
  image.classList.add(imgClass);

  return image;
};

// * Функция создания кнопки закрытия
const createCloseBtn = () => {
  let closeBtn = document.createElement('button');
  closeBtn.setAttribute('aria-label', 'Закрыть просмотр');
  closeBtn.classList.add('modal-view__close');

  return closeBtn;
};

// * Функция создания модального экрана с изображением
const createModalView = source => {
  const modalView = document.querySelector('.modal-view');
  let fragment = document.createDocumentFragment();

  modalView.innerHTML = '';

  fragment.appendChild(createImage(source));
  fragment.appendChild(createCloseBtn());

  modalView.appendChild(fragment);
};

// * Функция обработчик по клику на слайды
const onClickRenderView = evt => {
  let target = evt.target;
  if (target.classList.contains('card__image')) {
    const src = target.getAttribute('data-srcset');
    const path = src.split(' ')[0];

    // Создание экрана просмотра
    createModalView(path);

    const closeModalBtn = document.querySelector('.modal-view__close');

    overlay.classList.add('overlay--shown');

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeModalView);
    }
  }
};

// * Назначение обработчиков для изображений
if (cardLinks) {
  cardLinks.forEach(link => {
    link.addEventListener(
      'click',
      evt => {
        onClickRenderView(evt);
      },
      true
    );
  });
}

window.addEventListener('keydown', evt => {
  onEscEvent(evt, closeModalView);
});

export { createImage };
