export class Popup {
    modal;
    closeButton;
    constructor(selector) {
        this.modal = document.querySelector(selector);
        this.closeButton = this.modal.querySelector(".popup__close");
    }
    open() {
        this.modal.classList.add("popup_is-opened");
        this.setEventListeners();
    }
    close() {
        this.modal.classList.remove("popup_is-opened");
        this.unsetEventListeners();
    }
    unsetEventListeners() {
        document.removeEventListener("keydown", this.handleEscClose);
        this.closeButton.removeEventListener("click", this.handleClickButtonClose);
        this.modal.removeEventListener("click", this.handleClickOutsideClose);
    }
    setEventListeners() {
        document.addEventListener("keydown", this.handleEscClose);
        this.closeButton.addEventListener("click", this.handleClickButtonClose);
        this.modal.addEventListener("click", this.handleClickOutsideClose);
    }
    handleClickButtonClose = (event) => {
        this.close();
    };
    handleClickOutsideClose = (event) => {
        if (!(event.target instanceof Element))
            return;
        if (!event.target.matches(".popup"))
            return;
        this.close();
    };
    handleEscClose = (event) => {
        if (event.key === "Escape")
            this.close();
    };
}
