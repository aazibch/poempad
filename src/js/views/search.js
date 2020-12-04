import { elements } from './base';

export const getInput = () => elements.searchField.value;

export const renderResults = (results, pageNum = 1, resPerPage = 8) => {
    const pageQuantity = Math.ceil(results.length / resPerPage);
    const start = (pageNum - 1) * resPerPage;
    const visibleResults = [...results].splice(start, resPerPage);

    for (let x of visibleResults) {
        renderResult(x);
    }

    renderButtons(pageQuantity, pageNum);
}

const renderResult = (result) => {
    elements.searchResultsList.insertAdjacentHTML('beforeend',
        `<li>
            <a class="search-results__link" href="#${encodeURIComponent(result.title)}" data-title="${result.title.replace(/"/g, '&quot;')}">
                <h3 class="search-results__title">${shortenTerm(result.title, 27)}</h3>
                <p class="search-results__author">${shortenTerm(result.author, 45)}</p>
            </a>
        </li>`
    );
};

const shortenTerm = (term, permittedLength) => {
    if (term.length > permittedLength) {
        const updatedTerm = [];

        let length = 0;
        term.split(' ').forEach(word => {
            length += word.length;

            if (length <= permittedLength) {
                updatedTerm.push(word);
            }
        });

        updatedTerm.push('...');

        return updatedTerm.join(' ');
    } else {
        return term;
    }
}

const renderButtons = (pageQuantity, currentPage) => {
    if (currentPage !== 1 && currentPage <= pageQuantity) {
        createButton('prev', currentPage);
    }

    if (currentPage !== pageQuantity) {
        createButton('next', currentPage);
    }
}

const createButton = (type, currentPage) => {
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

export const highlightSelected = (hashVal) => {
    const selectedClass = 'search-results__link--selected';
    const resultElements = document.querySelectorAll('.search-results__link');

    for (let x of resultElements) {
        x.classList.remove(selectedClass);
    }

    document.querySelector(`a[href="${hashVal}"]`).classList.add(selectedClass);
};

export const clearResults = () => {
    elements.searchResultsButtons.innerHTML = '';
    elements.searchResultsList.innerHTML = '';
}