const filterForm = document.querySelector('#filter-form');
const colorButtons = document.querySelectorAll('.filters__color-btn');
const colorPicker = document.querySelector('#color-picker');

//Задание фонового цвета для кнопок

// Функция=обработчик по нажатию на кнопку выбора цвета
const onClickSelectColor = toggle => {
  let color = colorPicker.value;
  color = toggle.dataset.color;
};

if (colorButtons) {
  colorButtons.forEach(btn => {
    btn.addEventListener('click', () => onClickSelectColor(btn));
    btn.style.backgroundColor = btn.dataset.color;
  });
}

if (filterForm) {
  const filterButtons = filterForm.querySelectorAll('button');
  // Отменяет действие отправки по нажатию на кнопки в форме
  filterButtons.forEach(btn => {
    btn.addEventListener('click', evt => evt.preventDefault());
  });
}
