// import db from '../../../conguest.db.json';
import { Item } from './class.js';
import { readDbRequest, readUrl } from './backend.js';
import { PageInterface } from '../../components/js/pagination.js';

const catalogItemTemplate = document.querySelector('#catalog-item-template');

class CatalogItem extends Item {
  constructor(params) {
    super(params);
    (this.desktop = params.desktop),
      (this.tablet = params.tablet),
      (this.alt = params.alt);
  }

  // Метод создания единицы товара
  renderItem() {
    if (catalogItemTemplate)
      if (this.type === 'watch') {
        const catalogItem = catalogItemTemplate.content
          .querySelector('.catalog__item')
          .cloneNode(true);
        const currency = ' ₽';
        const itemBrand = catalogItem.querySelector('.catalog__brand');
        const itemPrice = catalogItem.querySelector('.catalog__price');
        const itemLink = catalogItem.querySelector('.catalog__link');
        const pictureTemplate = `
      <picture class="catalog__media-wrap">
        <!-- Webp -->

        <!-- Desktop -->
        <source
          media="(min-width: 1140px)"
          type="image/webp"
          srcset="img/placeholder.png"
          data-srcset="${this.desktop}@2x.webp 2x, ${this.desktop}.webp"
        >

        <!-- Tablet -->
        <source
          type="image/webp"
          srcset="img/placeholder.png"
          data-srcset="${this.tablet}@2x.webp 2x, ${this.tablet}.webp"
        >
        <!-- Png -->

        <!-- Desktop -->
        <source
          media="(min-width: 1140px)"
          srcset="img/placeholder.png"
          data-srcset="${this.desktop}@2x.webp 2x, ${this.desktop}.png"
        >

        <!-- Tablet -->
        <img
          style="height: 100%"
          class="catalog__image lazy"
          src="img/placeholder.png"
          data-srcset="${this.tablet}@2x.png 2x"
          data-src="${this.tablet}.png"
          alt="${this.alt}"
        >
      </picture>`;

        itemBrand.textContent = this.brand;

        itemPrice.textContent = this.price + currency;

        catalogItem.dataset.vendor = this.vendor;

        itemLink.insertAdjacentHTML('beforeend', pictureTemplate);

        this.$layout = catalogItem;

        return catalogItem;
      }
  }
}

const renderCatalogItem = (itemData, container) => {
  const catalogFragment = document.createDocumentFragment();
  const catalogItem = new CatalogItem({
    type: itemData.type,
    brand: itemData.brand,
    price: itemData.price,
    vendor: itemData.vendor,
    desktop: itemData.img.desktop,
    tablet: itemData.img.tablet,
    alt: itemData.img.alt
  });

  catalogItem.renderItem();

  catalogItem.add(catalogFragment);
  container.appendChild(catalogFragment);

  return container;
};

async function startInterface() {
  const responceData = await readDbRequest('GET', readUrl);
  const db = responceData.slice();

  const interfaceOptions = {
    dataBase: db,
    renderCb: renderCatalogItem,
    pagingContainerClass: 'pagination',
    itemsContainerClass: '.catalog__list',
    totalItems: db.length,
    itemsPerPage: 12,
    visiblePages: 6,
    initialPage: 1,
    centerAlign: false,
    firstItemClass: 'pagination__link--first-child',
    lastItemClass: 'pagination__link--last-child',
    pageClass: 'pagination__link',
    currentPageClass: 'pagination__link--current',
    moveButtonClass: 'pagination__btn',
    disabledMoveButtonClass: 'pagination__btn--disabled',
    moreButtonClass: 'pagination__link'
  };

  const catalogInterface = new PageInterface(interfaceOptions);

  return catalogInterface.init(db, renderCatalogItem);
}

startInterface();
