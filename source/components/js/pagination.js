import { CatalogItem } from '../../js/main/factory.js';
import { cart } from './cart.js';
import Pagination from 'tui-pagination';
import db from '../../../conguest.db.json';

class PageInterface {
  constructor(params) {
    this.pagingContainerClass = params.pagingContainerClass;
    this.itemsContainer = document.querySelector(params.itemsContainerClass);
    this.totalItems = params.totalItems;
    this.itemsPerPage = params.itemsPerPage;
    this.visiblePages = params.visiblePages;
    this.initialPage = params.initialPage;
    this.centerAlign = false;
    this.firstItemClass = params.firstItemClass;
    this.lastItemClass = params.lastItemClass;
    this.pageClass = params.pageClass;
    this.currentPageClass = params.currentPageClass;
    this.moveButtonClass = params.moveButtonClass;
    this.disabledMoveButtonClass = params.disabledMoveButtonClass;
    this.moreButtonClass = params.moreButtonClass;
    this.template = {
      page: `<li class="pagination__item"><a href="#" class="${this.pageClass}">{{page}}</a></li>`,
      currentPage:
        '<li class="pagination__item"><strong class="pagination__link pagination__link--current" aria-current="true">{{page}}</strong></li>',
      moveButton:
        '<button class="pagination__btn pagination__btn--{{type}}"></button>',
      disabledMoveButton:
        '<span class="pagination__btn pagination__btn--{{type}} pagination__btn--disabled"></span>',
      moreButton:
        '<li class="pagination__item"><a href="#" class="pagination__link">...</a></li>'
    };
    this.$paging = '';
    this.currentPage;
  }

  createPaging() {
    const pagination = new Pagination(this.pagingContainerClass, {
      totalItems: this.totalItems,
      itemsPerPage: this.itemsPerPage,
      visiblePages: this.visiblePages,
      page: this.initialPage,
      centerAlign: this.centerAlign,
      firstItemClassName: this.firstItemClass,
      lastItemClassName: this.lastItemClass,
      template: this.template
    });

    return pagination;
  }

  bindPaging() {
    const paging = this.createPaging();

    this.$paging = paging;

    paging.on('beforeMove', () => {
      this.clear();
    });

    paging.on('afterMove', evt => {
      this.currentPage = evt.page;
      this.renderItems(this.currentPage);
      cart.init();
    });

    return paging;
  }

  renderItems(pageNumber) {
    const indexIndent = 1;
    const targetPages = pageNumber + this.itemsPerPage - indexIndent;
    const targetData = db.slice(pageNumber - indexIndent, targetPages);

    targetData.forEach(itemData => {
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
      this.itemsContainer.appendChild(catalogFragment);
    });

    return this.itemsContainer;
  }

  init() {
    if (this.itemsContainer) {
      let items = this.renderItems(this.initialPage);
      this.bindPaging();
      cart.init();

      return items;
    }
  }

  clear() {
    this.itemsContainer.textContent = '';
  }
}

const paginationOptions = {
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

const catalogInterface = new PageInterface(paginationOptions);

catalogInterface.init();
