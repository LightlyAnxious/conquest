import { Select } from '../../components/js/select.js';

const select = new Select('#select', {
  placeholder: 'Choose the option',
  selectedId: '1',
  data: [
    { id: '1', value: 'По популярности' },
    { id: '2', value: 'По цене' },
    { id: '3', value: 'По новизне' }
  ],
  onSelect(item) {
    return item.id;
  }
});

const getSortOption = item => {
  const idToItemValues = {
    '1': item.relevantIndex,
    '2': item.price,
    '3': item.isNew
  };

  return idToItemValues[select.current.id];
};

const sortItems = (a, b) => {
  let firstItem = getSortOption(a);
  let seconditem = getSortOption(b);

  return firstItem - seconditem;
};

export { select, sortItems, getSortOption };
