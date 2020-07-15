// * Класс табов
class Tabs {
  constructor(dataClass, tabActiveClass, contentActiveClass) {
    this.dataClass = dataClass;
    this.tabActiveClass = tabActiveClass;
    this.contentActiveClass = contentActiveClass;
  }

  // * Метод отображающий начальное состояние табов
  init() {
    const menuElements = document.querySelectorAll(this.dataClass);

    menuElements.forEach(tabElement => {
      if (tabElement.classList.contains(this.tabActiveClass)) {
        // Находим id контента и назначаем ему активный класс и aria состояние
        const id = tabElement.dataset.tab;
        const tabContent = document.getElementById(id);

        tabContent.classList.add(this.contentActiveClass);

        const isHidden =
          tabContent.getAttribute('aria-hidden') === 'true' || false;
        tabContent.setAttribute('aria-hidden', !isHidden);
      }
    });
  }

  // * Метод назначающий обработчики всем переключателям табов
  bindAll() {
    const menuElements = document.querySelectorAll(this.dataClass);

    menuElements.forEach(tabElement => {
      tabElement.addEventListener(
        'click',
        evt => {
          this.change(evt);
        },
        false
      );
    });
  }

  // * Метод для очистки всех обработчиков
  clear() {
    const menuElements = document.querySelectorAll(this.dataClass);
    menuElements.forEach(tabElement => {
      tabElement.classList.remove(this.tabActiveClass);
      const id = tabElement.dataset.tab;
      document.getElementById(id).classList.remove(this.contentActiveClass);
    });
  }

  // * Метод смены отображаемого содержимого
  change(evt) {
    this.clear();

    evt.target.classList.add(this.tabActiveClass);

    const id = evt.currentTarget.dataset.tab;
    const tabContent = document.getElementById(id);

    tabContent.classList.add(this.contentActiveClass);

    const isHidden = tabContent.getAttribute('aria-hidden') === 'true' || false;
    tabContent.setAttribute('aria-hidden', !isHidden);
  }
}

const connectTabs = new Tabs(
  '[data-tab]',
  'tabs__link--active',
  'tabs__content--active'
);

connectTabs.init();
connectTabs.bindAll();
