import '../../components/js/menu.js';
import '../../components/js/accordion.js';
import '../../components/js/search.js';
import '../../components/js/select.js';
import '../../components/js/tabs.js';

const logoPicture = document.querySelector('.page-header__logo-picture');

const onKeyPressCancelTab = () => {
  if (logoPicture) {
    logoPicture.tabIndex = '-1';
  }
};

window.addEventListener('keydown', onKeyPressCancelTab);
