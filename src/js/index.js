import '../scss/main.scss';
import Search from './modals/Search';
import * as searchView from './views/search';
import { elements } from './views/base';

const state = {};

const controlSearch = async (e) => {
    e.preventDefault();
    // 1) Get query from view
    const searchQuery = searchView.getInput();

    // 2) Create new Search object and edit state
    state.search = new Search(searchQuery);

    // 3) Prepare UI for results
    searchView.clearResults();

    // 4) Get results
    await state.search.getResults();

    // 5) Render results to the UI
    searchView.renderResults(state.search.results);
};

elements.searchForm.addEventListener('submit', controlSearch);