/**
 * @class Used to render items in the page. addItem() to render an HTMLElement object, whereas renderer() to read an array with the data/instructions, and for each item, call external functions that return the item to render with addItem()
 * @public
 */
export class Section {
    initialCardDataList;
    callbackRenderer;
    container;
    constructor({ items, renderer }, containerSelector) {
        this.initialCardDataList = items;
        this.callbackRenderer = renderer;
        this.container = document.querySelector(containerSelector);
        this.renderer();
    }
    renderer() {
        [...this.initialCardDataList].reverse().forEach((CardData) => {
            this.addItem(this.callbackRenderer(CardData));
        });
    }
    addItem(item) {
        this.container.prepend(item);
    }
}
