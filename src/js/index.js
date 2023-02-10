import '../scss/main.scss';
import Search from './models/Search';
import Poem from './models/Poem';
import * as searchView from './views/search';
import * as poemView from './views/poem';
import {
    elements,
    renderSpinner,
    removeSpinner,
    renderErrorMessage,
    removeErrorMessages
} from './views/base';

const state = {};

const controlSearch = async (e) => {
    e.preventDefault();
    // 1) Get query from view
    const searchQuery = searchView.getInput();

    // 2) Create new Search object and edit state
    state.search = new Search(searchQuery);

    // 3) Prepare UI for results
    searchView.clearResults();
    removeErrorMessages();
    renderSpinner(elements.searchResults);

    try {
        // 4) Get results
        await state.search.getResults();
        removeSpinner();

        if (state.search.results.status === 404) {
            renderErrorMessage(elements.searchResults, 'No results found.');
        } else {
            // 5) Render results to the UI
            searchView.renderResults(state.search.results);
        }
    } catch (err) {
        removeSpinner();
        renderErrorMessage(elements.searchResults);
    }
};

const controlPoem = async () => {
    const { hash } = window.location;

    if (hash) {
        // 1) Highlight the selected result
        if (state.search) searchView.highlightSelected(hash);

        // 2) Get poem title from hash and create new Poem object and edit state
        state.poem = new Poem(decodeURIComponent(hash).replace('#', ''));

        // 3) Prepare UI for poem
        poemView.clearPoem();
        removeErrorMessages();
        renderSpinner(elements.poem);

        try {
            // 4) Get poem
            await state.poem.getPoem();
            removeSpinner();

            // 5) Render poem to the UI
            poemView.renderPoem({
                title: state.poem.title,
                author: state.poem.author,
                lines: state.poem.lines
            });
        } catch (err) {
            removeSpinner();
            renderErrorMessage(elements.poem);
        }
    }
};

elements.searchForm.addEventListener('submit', controlSearch);

elements.searchResultsButtons.addEventListener('click', (e) => {
    const button = e.target.closest('.search-results__button');

    if (button) {
        searchView.clearResults();
        searchView.renderResults(state.search.results, +button.dataset.goto);
    }
});

['load', 'hashchange'].forEach((event) =>
    window.addEventListener(event, controlPoem)
);
