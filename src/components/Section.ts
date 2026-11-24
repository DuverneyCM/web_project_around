import type { cardDataApi, callbackSectionRenderer } from "../types/types.js";

export class Section {
    private initialCardDataList:cardDataApi[];
    private callbackRenderer:callbackSectionRenderer;
    private container:HTMLElement;
    
    constructor ( 
        {items, renderer}:{items:cardDataApi[], renderer:callbackSectionRenderer},
        containerSelector: string
    ) {
        this.initialCardDataList = items;
        this.callbackRenderer = renderer;
        this.container = document.querySelector(containerSelector) as HTMLUListElement;
        this.renderer();
    }

    public renderer() { 
        [...this.initialCardDataList].reverse().forEach((CardData) => {
            this.addItem( this.callbackRenderer(CardData) );
        });
    }
    public addItem(item:HTMLElement) {
        this.container.prepend(item);
    }
    
}