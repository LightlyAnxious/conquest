const filterForm = document.querySelector('#filter-form');
const colorButtons = document.querySelectorAll('.filters__color-btn');
const colorPicker = document.querySelector('#color-picker');

//Задание фонового цвета для кнопок
const setBgColor = toggle =>
  (toggle.style.backgroundColor = toggle.dataset.color);

// Функция задающая передающая значение цвета инпуту
const setColorValue = toggle => {
  let color = colorPicker.value;
  color = toggle.dataset.color;

  return color;
};

// Обработчик по нажатию на кнопку цвета
const onColorBtnClickSetColor = (toggle, activeClass) => {
  toggle.classList.toggle(activeClass);

  setColorValue(toggle);
  setBgColor(toggle);
};

if (colorButtons) {
  colorButtons.forEach(btn => {
    if (btn.classList.contains('filters__color-btn--active')) {
      btn.classList.remove('filters__color-btn--active');
    }
    setBgColor(btn);
    btn.addEventListener('click', () =>
      onColorBtnClickSetColor(btn, 'filters__color-btn--active')
    );
  });
}

if (filterForm) {
  const filterButtons = filterForm.querySelectorAll('button');
  // Отменяет действие отправки по нажатию на кнопки в форме
  filterButtons.forEach(btn => {
    btn.addEventListener('click', evt => evt.preventDefault());
  });
}
