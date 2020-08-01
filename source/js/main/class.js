class Counter {
  constructor(params) {
    this.count = params.count;
    this.$counterBox = document.querySelector(params.counterSelector);
  }

  showCounter() {
    if (this.count > 0) this.$counterBox.style.display = 'block';
  }

  hide() {
    if (this.count === 0) this.$counterBox.style.display = 'none';
  }

  increaseCount() {
    this.count++;
    this.initCounter();
    return this.count;
  }

  decreaseCount(value = 0) {
    if (value) {
      const result = this.count - value;

      this.count = result;
    } else if (this.count) {
      this.count--;
    }

    this.initCounter();
    return this.count;
  }

  initCounter() {
    if (this.count) {
      this.showCounter();
      this.$counterBox.dataset.counter = this.count;
    }

    this.hide();
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
    if (this.$layout) container.appendChild(this.$layout);

    return container;
  }

  remove(toggle) {
    toggle.parentNode.remove();

    return;
  }
}

export { Counter, Item };
