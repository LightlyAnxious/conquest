import './main/navigation';
import './main/sliders';

import yall from 'yall-js';

// ! Инициализация плагина yall-js

document.addEventListener('DOMContentLoaded', () =>
  yall({
    observeChanges: true,
    noPolyfill: true
  })
);
