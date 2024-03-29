import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const results = await axios(
            `https://poetrydb.org/title/${this.query}/title,author,linecount`
        );
        this.results = results.data;
    }

    removeLongerPoems(linesLength = 100) {
        this.results = this.results.filter((res) => {
            return +res.linecount < 100;
        });
    }
}
