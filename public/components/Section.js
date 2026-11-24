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
