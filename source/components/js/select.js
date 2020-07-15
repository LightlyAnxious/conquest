const selects = document.querySelectorAll('.select');

selects.forEach(select => {
  //Выбираем все выпадающие списки на странице

  let selectCurrent = select.querySelector('.select__current'),
    selectList = select.querySelector('.select__list'),
    selectField = select.querySelector('.select__field'),
    selectItems = select.querySelectorAll('.select__item');

  selectCurrent.addEventListener('click', () => {
    //прячем дубликаты
    selectItems.forEach(item => {
      if (item.textContent === selectCurrent.textContent) {
        item.style.display = 'none';
      }
    });
    //по клику добавляем/удаляем класс
    select.classList.toggle('select--active');
    selectList.classList.toggle('select__list--shown');
  });

  //обходим элементы списка
  selectItems.forEach(item => {
    //обрабатываем событие клик по элементу
    item.addEventListener('click', () => {
      //получаем значение из data-атрибута
      let itemValue = item.getAttribute('data-value');

      //получаем содержание элемента (текст)
      let itemText = item.textContent;

      //присваиваем инпуту ранее полученное значение из data-атрибута
      selectField.value = itemValue;

      //присваиваем текущее значение (текст)
      selectCurrent.textContent = itemText;
      // присваиваем значение aria-label
      selectCurrent.setAttribute('aria-label', itemText);

      //скрываем выпадающий список
      selectListHide();
    });
  });

  // функция закрытия выпадающего списка
  let selectListHide = () => {
    //возвращаем дубликаты
    selectItems.forEach(item => {
      if (item.style.display == 'none') {
        item.style.display = 'block';
      }
    });

    select.classList.remove('select--active');
    selectList.classList.remove('select__list--shown');
  };
  //Закрываем выпадающий сисок, если клик был вне области
  document.addEventListener('mouseup', e => {
    if (!select.contains(e.target)) selectListHide();
  });
});
