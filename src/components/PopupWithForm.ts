import { Popup } from "./Popup.js";
import type { selectorPopup, callbackPopupWithForm, FormValues } from "../types/types.js";

/**
 * presentar una lista de elementos en una página
 * La clase Section no tiene marcado. Recibe el marcado a través de la función de callback y lo inserta en el contenedor.
 * @template @public @class @remarks @see
 */
export class PopupWithForm extends Popup {
  form:HTMLFormElement;
  private inputList!: NodeListOf<HTMLInputElement>;
  sendForm: callbackPopupWithForm;
  constructor ({selector, handleSendForm}:{selector:selectorPopup, handleSendForm:callbackPopupWithForm}) {
    super(selector);
    this.form = this.modal.querySelector(".popup__form") as HTMLFormElement;
    this.inputList = this.form.querySelectorAll(".popup__input") as NodeListOf<HTMLInputElement>;
    this.sendForm = handleSendForm;
  }
  public override open(formValues?: FormValues) {
    if (formValues) this.setInputValues(formValues);
    super.open();
    this.setEventListeners();
  } 
  public override close() {
    this.form.reset();
    super.close();
    this.unsetEventListeners();
  }
  private getInputValues() {
    const formValues: FormValues = {};
    this.inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
  private setInputValues( formValues:FormValues ) {
    this.inputList.forEach((input) => {
      input.value = formValues[input.name] ?? "";
    });
  }
  public override unsetEventListeners() {
    super.unsetEventListeners();
    this.form.removeEventListener("submit", this.handleSubmit );
  }
  public override setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", this.handleSubmit );
  }
  private handleSubmit = (event: SubmitEvent):void => { 
    event.preventDefault();
    this.sendForm( this.getInputValues() );
    this.close();
  }
  private handleInput = (event: InputEvent):void => { 
    const inputTarget = event.target as HTMLInputElement;
    console.log(inputTarget.value)
  }

  public getForm():HTMLFormElement {
    return this.form;
  }
}