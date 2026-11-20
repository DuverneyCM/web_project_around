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
        this.confirmButton.removeEventListener("click", this.handleSubmit);
    }
    public override setEventListeners() {
        super.setEventListeners();
        this.confirmButton.addEventListener("click", this.handleSubmit);
    }
    private handleSubmit = (event: MouseEvent) => {
        if (this.cardToDelete) this.handleConfirm(this.cardToDelete);
        this.close();
    };
}