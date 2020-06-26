import {
  setHidden,
  setExpanded,
  breakpointChecker,
  debounce
} from '../../js/main/utils';
// import webAnimations from 'web-animations-js';

const accordionHeaders = document.querySelectorAll('.accordion__button');
const mobile = window.matchMedia('(max-width: 530px)');

// * Инициализация обработчиков и анимации для всех панелей аккордеона

Array.prototype.forEach.call(accordionHeaders, accordionHeader => {
  let target = accordionHeader.parentElement.nextElementSibling;

  const mobileAccordionChecker = () => {
    if (mobile.matches === true) {
      target.setAttribute('aria-hidden', true);
      accordionHeader.setAttribute('aria-expanded', false);
      target.hidden = true;
    } else {
      target.removeAttribute('aria-hidden');
      accordionHeader.removeAttribute('aria-expanded');
      target.hidden = false;
    }
  };

  mobile.addListener(mobileAccordionChecker);

  mobileAccordionChecker();

  const onClickControlAccordion = evt => {
    setHidden(target);
    setExpanded(evt.target);

    // * Анимация аккордеона

    target.animate(
      [
        {
          transformOrigin: 'top left',
          transform: `scaleY(0)`
        },
        {
          transformOrigin: 'top left',
          transform: `scaleY(1)`
        }
      ],
      {
        duration: 125,
        easing: 'ease-in-out',
        fill: 'both'
      }
    );
  };

  accordionHeader.addEventListener('click', evt => {
    onClickControlAccordion(evt);
  });
});
