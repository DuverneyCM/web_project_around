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
    this.setEventListeners();
  }
  public override open(formValues?: FormValues) {
    if (formValues) this.setInputValues(formValues);
    super.open();
  } 
  public override close() {
    this.form.reset();
    super.close();
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
  public override setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", this.handleSubmit );
  }
  private handleSubmit = (event: SubmitEvent):void => { 
    event.preventDefault();
    this.sendForm( this.getInputValues() );
    this.close();
  }


  /*
  public open() {} //override: añadir una imagen al popup y el correspondiente atributo src junto con una leyenda
  public close() {} //override: reiniciar el formulario una vez se cierre el popup.
  public setEventListeners() {} //override: agregar al formulario un controlador de eventos submit (SubmitEvent).
  private getInputValues() {} //recopila datos de todos los campos de entrada y devuelve un objeto tipado
  */
}