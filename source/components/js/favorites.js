import { Counter, Item } from '../../js/main/class.js';
import { removeActiveClass } from '../../js/main/utils.js';

const favoriteBtn = document.querySelector('#favorites');
const likeBtns = document.querySelectorAll('.like-btn');
const favoriteItemTemplate = document
  .querySelector('#favorites-item')
  .content.querySelector('.favorites__item');

// ! Класс для создания объектов в избранном
class FavoriteItem extends Item {
  constructor(params) {
    super(params);
  }

  // Метод создающий избранные элементы
  create(itemTemplate, nameSelector, priceSelector, imgSelector) {
    let newItem = itemTemplate.cloneNode(true);
    let newName = newItem.querySelector(nameSelector);
    let newPrice = newItem.querySelector(priceSelector);
    let newImg = newItem.querySelector(imgSelector);

    newName.textContent = this.name;
    newPrice.textContent = this.price;
    newImg.appendChild(this.image);

    this.$layout = newItem;

    newItem.dataset.vendor = this.vendor;

    return newItem;
  }

  // Метод назначаюший все обработчики
  bindAll() {
    const deleteToggle = this.$layout.querySelector('#delete-btn');
    const sourceItem = document.querySelector(
      `li[data-vendor='${this.vendor}']`
    );
    const likeBtn = sourceItem.querySelector('.like-btn');

    deleteToggle.addEventListener('click', () => {
      likeBtn.classList.remove('like-btn--active');
      deleteToggle.parentNode.remove();

      displayFavoritesTip();
      favoriteCounter.decreaseCount();
      if (favoriteCounter.count === 0) favoriteCounter.hideCounter();
    });
  }
}

// Функция вычисляющая положение блока "избранное"
const calcFavorites = () => {
  let root = document.documentElement;
  let headerHeight = document
    .querySelector('.page-header')
    .getBoundingClientRect().height;

  root.style.setProperty('--favoritesTop', headerHeight + 'px');
};

// Функция показа подсказки
const displayFavoritesTip = () => {
  const addedItems = document.querySelectorAll('.favorites__item');
  const tip = document.querySelector('.favorites__tip');

  if (addedItems.length > 0) tip.classList.add('favorites__tip--hidden');
  if (addedItems.length === 0) tip.classList.remove('favorites__tip--hidden');

  return tip;
};

// Функция закрытия избранного по клику вне окна
const onDocumentClickCloseFavorites = evt => {
  const favoritesBox = document.querySelector('.favorites');

  if (
    !favoritesBox.contains(evt.target) &&
    !evt.target.parentNode.classList.contains('like-btn') &&
    !evt.target.parentNode.classList.contains('page-header__link')
  )
    removeActiveClass(favoritesBox, 'favorites--shown');
};

// * Создание счетчика количества "избранного"
const favoriteCounter = new Counter({
  count: 0,
  counterSelector: '#likes-counter'
});

// Функции увеличения и показа количества товаров в избранном
const increaseLikes = () => {
  favoriteCounter.increaseCount();
  favoriteCounter.showCounter();
  return favoriteCounter.count;
};

const decreaseLikes = () => {
  favoriteCounter.decreaseCount();
  if (favoriteCounter.count === 0) favoriteCounter.hideCounter();
  return favoriteCounter.count;
};

// Функция проверки на наличие товара в избранном по артикулу
const attrAvailabilityCheck = (arr, value) => {
  const vendors = [];
  arr.forEach(el => {
    if (el.dataset.vendor == value) {
      vendors.push(el);
    }
  });

  return vendors.length;
};

// Функция поиска товара в избранном по артикулу
const findIndexByVendor = (vendorsArray, vendor) => {
  return vendorsArray.indexOf(vendor);
};

// !  Функция обработчик по нажатию на кнопку избранного в меню
const onFavBtnClickToggleModal = () => {
  const favorites = document.querySelector('.favorites');

  displayFavoritesTip();

  favorites.classList.toggle('favorites--shown');
};

// ! Функция обработчик по нажатию на кнопку лайк
const likeBtnClickHandler = evt => {
  let itemTemplate = favoriteItemTemplate.cloneNode(true);
  let likeBtn = evt.target.closest('.like-btn');
  const targetItem = evt.target.closest('.catalog__item');
  const targetVendor = targetItem.dataset.vendor;
  const favoritesList = document.querySelector('.favorites__list');
  const addedItems = favoritesList.querySelectorAll('.favorites__item');

  if (likeBtn.classList.contains('like-btn'))
    likeBtn.classList.toggle('like-btn--active');

  // Если элемента еще нет в избранном и кнопка содержит активный класс
  if (
    !attrAvailabilityCheck(addedItems, targetVendor) &&
    likeBtn.classList.contains('like-btn--active')
  ) {
    // Создаем небходимый объект
    const favoriteItem = new FavoriteItem({
      name: targetItem.querySelector('.catalog__brand').textContent,
      price: targetItem.querySelector('.catalog__price').textContent,
      image: targetItem.querySelector('.catalog__image').cloneNode(true),
      vendor: targetItem.dataset.vendor
    });

    favoriteItem.create(
      itemTemplate,
      '.favorites__name',
      '.favorites__price',
      '.favorites__media'
    );

    favoriteItem.add(favoritesList);
    favoriteItem.bindAll();

    increaseLikes();
  }

  // Если у кнопки удален активный класс удаляем соответствующмй элемент
  if (!likeBtn.classList.contains('like-btn--active')) {
    // Ищем и удаляем из избранного элемент соответвующий кнопке
    const addedVendors = [];
    addedItems.forEach(item => {
      addedVendors.push(item.dataset.vendor);
    });

    const deletedIndex = findIndexByVendor(addedVendors, targetVendor);

    addedItems[deletedIndex].remove();

    decreaseLikes();
  }

  return favoritesList;
};

likeBtns.forEach(btn => {
  btn.addEventListener('click', likeBtnClickHandler);
});

favoriteBtn.addEventListener('click', onFavBtnClickToggleModal, false);
window.addEventListener('load', calcFavorites, false);
window.addEventListener('resize', calcFavorites, false);
document.addEventListener('mouseup', onDocumentClickCloseFavorites);

export { attrAvailabilityCheck, findIndexByVendor };
