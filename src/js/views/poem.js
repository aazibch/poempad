import { elements } from './base';

export const renderPoem = (poem) => {
    renderHeader(poem.title, poem.author);
    renderBody(poem.lines);
};

const renderHeader = (title, author) => {
    elements.poemHeader.insertAdjacentHTML('beforeend', `
        <header class="poem__header">
            <h2 class="poem__title">${title}</h2>
            <p class="poem__author">${author}</p>
        </header>
    `);
};

const renderBody = (lines) => {
    for (let x of lines) {
        renderLine(x);
    }
};

const renderLine = (line) => {
    let lineHtml;

    if (line.length === 0) {
        lineHtml = `<li class="poem__break">${line}</li>`;
    } else {
        lineHtml = `<li>${line.replace(/  /g, '<span class="poem__space"></span>')}</li>`;
    }

    elements.poemBody.insertAdjacentHTML('beforeend', lineHtml);
}

export const clearPoem = () => {
    elements.poemHeader.innerHTML = '';
    elements.poemBody.innerHTML = '';
};