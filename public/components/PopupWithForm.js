import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    form;
    inputList;
    sendForm;
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
    }
    close() {
        this.form.reset();
        super.close();
    }
    getInputValues() {
        const formValues = {};
        this.inputList.forEach((input) => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }
    setInputValues(formValues) {
        const values = formValues;
        this.inputList.forEach((input) => {
            input.value = values[input.name] ?? "";
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
    handleSubmit = async (event) => {
        event.preventDefault();
        const submitButton = this.form.querySelector(".popup__button");
        const originalButtonText = submitButton.textContent;
        try {
            submitButton.textContent = "Guardando...";
            submitButton.disabled = true;
            await this.sendForm(this.getInputValues());
            this.close();
        }
        catch (error) {
            console.error("Error sending form data:", error);
        }
        finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    };
    getForm() {
        return this.form;
    }
}
