import { Popup } from "./Popup.js";
import type { selectorPopup } from "../types/types.js";

export class PopupWithImage extends Popup { 
    image:HTMLImageElement;
    caption:HTMLParagraphElement;
    
    constructor ({selector}:{selector:selectorPopup}) {
        super(selector);
        this.image = this.modal.querySelector(".popup__image") as HTMLImageElement;
        this.caption = this.modal.querySelector(".popup__caption") as HTMLParagraphElement;
        this.setEventListeners();
    }
    
    public override open (imageName:string = "", imageSrcLink:string = "", imageAlt:string = imageName) {
        this.image.src = imageSrcLink;
        this.image.alt = imageAlt;
        this.caption.textContent = imageName;
        super.open();
    }
    
}