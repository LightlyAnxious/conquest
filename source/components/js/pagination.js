const pagItems = document.querySelectorAll('.pagination__item');

for (const i = 0; i < pagItems.length; i++) {
  let counter = i + 1;
  let string = 'Страница ' + counter;

  if (pagItems[i].getAttribute('aria-current')) {
    string = 'Страница ' + counter + ', текущая траница';
  }

  pagItems[i].setAttribute('aria-label', string);
}
