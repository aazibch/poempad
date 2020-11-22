import { elements } from './base';

export const getInput = () => elements.searchField.value;

export const showSpinner = () => elements.searchSpinner.style.display = 'inline-block';

export const hideSpinner = () => elements.searchSpinner.style.display = 'none';

export const renderResults = (results, pageNum = 1) => {
    const resPerPage = 8;
    const pageQuantity = Math.ceil(results.length / resPerPage);
    const start = (pageNum - 1) * resPerPage;
    const visibleResults = results.splice(start, resPerPage);

    for (let x of visibleResults) {
        renderResult(x);
    }

    renderButtons(pageQuantity, pageNum);
}

export const renderResult = (result) => elements.searchResultsList.insertAdjacentHTML('beforeend',
    `<li>
        <a class="search-results__link" href="#">
            <h3 class="search-results__title">${result.title}</h3>
            <p class="search-results__author">${result.author}</p>
        </a>
    </li>`
);

export const renderButtons = (pageQuantity, currentPage) => {
    if (currentPage !== 1 && currentPage <= pageQuantity) {
        elements.searchResultsButtons.insertAdjacentHTML('afterbegin', `
            <button class="button search-results__button search-results__button--prev" type="button" data-goto-page="${currentPage - 1}">
                <i class="fas fa-caret-left"></i>
                Previous
            </button>
        `);
    }

    if (currentPage !== pageQuantity) {
        elements.searchResultsButtons.insertAdjacentHTML('beforeend', `
            <button class="button search-results__button search-results__button--next" type="button" data-goto-page="${currentPage + 1}">
                Next
                <i class="fas fa-caret-right"></i>
            </button>
        `);
    }
}

export const clearResults = () => {
    elements.searchResultsList.innerHTML = '';
}