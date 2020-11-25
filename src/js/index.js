import '../scss/main.scss';
import Search from './modals/Search';
import Poem from './modals/Poem';
import * as searchView from './views/search';
import * as poemView from './views/poem';
import { elements, elementNames } from './views/base';

const state = {};

const controlSearch = async (e) => {
    e.preventDefault();
    // 1) Get query from view
    const searchQuery = searchView.getInput();

    // 2) Create new Search object and edit state
    state.search = new Search(searchQuery);

    // 3) Prepare UI for results
    searchView.clearResults();
    searchView.showSpinner();

    // 4) Get results
    await state.search.getResults();
    state.search.removeLongerPoems();
    searchView.hideSpinner();

    // 5) Render results to the UI
    searchView.renderResults(state.search.results);
};

const controlPoem = async (title) => {
    // 1) Create new Poem object and edit state
    state.poem = new Poem(title);

    // 2) Prepare UI for results
    poemView.clearPoem();
    poemView.showSpinner();

    // 3) Get results
    await state.poem.getPoem();
    poemView.hideSpinner();

    // 4) Render results to the UI
    poemView.renderPoem(state.poem.title, state.poem.author, state.poem.lines);
}

elements.searchResultsList.addEventListener('click', (e) => {
    const searchRes = e.target.closest(elementNames.searchResult);

    if (searchRes) controlPoem(searchRes.dataset.title);
});

elements.searchForm.addEventListener('submit', controlSearch);

elements.searchResultsButtons.addEventListener('click', (e) => {
    const button = e.target.closest(elementNames.searchResultsButton);

    if (button) {
        searchView.clearResults();
        searchView.renderResults(state.search.results, +button.dataset.goto);
    }
});