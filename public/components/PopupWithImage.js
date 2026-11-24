import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    image;
    caption;
    constructor({ selector }) {
        super(selector);
        this.image = this.modal.querySelector(".popup__image");
        this.caption = this.modal.querySelector(".popup__caption");
        this.setEventListeners();
    }
    open(imageName = "", imageSrcLink = "", imageAlt = imageName) {
        this.image.src = imageSrcLink;
        this.image.alt = imageAlt;
        this.caption.textContent = imageName;
        super.open();
    }
}
