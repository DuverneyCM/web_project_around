import type { cardDataApi, callbackSectionRenderer } from "../types/types.js";
/**
 * @class Used to render items in the page. addItem() to render an HTMLElement object, whereas renderer() to read an array with the data/instructions, and for each item, call external functions that return the item to render with addItem()
 * @public
 */
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
        this.initialCardDataList.forEach((CardData) => {
            this.addItem( this.callbackRenderer(CardData) );
        });
    }
    public addItem(item:HTMLElement) {
        this.container.prepend(item);
    }
    
}