import { sortItems, filter } from './main/forms.js';
import { initCatalog, catalogItemType } from './main/factory';
import './main/sliders.js';
import './main/backend.js';
import './main/factory.js';
import './main/navigation.js';
import './main/forms.js';
import './main/modal.js';
import yall from 'yall-js';

const eventsTrigger = document.querySelector('[data-type="trigger"]');

// ! Инициализация плагина yall-js

document.addEventListener('DOMContentLoaded', () =>
  yall({
    observeChanges: true,
    noPolyfill: true
  })
);

// * Генерация интерфейса и товаров каталога
if (filter) {
  initCatalog(catalogItemType, sortItems, filter.process);
  filter.priceFilter.on('change', () => {
    initCatalog(catalogItemType, sortItems, filter.process);
  });
  eventsTrigger.addEventListener('input', () => {
    initCatalog(catalogItemType, sortItems, filter.process);
  });
}
