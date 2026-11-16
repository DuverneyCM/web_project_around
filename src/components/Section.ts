import type { cardData, callbackSectionRenderer } from "../types/types.js";
/**
 * presentar una lista de elementos en una página
 * La clase Section no tiene marcado. Recibe el marcado a través de la función de callback y lo inserta en el contenedor.
 * @template @public @class @remarks @see
 */
export class Section {
    private initialCardDataList:cardData[];
    private callbackRenderer:callbackSectionRenderer;
    private container:HTMLElement;
    
    constructor ( 
        {items, renderer}:{items:cardData[], renderer:callbackSectionRenderer},
        containerSelector: string
    ) {
        this.initialCardDataList = items;
        this.callbackRenderer = renderer;
        this.container = document.querySelector(containerSelector) as HTMLUListElement;
        this.renderer();
    }

    public renderer() { 
        this.initialCardDataList.forEach((CardData) => {
            this.addItem( this.callbackRenderer(CardData) );
        });
    }
    public addItem(item:HTMLElement) {
        this.container.prepend(item);
    }
    
}