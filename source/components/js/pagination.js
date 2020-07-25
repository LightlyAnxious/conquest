import { CatalogItem } from '../../js/main/factory.js';
import db from '../../../conguest.db.json';

const paginationOptions = {
  totalCount: db.length, // Общее количество элементов
  itemPerPage: 12, // Количество отоюражаемых элементов на одной странице
  initialPage: 1, // Стартовая страница
  displayedPages: 5, // Количество единовременно отображаемых страниц
  location: '.catalog__pagination', // Селектор используемый для рендера
  db, //  База данных для создания объектов
  get totalPages() {
    // Вычисление общего количества страниц
    return Math.ceil(this.totalCount / this.itemPerPage);
  }
};

class Pagination {
  constructor(params) {
    this.totalCount = params.totalCount;
    this.itemPerPage = params.itemPerPage;
    this.initialPage = params.initialPage;
    this.totalPages = params.totalPages;
    this.displayedPages = params.displayedPages;
    this.location = params.location;
    this.db = params.db;
  }
  // * Метод создающий разметку пагинации
  createLayout() {
    // Функция для создания страниц
    const createPages = () => {
      const pages = [];
      const indexIndent = 1;
      const trimStart = Math.abs(this.displayedPages - this.initialPage);
      const trimEnd = this.totalPages - trimStart - indexIndent;

      const createPage = (isCurrent = true, text, index) => {
        const currentClass = isCurrent ? 'pagination__link--current' : '';
        const pageTemplate = `
          <li class="pagination__item">
            <a class="pagination__link ${currentClass}" data-page-index="${index}">
            ${text}
            </a>
          </li>
        `;

        return pageTemplate;
      };

      for (let i = 1; i <= this.totalPages; i++) {
        // Условие для размещения брейкпоинта
        if (i === this.breakpoint && this.totalPages > this.displayedPages)
          pages.push(createPage(false, '...', i));
        if (i === this.initialPage) pages.push(createPage(true, i, i));
        if (i !== this.initialPage && i !== this.breakpoint)
          pages.push(createPage(false, i, i));
      }

      // Коррекция выводимых за один раз страниц
      pages.splice(trimStart, trimEnd);

      return pages;
    };
    // Функция создания кнопок переключения
    const createControl = (direction, isActive = true, allyText) => {
      const directionClass =
        direction === 'back'
          ? 'pagination__btn--prev'
          : direction === 'next'
          ? 'pagination__btn--next'
          : '';
      const activeClass = !isActive ? 'pagination__btn--disabled' : '';
      const modifiers = [directionClass, activeClass];
      const pagingButtonTemplate = `<button class="pagination__btn ${modifiers.join(
        ' '
      )}" aria-label="${allyText}"></button>`;

      return pagingButtonTemplate;
    };

    const pagingPrevBtn = createControl(
      'back',
      false,
      'На предыдущую страницу'
    );

    const pagingNextBtn = createControl('next', true, 'На предыдущую страницу');

    const pagingList = `<ul class="pagination__list">${createPages().join(
      ''
    )}</ul>`;
    const paging = `<nav class="pagination" aria-label="Pagination">${pagingPrevBtn}${pagingList}${pagingNextBtn}</nav>`;

    return paging;
  }

  addAlly() {
    const paginationLinks = document.querySelectorAll('.pagination__link');

    paginationLinks.forEach((link, index) => {
      let counter = index + 1;
      let string = 'Страница ' + counter;

      if (link.getAttribute('aria-current')) {
        string = 'Страница ' + counter + ', текущая траница';
      }

      link.setAttribute('aria-label', string);
    });
  }

  createPagination() {
    const pagingContainer = document.querySelector(this.location);
    const pagingLayout = this.createLayout();

    pagingContainer.insertAdjacentHTML('beforeend', pagingLayout);
  }

  // Метод возвращающий индекс брейкпоинта
  get breakpoint() {
    return this.displayedPages - 1;
  }
}

const catalogPagination = new Pagination(paginationOptions);

catalogPagination.createPagination();
