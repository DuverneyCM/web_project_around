import { Popup } from "./Popup.js";
/**
 * @class used to represent modals, allowing to open and close them
 * @public
 */
export class PopupWithImage extends Popup {
    image;
    caption;
    /**
     * Create a new instance of PopupWithImage to manage modals to get a image preview
     * @param selector - only accept a selector id (e.g. "#selector") listed in selectorPopup type
     */
    constructor({ selector }) {
        super(selector);
        this.image = this.modal.querySelector(".popup__image");
        this.caption = this.modal.querySelector(".popup__caption");
        this.setEventListeners();
    }
    /**
     * used to open modal, loading the required image data
     * @param imageName
     * @param imageSrcLink
     * @param imageAlt
     */
    open(imageName = "", imageSrcLink = "", imageAlt = "") {
        this.image.src = imageSrcLink;
        this.image.alt = imageAlt;
        this.caption.textContent = imageName;
        super.open();
    }
}
