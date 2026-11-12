/**
 * @class used to represent any modals, allowing to open and close them
 * @public
 */
export class Popup {
    modal;
    closeButton;
    /**
     * Create a new instance of Popup to manage popups
     * @param selector - only accept a selector id (e.g. "#selector") listed in selectorPopup type
     */
    constructor(selector) {
        this.modal = document.querySelector(selector);
        this.closeButton = this.modal.querySelector(".popup__close");
    }
    /**
     * used to open modal
     */
    open() {
        this.modal.classList.add("popup_is-opened");
    }
    /**
     * used to close modal
     */
    close() {
        this.modal.classList.remove("popup_is-opened");
    }
    /**
     * used to add/define all event listeners, linked to their handlers
     */
    setEventListeners() {
        document.addEventListener("keydown", this.handleEscClose);
        this.closeButton.addEventListener("click", this.handleClickButtonClose);
        this.modal.addEventListener("click", this.handleClickOutsideClose);
    }
    /**
     * Handler to close modal when one click on close button, the most basic
     * @internal
     */
    handleClickButtonClose = (event) => {
        this.close();
    };
    /**
     * Handler to close modal when one click outside, on everlay
     * @internal
     */
    handleClickOutsideClose = (event) => {
        if (!(event.target instanceof Element))
            return;
        if (!event.target.matches(".popup"))
            return;
        this.close();
    };
    /**
     * Handler to close modal when one press the key Escape
     * @internal
     */
    handleEscClose = (event) => {
        if (event.key === "Escape")
            this.close();
    };
}
