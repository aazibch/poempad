import { elements } from './base';

export const getInput = () => elements.searchField.value;

export const renderResults = (results, pageNum = 1) => {
    const resPerPage = 8;    
    const start = (pageNum - 1) * resPerPage;
    const visibleResults = results.splice(start, resPerPage);

    for (let x of visibleResults) {
        renderResult(x);
    }
}

export const renderResult = (result) => elements.searchResultsList.insertAdjacentHTML('beforeend',
    `<li>
        <a class="search-results__link" href="#">
            <h3 class="search-results__title">${result.title}</h3>
            <p class="search-results__author">${result.author}</p>
        </a>
    </li>`
);

export const clearResults = () => {
    elements.searchResultsList.innerHTML = '';
}