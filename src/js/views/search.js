import { elements } from './base';

export const getInput = () => elements.searchField.value;

export const showSpinner = () => elements.searchSpinner.style.display = 'inline-block';

export const hideSpinner = () => elements.searchSpinner.style.display = 'none';

export const renderResults = (results, pageNum = 1, resPerPage = 8) => {
    const pageQuantity = Math.ceil(results.length / resPerPage);
    const start = (pageNum - 1) * resPerPage;
    const visibleResults = [...results].splice(start, resPerPage);

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
        createButton('prev', currentPage);
    }

    if (currentPage !== pageQuantity) {
        createButton('next', currentPage);
    }
}

export const createButton = (type, currentPage) => {
    let icon = 'right';
    let buttonContent = `
        Next
        <i class="fas fa-caret-${icon}"></i>`;
    let nextPage = currentPage + 1;

    if (type === 'prev') {
        icon = 'left';
        buttonContent = `
            <i class="fas fa-caret-${icon}"></i>
            Previous`;
        nextPage = currentPage - 1;
    }

    elements.searchResultsButtons.insertAdjacentHTML('beforeend', `
        <button class="button search-results__button search-results__button--${type}" type="button" data-goto="${nextPage}">
            ${buttonContent}
        </button>
    `);
}

export const clearResults = () => {
    elements.searchResultsButtons.innerHTML = '';
    elements.searchResultsList.innerHTML = '';
}