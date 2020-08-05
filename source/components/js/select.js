const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder || 'Дефолтный текст';
  const items = data.map(item => {
    let selectedClass = '';
    if (item.id === selectedId) {
      text = item.value;
      selectedClass = 'selected';
    }
    return `
    <li class="select__item" aria-role="option">
      <button type="button" class="select__btn ${selectedClass}" data-type="item" data-id="${item.id}">
        ${item.value}
      </button>
    </li>
    `;
  });

  return `
  <div class="select__backdrop" data-type="backdrop"></div>
  <input class="visually-hidden" data-type="trigger" aria-hidden="true" value=""></input>
  <button type="button" id="select-input" class="select__input" data-type="input" aria-controls="select-dropdown" aria-current="true">
    <span data-type="value">${text}</span>
  </button>
  <div id="select-dropdown" class="select__dropdown" aria-labelledby="select-input" aria-expanded="false">
    <ul class="select__list">
      ${items.join('')}
    </ul>
  </div>`;
};

class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;

    this.render();
    this.setup();
  }

  render() {
    const { placeholder, data } = this.options;
    if (this.$el) {
      this.$el.classList.add('select');
      this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
    }
  }

  setup() {
    if (this.$el) {
      this.clickHandler = this.clickHandler.bind(this);
      this.$el.addEventListener('click', this.clickHandler);
      this.$value = this.$el.querySelector('[data-type="value"]');
      this.$el.setAttribute('aria-role', 'select');
    }
  }

  ally() {
    const dropdown = this.$el.querySelector('#select-dropdown');
    let isExpanded = dropdown.getAttribute('aria-expanded') === 'true' || false;

    dropdown.setAttribute('aria-expanded', !isExpanded);
  }

  clickHandler(evt) {
    const { type } = evt.target.dataset;

    if (type === 'input' || type === 'value') {
      this.toggle();
    } else if (type === 'item') {
      const id = evt.target.dataset.id;

      this.select(id);
    }

    if (type === 'backdrop') this.close();

    this.ally();
  }

  get isOpen() {
    return this.$el.classList.contains('open');
  }

  get current() {
    return this.options.data.find(item => item.id === this.selectedId);
  }

  select(id) {
    let trigger = this.$el.querySelector('[data-type="trigger"]');
    this.selectedId = id;
    this.$value.textContent = this.current.value;

    this.$el
      .querySelectorAll('[data-type="item"]')
      .forEach(el => el.classList.remove('selected'));
    this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected');
    trigger.setAttribute('value', this.current.value);
    trigger.dispatchEvent(new Event('input', { bubbles: true }));

    this.options.onSelect ? this.options.onSelect(this.current) : null;
    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$el.classList.add('open');
  }

  close() {
    this.$el.classList.remove('open');
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler);
    this.$el.innerHTML = '';
  }
}

export { Select };
