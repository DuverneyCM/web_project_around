/**
 * presentar una lista de elementos en una página
 * La clase Section no tiene marcado. Recibe el marcado a través de la función de callback y lo inserta en el contenedor.
 * @template @public @class @remarks @see
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
        this.initialCardDataList.forEach((CardData) => {
            this.addItem(this.callbackRenderer(CardData));
        });
    }
    addItem(item) {
        this.container.prepend(item);
    }
}
