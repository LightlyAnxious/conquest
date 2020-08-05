import { Select } from '../../components/js/select.js';
import { createRangeSlider } from '../../components/js/range-slider.js';
import { initCatalog, catalogItemType } from './factory';

const filterForm = document.querySelector('#filter-form');
const colorButtons = document.querySelectorAll('.filters__color-btn');

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

// * Функция сортировки товаров
const sortItems = (a, b) => {
  let firstItem = getSortOption(a);
  let seconditem = getSortOption(b);

  return firstItem - seconditem;
};

class Filter {
  constructor(params) {
    this.container = document.querySelector(params.container);
    this.priceFilter = createRangeSlider();

    this.bind();
    this.setup();
  }

  bind() {
    if (
      document.querySelectorAll('[data-filter]').length !== 0 &&
      this.container
    ) {
      const filters = this.container.querySelectorAll('[data-filter]');
      const resetFiltersBtn = this.container.querySelector(
        '.filters__reset-btn'
      );

      filters.forEach(item => {
        item.addEventListener('change', () => {
          initCatalog(catalogItemType, sortItems, this.process);
        });
      });

      resetFiltersBtn.addEventListener('click', () => {
        filters.forEach(item => {
          item.checked = false;
          initCatalog(catalogItemType, sortItems, this.process);
        });
      });

      return filters;
    }
  }

  setup() {
    const colorPickers = this.container.querySelectorAll('[data-color]');

    if (colorPickers) {
      colorPickers.forEach(picker => {
        picker.nextElementSibling.style.backgroundColor = picker.dataset.color;
      });
    }

    this.process = this.process.bind(this);
  }

  process(item) {
    const filterPrice = item => {
      const prices = this.priceFilter.get();

      if (
        item.price >= Math.round(prices[0]) &&
        item.price <= Math.round(prices[1])
      )
        return true;
    };

    const filterBrand = item => {
      let passedItem = null;
      const brandFilters = this.container.querySelectorAll(
        '[data-filter][data-brand]:checked'
      );

      if (brandFilters.length !== 0) {
        brandFilters.forEach(filter => {
          if (item.brand === filter.dataset.brand.toLowerCase())
            passedItem = item;
        });

        return passedItem;
      } else {
        return true;
      }
    };

    const filterMechanism = item => {
      let passedItem = null;
      const mechFilters = this.container.querySelectorAll(
        '[data-filter][data-mechanism]:checked'
      );

      if (mechFilters.length !== 0) {
        mechFilters.forEach(filter => {
          if (item.mechanism === filter.dataset.mechanism.toLowerCase())
            passedItem = item;
        });

        return passedItem;
      } else {
        return true;
      }
    };

    const filterMaterial = item => {
      let passedItem = null;
      const materialFilters = this.container.querySelectorAll(
        '[data-filter][data-material]:checked'
      );

      if (materialFilters.length !== 0) {
        materialFilters.forEach(filter => {
          if (item.material === filter.dataset.material.toLowerCase())
            passedItem = item;
        });

        return passedItem;
      } else {
        return true;
      }
    };

    const filterColor = item => {
      let passedItem = null;
      const colorFilters = this.container.querySelectorAll(
        '[data-filter][data-color]:checked'
      );

      if (colorFilters.length !== 0) {
        colorFilters.forEach(filter => {
          if (item.color === filter.dataset.color.toLowerCase())
            passedItem = item;
        });

        return passedItem;
      } else {
        return true;
      }
    };

    let result =
      filterPrice(item) &&
      filterBrand(item) &&
      filterMechanism(item) &&
      filterMaterial(item) &&
      filterColor(item);

    return result;
  }
}

const filter = new Filter({ container: '#filter-form' });

if (filterForm) {
  const filterButtons = filterForm.querySelectorAll('button');
  // Отменяет действие отправки по нажатию на кнопки в форме
  filterButtons.forEach(btn => {
    btn.addEventListener('click', evt => evt.preventDefault());
  });
}

export { sortItems, filter };
