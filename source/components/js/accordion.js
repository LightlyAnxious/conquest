import { setExpanded, breakpointChecker, debounce } from '../../js/main/utils';
// import webAnimations from 'web-animations-js';

const footerAccordionHeaders = document.querySelectorAll(
  '.accordion__button--footer'
);
const filtersAccordionHeaders = document.querySelectorAll(
  '.accordion__button--filters'
);
const mobile = window.matchMedia('(max-width: 530px)');

//Функция инициализации аккордеона
const accordionInit = (controls, media = false) => {
  Array.prototype.forEach.call(controls, accordionHeader => {
    let target = accordionHeader.parentElement.nextElementSibling;

    if (media) {
      const mobileAccordionChecker = () => {
        if (mobile.matches === true) {
          accordionHeader.setAttribute('aria-expanded', false);
        } else {
          accordionHeader.removeAttribute('aria-expanded');
        }
      };

      mobile.addListener(mobileAccordionChecker);

      mobileAccordionChecker();
    }

    const onClickControlAccordion = evt => {
      setExpanded(evt.target);
      target.classList.toggle('accordion__panel--expanded');

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
};

// Инициализация аккордеона для блока footer
accordionInit(footerAccordionHeaders, mobile);

// Инициализация аккордеона для блока filters
accordionInit(filtersAccordionHeaders);
