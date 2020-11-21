import { elements } from './base';

export const getInput = () => elements.searchField.value;

export const renderResults = (results) => {
    for (let x of results) {
        elements.searchResultsList.insertAdjacentHTML('beforeend',
        `<li>
            <a class="search-results__link" href="#">
                <h3 class="search-results__title">${x.title}</h3>
                <p class="search-results__author">${x.author}</p>
            </a>
        </li>`);
    }
    console.log('renderResults', results);
}

export const clearResults = () => {
    elements.searchResultsList.innerHTML = '';
}