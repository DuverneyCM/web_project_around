import { Popup } from "./Popup.js";
import type { selectorPopup, callbackConfirm } from "../types/types.js";

export class PopupWithConfirmation extends Popup {
    private confirmButton:HTMLButtonElement;
    private cardToDelete: HTMLElement | null = null;
    handleConfirm: callbackConfirm;
    constructor ({selector, handleConfirm}:{selector:selectorPopup, handleConfirm:callbackConfirm}) {
        super(selector);
        this.confirmButton = this.modal.querySelector(".popup__button") as HTMLButtonElement;
        this.handleConfirm = handleConfirm;
    }
    public override open(card?: HTMLElement) {
        if (!card) return;
        this.cardToDelete = card;
        super.open();
    }
    public override close() {
        this.cardToDelete = null;
        super.close();
    }
    public override unsetEventListeners() {
        super.unsetEventListeners();
        this.confirmButton.removeEventListener("click", this.handleClick);
    }
    public override setEventListeners() {
        super.setEventListeners();
        this.confirmButton.addEventListener("click", this.handleClick);
    }
    private handleClick = async (event: MouseEvent): Promise<void> => {
        const confirmButton = this.confirmButton;
        try {
            if (!this.cardToDelete) throw new Error();
            confirmButton.textContent = "Guardando...";
            confirmButton.disabled = true;
            await this.handleConfirm(this.cardToDelete);
            this.close();
        } catch (error) {
            console.error("Could not complete card deletion:", error);
        } finally {
            confirmButton.textContent = "Si";
            confirmButton.disabled = false;
        }
    };
}
