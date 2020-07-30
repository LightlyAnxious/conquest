import { favorites } from './favorites.js';
import { cart } from './cart.js';
import Pagination from 'tui-pagination';

class PageInterface {
  constructor(params) {
    this._dataBase = params.dataBase;
    this._renderCb = params.renderCb;
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
    this.currentPage = params.initialPage;
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

      async function refreshPage() {
        await this.renderItems();
        favorites.bindItemBtn();
        cart.bindItems();
        return this;
      }

      refreshPage.call(this);
    });

    return paging;
  }

  renderItems() {
    const indexIndent = 1;
    const targetPages = this.currentPage + this.itemsPerPage - indexIndent;
    const targetData = this._dataBase.slice(
      this.currentPage - indexIndent,
      targetPages
    );

    targetData.forEach(itemData => {
      return this._renderCb(itemData, this.itemsContainer);
    });

    return this.itemsContainer;
  }

  init() {
    if (this.itemsContainer) {
      this.renderItems();
      this.bindPaging();
      cart.init();
      favorites.bindAll();

      return this.itemsContainer;
    }
  }

  clear() {
    this.itemsContainer.textContent = '';
  }
}

export { PageInterface };
