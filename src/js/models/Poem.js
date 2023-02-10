import axios from 'axios';

export default class Poem {
    constructor(title) {
        this.title = title;
    }

    async getPoem() {
        const results = await axios(
            `https://poetrydb.org/title/${this.title}:abs/title,author,lines`
        );
        this.author = results.data[0].author;
        this.lines = results.data[0].lines;
    }
}
