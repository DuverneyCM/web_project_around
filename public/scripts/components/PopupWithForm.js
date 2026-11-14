import { Popup } from "./Popup.js";
/**
 * presentar una lista de elementos en una página
 * La clase Section no tiene marcado. Recibe el marcado a través de la función de callback y lo inserta en el contenedor.
 * @template @public @class @remarks @see
 */
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
    handleInput = (event) => {
        const inputTarget = event.target;
        console.log(inputTarget.value);
    };
    getForm() {
        return this.form;
    }
}
