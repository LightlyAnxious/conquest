import { onEscEvent, breakpointChecker } from '../../js/main/utils';

const searchForm = document.querySelector('.search');
const searchBtn = document.querySelector('#search-btn');
const searchField = document.querySelector('.search__field');
const headerLogo = document.querySelector('.page-header__logo-link');
const userSection = document.querySelector('.page-header__user-section');
const mobile = window.matchMedia('(max-width: 450px)');

const closeSearch = () => {
  if (searchField.classList.contains('search__field--expanded')) {
    searchField.classList.remove('search__field--expanded');
  }
};

// * Обработчик по нажатию на кнопку поиска

const onClickControlSearch = () => {
  let isFocused = document.activeElement === searchField;

  if (mobile.matches === true) {
    searchField.classList.toggle('search__field--expanded');
    headerLogo.classList.toggle('page-header__logo-link--collapsed');
    userSection.classList.toggle('page-header__user-section--expanded');
  } else {
    searchField.classList.toggle('search__field--expanded');
  }

  if (!isFocused) {
    searchField.focus();
  } else if (isFocused) {
    searchForm.submit();
  }
};

// *  Обработчик фокуса поиска

const onBlurCollapseSearch = () => {
  closeSearch();
};

searchForm.addEventListener('submit', evt => {
  evt.preventDefault();
  closeSearch();
});
searchBtn.addEventListener('click', onClickControlSearch, false);
// searchField.addEventListener('blur', () => {}, false);
window.addEventListener('keydown', evt => {
  onEscEvent(evt, closeSearch);
});
