class Counter {
  constructor(params) {
    this.count = params.count;
    this.$box = document.querySelector(params.selector);
  }

  show() {
    if (this.count > 0) this.$box.style.display = 'block';
  }

  hide() {
    if (this.count === 0) this.$box.style.display = 'none';
  }

  set amount(newCount) {
    this.count = newCount;
    this.$box.dataset.counter = newCount;
  }

  increase() {
    this.count++;
    this.$box.dataset.counter = this.count;
    return this.count;
  }

  decrease() {
    this.count--;
    this.$box.dataset.counter = this.count;
    return this.count;
  }
}

class Item {
  constructor(params) {
    this.type = params.type;
    this.name = params.name;
    this.brand = params.brand;
    this.price = params.price;
    this.image = params.image;
    this.vendor = params.vendor;
    this.$layout = null;
  }

  add(container) {
    container.appendChild(this.$layout);

    return container;
  }

  remove(toggle) {
    toggle.parentNode.remove();

    return;
  }
}

export { Counter, Item };
