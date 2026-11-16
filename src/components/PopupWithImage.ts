import { Popup } from "./Popup.js";
import type { selectorPopup } from "../types/types.js";

/**
 * @class used to represent modals used to preview card images
 * @public
 */
export class PopupWithImage extends Popup { 
    image:HTMLImageElement;
    caption:HTMLParagraphElement;
    /**
     * Create a new instance of PopupWithImage to manage modals to get a image preview
     * @param selector - only accept a selector id (e.g. "#selector") listed in selectorPopup type
     */
    constructor ({selector}:{selector:selectorPopup}) {
        super(selector);
        this.image = this.modal.querySelector(".popup__image") as HTMLImageElement;
        this.caption = this.modal.querySelector(".popup__caption") as HTMLParagraphElement;
        this.setEventListeners();
    }
    /**
     * used to open modal, loading the required image data
     * @param imageName
     * @param imageSrcLink
     * @param imageAlt
     */
    public override open (imageName:string = "", imageSrcLink:string = "", imageAlt:string = "") {
        this.image.src = imageSrcLink;
        this.image.alt = imageAlt;
        this.caption.textContent = imageName;
        super.open();
    }
    
}