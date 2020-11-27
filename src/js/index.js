import '../scss/main.scss';
import Search from './modals/Search';
import Poem from './modals/Poem';
import * as searchView from './views/search';
import * as poemView from './views/poem';
import { elements, elementNames, renderSpinner, removeSpinner } from './views/base';

const state = {};

const controlSearch = async (e) => {
    e.preventDefault();
    // 1) Get query from view
    const searchQuery = searchView.getInput();
    
    // 2) Create new Search object and edit state
    state.search = new Search(searchQuery);

    // 3) Prepare UI for results
    searchView.clearResults();
    renderSpinner(elements.searchResults);

    // 4) Get results
    await state.search.getResults();
    state.search.removeLongerPoems();
    removeSpinner();

    // 5) Render results to the UI
    searchView.renderResults(state.search.results);
};

const controlPoem = async () => {
    if (window.location.hash) {
        // 1) Get poem title from the hash.
        const title = decodeURIComponent(window.location.hash).replace('#', '');

        // 2) Create new Poem object and edit state
        state.poem = new Poem(title);

        // 3) Prepare UI for results
        poemView.clearPoem();
        renderSpinner(elements.poemContent);

        // 4) Get results
        await state.poem.getPoem();
        removeSpinner();

        // 5) Render results to the UI
        poemView.renderPoem({
            title: state.poem.title,
            author: state.poem.author,
            lines: state.poem.lines
        });
    }
}

elements.searchForm.addEventListener('submit', controlSearch);

elements.searchResultsButtons.addEventListener('click', (e) => {
    const button = e.target.closest(elementNames.searchResultsButton);

    if (button) {
        searchView.clearResults();
        searchView.renderResults(state.search.results, +button.dataset.goto);
    }
});

['load', 'hashchange'].forEach(event => window.addEventListener(event, controlPoem));