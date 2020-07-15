import {
  onEscevent,
  breakpointChecker,
  disableWindowScroll,
  enableWindowScroll
} from '../../js/main/utils';
import focusManager from 'focus-manager';

const menuBtn = document.querySelector('.hamburger-btn');
const tablet = window.matchMedia('(max-width: 1139px)');

if (menuBtn) {
  // * Функция-обработчик нажатия на кнопку меню

  const onMenuBtnClickMenuToggle = () => {
    const menuList = document.querySelector('.menu__list');
    const menuContainer = document.querySelector('.menu__wrap');
    const userSection = document.querySelector('.page-header__user-section');
    let expanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
    menuBtn.setAttribute('aria-expanded', !expanded);

    menuBtn.classList.toggle('hamburger-btn--active');
    menuContainer.classList.toggle('menu__wrap--fullscreen');
    menuList.classList.toggle('menu__list--shown');

    userSection.classList.toggle('page-header__user-section--shifted');

    if (menuList.classList.contains('menu__list--shown')) {
      focusManager.capture(menuContainer);
      disableWindowScroll();
    } else {
      focusManager.release(menuContainer);
      enableWindowScroll();
    }
  };

  menuBtn.addEventListener('click', onMenuBtnClickMenuToggle);
}
