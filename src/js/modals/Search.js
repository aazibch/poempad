import axios from 'axios';

export default class Search {
    constructor (query) {
        this.query = query;
    }

    async getResults() {
        console.log('query', this.query);
        const results = await axios(`https://poetrydb.org/title/${this.query}`);
        this.results = results.data;
    }
}