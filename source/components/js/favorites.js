import { Counter, Item } from '../../js/main/class.js';
import { removeActiveClass } from '../../js/main/utils.js';

const favoriteItemTemplate = document
  .querySelector('#favorites-item')
  .content.querySelector('.favorites__item');

// ! Класс для создания объектов в избранном
class FavoriteItem extends Item {
  constructor(params) {
    super(params);
    this.counterField = document.querySelector('#favorites-counter');
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
    const favoritesCounter = document.querySelector('#favorites-counter');
    const likeBtn = sourceItem.querySelector('.like-btn');

    deleteToggle.addEventListener('click', () => {
      likeBtn.classList.remove('like-btn--active');
      deleteToggle.parentNode.remove();

      if (favoritesCounter.value !== 0) favoritesCounter.value--;

      favoritesCounter.dispatchEvent(new Event('input', { bubbles: true }));

      return favoritesCounter;
    });
  }
}

class Favorites extends Counter {
  constructor(params) {
    super(params);
    this.container = document.querySelector('.favorites');
    this.counterField = document.querySelector('#favorites-counter');

    this.bindToggle();
  }

  // Функции увеличения и показа количества товаров в избранном
  increaseLikes() {
    this.increaseCount();
    this.counterField.value = this.count;
    this.showCounter();
    return this.count;
  }

  decreaseLikes() {
    this.decreaseCount();
    this.counterField.value = this.count;
    if (this.count === 0) this.hide();
    return this.count;
  }

  collectItems() {
    const addedItems = document.querySelectorAll('.favorites__item');

    return addedItems;
  }

  // Функция показа подсказки
  displayFavoritesTip() {
    const items = this.collectItems();
    const tip = document.querySelector('.favorites__tip');

    if (items.length > 0) tip.classList.add('favorites__tip--hidden');
    if (items.length === 0) tip.classList.remove('favorites__tip--hidden');

    return tip;
  }

  bindToggle() {
    const favoritesBtn = document.querySelector('#favorites');

    // !  Функция обработчик по нажатию на кнопку избранного в меню
    const onFavBtnClickToggleModal = () => {
      this.displayFavoritesTip();

      this.container.classList.toggle('favorites--shown');

      return this.container;
    };

    // Функция закрытия избранного по клику вне окна
    const onDocumentClickCloseFavorites = evt => {
      const favorites = document.querySelector('.favorites');
      if (
        !favorites.contains(evt.target) &&
        !evt.target.parentNode.classList.contains('like-btn') &&
        !evt.target.parentNode.classList.contains('page-header__link')
      )
        removeActiveClass(favorites, 'favorites--shown');
    };

    favoritesBtn.removeEventListener('click', onFavBtnClickToggleModal, false);
    favoritesBtn.addEventListener('click', onFavBtnClickToggleModal, false);

    document.addEventListener('mouseup', onDocumentClickCloseFavorites);

    return favoritesBtn;
  }

  bindItemBtn() {
    const likeBtns = document.querySelectorAll('.like-btn');
    const favoritesCounter = document.querySelector('#favorites-counter');

    const favoritesCounterInputHandler = () => {
      this.count = this.counterField.value;
      this.initCounter();
      if (this.count === 0) this.hideCounter();
    };

    // ! Функция обработчик по нажатию на кнопку лайк
    const likeBtnClickHandler = evt => {
      let itemTemplate = favoriteItemTemplate.cloneNode(true);
      let likeBtn = evt.target.closest('.like-btn');
      const targetItem = evt.target.closest('.catalog__item');
      const targetVendor = targetItem.dataset.vendor;
      const favoritesList = document.querySelector('.favorites__list');
      const addedItems = this.collectItems();

      if (likeBtn) likeBtn.classList.toggle('like-btn--active');

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
        favoritesCounter.value++;

        this.increaseLikes();
        this.initCounter();
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

        this.decreaseLikes();
        this.initCounter();
      }

      return favoritesList;
    };

    this.displayFavoritesTip();

    this.counterField.addEventListener('input', favoritesCounterInputHandler);

    likeBtns.forEach(btn => {
      btn.addEventListener('click', likeBtnClickHandler);
    });

    return likeBtns;
  }

  bindAll() {
    this.bindToggle();
    this.bindItemBtn();

    return this;
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

const favorites = new Favorites({
  count: 0,
  counterSelector: '#likes-counter'
});

// Вычисление положения блока "Избранное" при изменениях в браузере
window.addEventListener('load', calcFavorites, false);
window.addEventListener('resize', calcFavorites, false);

export { favorites };
