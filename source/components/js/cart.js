import { Counter, Item } from '../../js/main/class.js';
import { removeActiveClass } from '../../js/main/utils.js';

// Пары товар - артикул
const cartItemsToVendors = new Map();
const cartItemTemplate = document
  .querySelector('#cart-item')
  .content.querySelector('.cart__item');

// Класс для создания объектов в избранном
class CartItem extends Item {
  constructor(params) {
    super(params);
    this.amount = params.amount;
  }

  // Метод создающий элементы
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
  // Подсчет общего количества добавленных товаров
  toCount() {
    const totalCountField = document.querySelector('#total-count');

    totalCountField.value = Cart.countTotal();

    totalCountField.dispatchEvent(new Event('input', { bubbles: true }));

    return totalCountField.value;
  }

  increaseAmount() {
    this.amount += 1;

    return this.amount;
  }

  decreaseAmount() {
    this.amount -= 1;

    return this.amount;
  }
  // Вывод количества товаров в соответствующий элемент
  initAmountBox() {
    const amountBox = this.$layout.querySelector('.cart__count-input');
    amountBox.value = this.amount;

    return amountBox;
  }

  // Метод назначающий все обработчики
  bindAll() {
    const plusButton = this.$layout.querySelector('.cart__count-btn--plus');
    const minusButton = this.$layout.querySelector('.cart__count-btn--minus');
    const deleteToggle = this.$layout.querySelector('.cart__delete');
    const currentItem = deleteToggle.parentNode.parentNode;

    const deleteToggleClickHandler = () => {
      for (let [key, value] of cartItemsToVendors) {
        if (value === currentItem.dataset.vendor) {
          cartItemsToVendors.delete(key);
        }
      }

      this.amount = 0;
      currentItem.remove();

      Cart.sumTotal();
      this.toCount();

      return;
    };

    const minusBtnClickHandler = () => {
      if (this.amount >= 1) this.decreaseAmount();

      if (this.amount === 0) deleteToggleClickHandler();

      this.initAmountBox();
      Cart.sumTotal();
      this.toCount();

      return this.amount;
    };

    plusButton.addEventListener('click', () => {
      this.increaseAmount();
      this.initAmountBox();
      Cart.sumTotal();
      this.toCount();
    });

    minusButton.addEventListener('click', minusBtnClickHandler);

    deleteToggle.addEventListener('click', deleteToggleClickHandler);
  }

  init() {
    this.initAmountBox();
    this.bindAll();
  }
}

class Cart extends Counter {
  constructor(params) {
    super(params);
    this.cartContainer = document.querySelector(params.cartContainerSelector);
    this.cartToggle = document.querySelector(params.cartToggleSelector);
    this.counterContainer = document.querySelector(params.counterSelector);
  }
  // Возвращает коллекцию всех добавленных элементов
  collectItems() {
    const cartItems = document.querySelectorAll('.cart__item');

    return cartItems;
  }

  // Показ подсказки
  displayCartTip() {
    const addedItems = this.collectItems();
    const tip = document.querySelector('.cart__tip');

    if (addedItems.length > 0) tip.classList.add('cart__tip--hidden');
    if (addedItems.length === 0) tip.classList.remove('cart__tip--hidden');

    return tip;
  }

  // Cоздание и добавление товара в корзину
  dropCartItem(ctx, amount, template, container) {
    const cartItem = new CartItem({
      name: ctx.querySelector('.catalog__brand').textContent,
      price: ctx.querySelector('.catalog__price').textContent,
      image: ctx.querySelector('.catalog__image').cloneNode(true),
      vendor: ctx.dataset.vendor,
      amount: amount
    });

    cartItem.create(
      template,
      '.cart__name',
      '.cart__price-tag',
      '.cart__media'
    );

    cartItem.$layout.querySelector('.catalog__image').style.height = '100%';
    cartItem.add(container);
    cartItem.init();
    Cart.sumTotal();

    cartItemsToVendors.set(cartItem, cartItem.vendor);

    return cartItem;
  }
  // Поиск дублирующихся товаров
  findDuplicate(vendor) {
    let duplicate = null;
    for (let [key, value] of cartItemsToVendors) {
      if (value === vendor) {
        duplicate = key;
      }
    }

    return duplicate;
  }

