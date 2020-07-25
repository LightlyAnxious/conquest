import { Counter, Item } from '../../js/main/class.js';
import { attrAvailabilityCheck } from '../js/favorites.js';
import { removeActiveClass } from '../../js/main/utils.js';

const cartToggle = document.querySelector('#cart-toggle');
const cartBtns = document.querySelectorAll('.cart-btn');
const closeCartBtn = document.querySelector('.cart__close-btn');
const cartOverlay = document.querySelector('.overlay');
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

  increase() {
    let currentAmount = this.amount;
    this.amount = ++currentAmount;

    CartItem.sumTotal();

    return this.amount;
  }

  decrease() {
    let currentAmount = this.amount;
    this.amount = --currentAmount;

    CartItem.sumTotal();

    return this.amount;
  }

  getAmount(selector, cb) {
    const amount = this.$layout.querySelector(selector);

    cb;
    amount.value = this.amount;
    CartItem.sumTotal();

    return amount;
  }

  // Метод назначающий все обработчики
  bindAll() {
    const deleteToggle = this.$layout.querySelector('.cart__delete');
    const plusButton = this.$layout.querySelector('.cart__count-btn--plus');
    const minusButton = this.$layout.querySelector('.cart__count-btn--minus');
    const amountBox = this.$layout.querySelector('.cart__count-input');

    amountBox.value = this.amount;

    deleteToggle.addEventListener('click', () => {
      deleteToggle.parentNode.parentNode.remove();

      cartCounter.decrease();
      if (cartCounter.count === 0) cartCounter.hide();

      CartItem.sumTotal();

      displayCartTip();
    });

    plusButton.addEventListener('click', () => {
      this.getAmount('.cart__count-input', this.increase());
    });

    minusButton.addEventListener('click', () => {
      if (this.amount > 1)
        this.getAmount('.cart__count-input', this.decrease());
      if (this.amount === 1) return null;
    });
  }

  // Метод вычисляющий сумму всех товаров в корзине
  static sumTotal() {
    const defaultCurrency = ' ₽';
    const amounts = [];
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
}

// Функция показа подсказки
const displayCartTip = () => {
  const addedItems = document.querySelectorAll('.cart__item');
  const tip = document.querySelector('.cart__tip');

  if (addedItems.length > 0) tip.classList.add('cart__tip--hidden');
  if (addedItems.length === 0) tip.classList.remove('cart__tip--hidden');

  return tip;
};

// Функция подсчета и показа количества товаров в корзине
const toCountCartItems = () => {
  cartCounter.increase();
  cartCounter.show();

  return cartCounter.count;
};

// Функция закрытия корзины по клику вне окна
const onDocumentClickCloseCart = evt => {
  const cartBox = document.querySelector('.cart');
  const overlay = document.querySelector('.overlay');

  if (!cartBox.contains(evt.target))
    removeActiveClass(overlay, 'overlay--shown');
};

// * Создание счетчика количества "избранного"
const cartCounter = new Counter({
  count: 0,
  selector: '#cart-counter'
});

// * Функция создания и добавления товара в корзину
const dropCartItem = (ctx, amount, template, container) => {
  const cartItem = new CartItem({
    name: ctx.querySelector('.catalog__brand').textContent,
    price: ctx.querySelector('.catalog__price').textContent,
    image: ctx.querySelector('.catalog__image').cloneNode(true),
    vendor: ctx.dataset.vendor,
    amount: amount
  });

  cartItem.create(template, '.cart__name', '.cart__price-tag', '.cart__media');

  cartItem.$layout.querySelector('.catalog__image').style.height = '100%';
  cartItem.add(container);
  cartItem.bindAll();
  CartItem.sumTotal();

  cartItemsToVendors.set(cartItem, cartItem.vendor);

  return cartItem;
};

// !  Функция обработчик по нажатию на кнопку избранного в меню
const onCartClickToggleOverlay = () => {
  const cart = document.querySelector('.cart');
  const overlay = document.querySelector('.overlay');

  overlay.classList.toggle('overlay--shown');
  cart.classList.toggle('cart--shown');

  displayCartTip();
};

// ! Функция обработчик по нажатию на кнопку лайк
const cartBtnClickHandler = evt => {
  let itemTemplate = cartItemTemplate.cloneNode(true);
  const targetItem = evt.target.closest('.catalog__item');
  const targetVendor = targetItem.dataset.vendor;
  const cartList = document.querySelector('.cart__list');
  const addedItems = cartList.querySelectorAll('.cart__item');

  // Если товара еще нет в корзине то добавляем его
  if (!attrAvailabilityCheck(addedItems, targetVendor))
    dropCartItem(targetItem, 1, itemTemplate, cartList);
  // В обратном случае увеличиваем его количество в корзине
  if (attrAvailabilityCheck(addedItems, targetVendor))
    for (let [key, value] of cartItemsToVendors) {
      if (value === targetVendor) {
        const duplicate = key;

        duplicate.getAmount('.cart__count-input', duplicate.increase());
      }
    }

  // Cчетчик добавленных товаров
  toCountCartItems();

  return cartList;
};

cartBtns.forEach(btn => {
  btn.addEventListener('click', cartBtnClickHandler);
});

closeCartBtn.addEventListener('click', () => {
  removeActiveClass(cartOverlay, 'overlay--shown');
});
cartToggle.addEventListener('click', onCartClickToggleOverlay, false);
document.addEventListener('mouseup', onDocumentClickCloseCart);
