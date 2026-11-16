import { Popup } from "./Popup.js";
/**
 * @class used to represent modals that contain forms, which could requiere validate and submit data
 * @public
 */
export class PopupWithForm extends Popup {
    form;
    inputList;
    sendForm;
    /**
     * Create a new instance of PopupWithForm to manage modals with forms
     * @param selector - only accept a selector id (e.g. "#selector") listed in selectorPopup type
     * @param handleSendForm - callback function used to process collected form data when submit
     */
    constructor({ selector, handleSendForm }) {
        super(selector);
        this.form = this.modal.querySelector(".popup__form");
        this.inputList = this.form.querySelectorAll(".popup__input");
        this.sendForm = handleSendForm;
    }
    open(formValues) {
        if (formValues)
            this.setInputValues(formValues);
        super.open();
        this.setEventListeners();
    }
    close() {
        this.form.reset();
        super.close();
        this.unsetEventListeners();
    }
    getInputValues() {
        const formValues = {};
        this.inputList.forEach((input) => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }
    setInputValues(formValues) {
        this.inputList.forEach((input) => {
            input.value = formValues[input.name] ?? "";
        });
    }
    unsetEventListeners() {
        super.unsetEventListeners();
        this.form.removeEventListener("submit", this.handleSubmit);
    }
    setEventListeners() {
        super.setEventListeners();
        this.form.addEventListener("submit", this.handleSubmit);
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.sendForm(this.getInputValues());
        this.close();
    };
    getForm() {
        return this.form;
    }
}