  bindMenu() {
    const totalCountField = document.querySelector('#total-count');
    const closeCartBtn = document.querySelector('.cart__close-btn');
    const overlay = document.querySelector('.overlay');
    // *  Функция обработчик по нажатию на кнопку корзины в меню
    const cartToggleClickHandler = () => {
      const overlay = document.querySelector('.overlay');

      overlay.classList.toggle('overlay--shown');
      this.cartContainer.classList.toggle('cart--shown');

      this.displayCartTip();
    };

    // Функция закрытия корзины по клику вне окна
    const onDocumentClickCloseCart = evt => {
      const cartBox = document.querySelector('.cart');

      if (!cartBox.contains(evt.target))
        removeActiveClass(overlay, 'overlay--shown');
    };

    // Закрытие корзины по клику на оверлей
    closeCartBtn.addEventListener('click', () => {
      removeActiveClass(overlay, 'overlay--shown');
    });

    totalCountField.addEventListener('input', () => {
      this.count = totalCountField.value;
      this.initCounter();
    });

    this.cartToggle.addEventListener('click', cartToggleClickHandler, false);
    document.addEventListener('mouseup', onDocumentClickCloseCart);

    return this;
  }

  bindItems() {
    const cartBtns = document.querySelectorAll('.cart-btn');

    // ! Функция обработчик по нажатию на кнопку добавления в корзину
    const cartBtnClickHandler = evt => {
      let itemTemplate = cartItemTemplate.cloneNode(true);
      const targetItem = evt.target.closest('.catalog__item');
      const targetVendor = targetItem.dataset.vendor;
      const cartList = document.querySelector('.cart__list');
      const duplicate = this.findDuplicate(targetVendor);

      // Если товара еще нет в корзине то добавляем его
      if (!duplicate) this.dropCartItem(targetItem, 1, itemTemplate, cartList);

      if (duplicate) {
        duplicate.amount++;
        duplicate.initAmountBox();
      }
      Cart.countTotal();

      // Cчетчик добавленных товаров
      this.increaseCount();
      this.showCounter();

      return cartList;
    };

    cartBtns.forEach(btn => {
      btn.addEventListener('click', cartBtnClickHandler);
    });

    return this.cartContainer;
  }

  bindAll() {
    this.bindMenu();
    this.bindItems();
  }

  init() {
    this.displayCartTip();
    this.bindAll();
  }

  // Метод вычисляющий сумму всех товаров в корзине
  static sumTotal() {
    const defaultCurrency = ' ₽';
    const priceTags = document.querySelectorAll('.cart__price-tag');
    const priceBox = document.querySelector('#total-price');
    const prices = [];

    if (priceTags && priceTags.length != 0) {
      priceTags.forEach(tag => {
        let amountField = tag.nextElementSibling.nextElementSibling.querySelector(
          '.cart__count-input'
        );
        let price = tag.textContent.split(' ');
        let newPrice = amountField.value * price[0];
        prices.push(newPrice);
      });

      const sumAll = prices.reduce((a, b) => {
        return +a + +b;
      });

      const totalSum = sumAll + defaultCurrency;

      priceBox.textContent = totalSum;

      return priceBox;
    }

    priceBox.textContent = 0 + defaultCurrency;

    return priceBox;
  }

  // Метод вычисляющий количество всех товаров в корзине
  static countTotal() {
    let items = [...cartItemsToVendors.keys()];
    let amounts = items.map(item => item.amount);

    if (amounts.length != 0) {
      const totalCount = amounts.reduce((a, b) => {
        return a + b;
      });

      return totalCount;
    }

    return 0;
  }
}

const cart = new Cart({
  count: 0,
  counterSelector: '#cart-counter',
  cartContainerSelector: '.cart',
  cartToggleSelector: '#cart-toggle'
});

export { cart };
