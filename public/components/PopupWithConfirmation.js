import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    confirmButton;
    cardToDelete = null;
    handleConfirm;
    constructor({ selector, handleConfirm }) {
        super(selector);
        this.confirmButton = this.modal.querySelector(".popup__button");
        this.handleConfirm = handleConfirm;
    }
    open(card) {
        if (!card)
            return;
        this.cardToDelete = card;
        super.open();
    }
    close() {
        this.cardToDelete = null;
        super.close();
    }
    unsetEventListeners() {
        super.unsetEventListeners();
        this.confirmButton.removeEventListener("click", this.handleSubmit);
    }
    setEventListeners() {
        super.setEventListeners();
        this.confirmButton.addEventListener("click", this.handleSubmit);
    }
    handleSubmit = (event) => {
        if (this.cardToDelete)
            this.handleConfirm(this.cardToDelete);
        this.close();
    };
}
