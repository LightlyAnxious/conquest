import './main/navigation.js';
import './main/sliders.js';
import './main/forms.js';
import './main/modal.js';
import yall from 'yall-js';

// ! Инициализация плагина yall-js

document.addEventListener('DOMContentLoaded', () =>
  yall({
    observeChanges: true,
    noPolyfill: true
  })
);
