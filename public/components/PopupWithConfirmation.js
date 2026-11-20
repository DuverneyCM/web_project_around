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
        this.confirmButton.removeEventListener("click", this.handleClick);
    }
    setEventListeners() {
        super.setEventListeners();
        this.confirmButton.addEventListener("click", this.handleClick);
    }
    handleClick = async (event) => {
        const confirmButton = this.confirmButton;
        try {
            if (!this.cardToDelete)
                throw new Error();
            confirmButton.textContent = "Guardando...";
            confirmButton.disabled = true;
            await this.handleConfirm(this.cardToDelete);
            this.close();
        }
        catch (error) {
            console.error("Could not complete card deletion:", error);
        }
        finally {
            confirmButton.textContent = "Si";
            confirmButton.disabled = false;
        }
    };
}
