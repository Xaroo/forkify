'use strict';

import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  _renderButton(prev, next) {
    const currPage = this._data.page;
    let nextButton = '';
    let prevButton = '';
    if (prev === 1) {
      prevButton = `<button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
      </button>`;
    }

    if (next === 1) {
      nextButton = `
        <button data-goto="${
          currPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
        `;
    }
    return `${prevButton}${nextButton}`;
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //Page 1 but the are other pages
    if (currPage === 1 && numPages > 1) {
      return `${this._renderButton(0, 1)}`;
    }
    //Next page
    if (currPage < numPages) {
      return `${this._renderButton(1, 1)}`;
    }
    //Last page
    if (currPage === numPages && numPages > 1) {
      return `${this._renderButton(1, 0)}`;
    }
    //Page 1 and only
    return '';
  }

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = btn.dataset.goto;
      handler(goToPage);
    });
  }
}

export default new PaginationView();
