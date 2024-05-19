import { MarkupAttributes } from "./types";

export function createMarkup(markupName: string, parent: HTMLElement, attributes: MarkupAttributes = {}, textContent: string = ""): HTMLElement {
    const markup: HTMLElement = document.createElement(markupName);
    markup.textContent = textContent;
    parent.appendChild(markup);

    for (const key in attributes) {
        markup.setAttribute(key, attributes[key]);
    }

    return markup;
}