import db from '../../../conguest.db.json';
import { Item } from './class.js';

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

export { CatalogItem };

// db.forEach(item => {
//   const catalogList = document.querySelector('.catalog__list');

//   const catalogItem = new CatalogItem({
//     type: item.type,
//     brand: item.brand,
//     price: item.price,
//     vendor: item.vendor,
//     desktop: item.img.desktop,
//     tablet: item.img.tablet,
//     alt: item.img.alt
//   });

//   catalogItem.renderItem();

//   catalogItem.add(catalogList);

//   return catalogItem;
// });
