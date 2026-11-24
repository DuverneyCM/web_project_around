import type { selectorPopup } from "../types/types.js";

export abstract class Popup {
    protected modal: HTMLDivElement;
    private closeButton: HTMLButtonElement;
    
    constructor (selector:selectorPopup) {
        this.modal = document.querySelector(selector) as HTMLDivElement;
        this.closeButton = this.modal.querySelector(".popup__close") as HTMLButtonElement;
    }
    
    public open() {
        this.modal.classList.add("popup_is-opened");
        this.setEventListeners();
    }
    
    public close() {
        this.modal.classList.remove("popup_is-opened");
        this.unsetEventListeners();
    }
    
    public unsetEventListeners() {
        document.removeEventListener("keydown", this.handleEscClose);
        this.closeButton.removeEventListener("click", this.handleClickButtonClose );
        this.modal.removeEventListener("click", this.handleClickOutsideClose );
    }
    
    public setEventListeners() {
        document.addEventListener("keydown", this.handleEscClose);
        this.closeButton.addEventListener("click", this.handleClickButtonClose );
        this.modal.addEventListener("click", this.handleClickOutsideClose );
    }
    
    private handleClickButtonClose = (event: MouseEvent):void => { 
        this.close();
    }
    
    private handleClickOutsideClose = (event: MouseEvent):void => { 
        if (!(event.target instanceof Element)) return;
        if (!event.target.matches(".popup")) return;
        this.close();
    }
    
    private handleEscClose = (event: KeyboardEvent):void => { 
        if (event.key === "Escape") this.close();
    }
}