import { confObject } from "../utils/constants.js";
/**
 * validar los campos del formulario
 * asegurar que los elementos del DOM se manejan correctamente
 * @template @public @class @remarks @see
 */
export class FormValidator {
    objSelectors;
    form;
    popup;
    inputList;
    observer;
    constructor(objSelectors, form) {
        this.objSelectors = objSelectors;
        this.form = form;
        this.popup = form.closest(objSelectors.popup);
        this.inputList = this.form.querySelectorAll(objSelectors.input);
        if (this.popup)
            this.observer = new MutationObserver(() => this.handleObserver());
        this.enableValidation();
    }
    disableValidation() {
        this.form.removeEventListener("input", this.handleValidateAllInputs);
        if (this.observer)
            this.observer.disconnect();
    }
    enableValidation() {
        this.form.addEventListener("input", this.handleValidateAllInputs);
        if (this.popup && this.observer) {
            this.observer.observe(this.popup, { attributes: true, attributeFilter: ["class"] });
        }
    }
    handleValidateAllInputs = (event) => {
        const inputTarget = event.target;
        this.checkInputValidity(inputTarget);
    };
    checkInputValidity(input) {
        if (!input.validity.valid)
            this.showInputError(input, input.validationMessage);
        else
            this.hideInputError(input);
        this.toggleSubmitButtonState();
    }
    resetValidation() {
        this.inputList.forEach((input) => { this.hideInputError(input); });
    }
    showInputError(element, errorMessage) {
        const errorElement = document.querySelector(`#${element.id}-error`);
        element.classList.add(this.objSelectors["input_typeError"]);
        if (errorElement) {
            errorElement.classList.add(this.objSelectors["error_isVisible"]);
            errorElement.textContent = errorMessage;
        }
        else
            console.log("no found errorElement");
    }
    hideInputError(element) {
        const errorElement = document.querySelector(`#${element.id}-error`);
        element.classList.remove(this.objSelectors["input_typeError"]);
        if (errorElement) {
            errorElement.classList.remove(this.objSelectors["error_isVisible"]);
            errorElement.textContent = "";
        }
        else
            console.log("no found errorElement");
    }
    toggleSubmitButtonState() {
        const submitButton = this.form.querySelector(this.objSelectors.submit);
        const allValidInput = Array.from(this.inputList).every((input) => input.validity.valid);
        if (submitButton)
            submitButton.disabled = !allValidInput;
    }
    handleObserver = () => {
        if (!this.popup)
            return;
        const isOpen = this.popup.classList.contains(this.objSelectors["popup_isOpen"]);
        if (isOpen) { // popup abierto
            this.toggleSubmitButtonState();
        }
        else { // popup cerrado
            this.resetValidation();
        }
    };
}
