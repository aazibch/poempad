export const elements = {
    searchForm: document.querySelector('.search'),
    searchResults: document.querySelector('.search-results'),
    searchField: document.querySelector('.search__field'),
    searchResultsList: document.querySelector('.search-results__list'),
    searchResultsButtons: document.querySelector('.search-results__buttons'),
    poemContent: document.querySelector('.poem__content'),
    poemHeader: document.querySelector('.poem__header'),
    poemBody: document.querySelector('.poem__body')
}

export const elementNames = {
    spinner: '.spinner',
    searchResultsButton: '.search-results__button'
}

export const renderSpinner = parentEl => {
    const spinner = `<div class="spinner"></div>`;

    parentEl.insertAdjacentHTML('afterbegin', spinner);
}

export const removeSpinner = () => {
    const spinner = document.querySelector(elementNames.spinner);

    if (spinner) spinner.parentElement.removeChild(spinner);
}