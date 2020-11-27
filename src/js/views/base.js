export const elements = {
    searchForm: document.querySelector('.search'),
    searchResults: document.querySelector('.search-results'),
    searchField: document.querySelector('.search__field'),
    searchResultsList: document.querySelector('.search-results__list'),
    searchResultsButtons: document.querySelector('.search-results__buttons'),
    poem: document.querySelector('.poem'),
    poemHeader: document.querySelector('.poem__header'),
    poemBody: document.querySelector('.poem__body')
}

export const elementNames = {
    spinner: '.spinner',
    errorMessage: '.error-message',
    searchResultsButton: '.search-results__button'
}

export const renderSpinner = parentEl => {
    const spinnerHtml = `<div class="spinner"></div>`;

    parentEl.insertAdjacentHTML('afterbegin', spinnerHtml);
}

export const removeSpinner = () => {
    const spinner = document.querySelector(elementNames.spinner);

    if (spinner) spinner.parentElement.removeChild(spinner);
}

export const renderErrorMessage = (parentEl, text = 'Something went wrong. Try again.') => {
    const html = `
        <div class="error-message">
            <p class="error-message__text">${text}</p>
            <i class="error-message__icon far fa-frown-open"></i>
        </div>`;

    parentEl.insertAdjacentHTML('afterbegin', html);    
}

export const removeErrorMessages = () => {
    const errorMessages = document.querySelectorAll(elementNames.errorMessage);

    if (errorMessages.length > 0) {
        for (let x of errorMessages) {
            x.parentElement.removeChild(x);
        }
    }
}