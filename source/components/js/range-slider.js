import noUiSlider from 'nouislider';

const rangeSlider = document.querySelector('.filters__scale');

if (rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [12000, 90000],
    connect: true,
    step: 100,
    margin: 50000,
    range: {
      min: 0,
      max: 250000
    }
  });

  const handles = document.querySelectorAll('.noUi-handle');
  const range = document.querySelector('.noUi-connect');

  // * Функция генерации подсказки
  const renderTip = handle => {
    let toolTip = document.createElement('span');

    toolTip.classList.add('noUi-tip');
    toolTip.textContent = Math.round(handle.getAttribute('aria-valuenow'));

    handle.appendChild(toolTip);
  };

  // * Функция обновления подсказки при перетаскивании ползунка
  const onDragUpdateTip = () => {
    let newTips = document.querySelectorAll('.noUi-tip');
    const newHandles = document.querySelectorAll('.noUi-handle');

    newTips.forEach(function(newTip, index) {
      newTip.textContent = Math.round(
        newHandles[index].getAttribute('aria-valuenow')
      );
    });
  };

  // Создание подсказок
  handles.forEach(handle => {
    handle.style.cursor = 'pointer';
    renderTip(handle);
  });

  // Обновление подсказок
  rangeSlider.noUiSlider.on('update', onDragUpdateTip);
}
