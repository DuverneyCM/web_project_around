import { Popup } from "./Popup.js";
import type { selectorPopup, callbackPopupWithForm, FormValues } from "../types/types.js";

/**
 * @class used to represent modals that contain forms, which could requiere validate and submit data
 * @public
 */
export class PopupWithForm extends Popup {
  form:HTMLFormElement;
  private inputList!: NodeListOf<HTMLInputElement>;
  sendForm: callbackPopupWithForm;
  /**
   * Create a new instance of PopupWithForm to manage modals with forms
   * @param selector - only accept a selector id (e.g. "#selector") listed in selectorPopup type
   * @param handleSendForm - callback function used to process collected form data when submit
   */
  constructor ({selector, handleSendForm}:{selector:selectorPopup, handleSendForm:callbackPopupWithForm}) {
    super(selector);
    this.form = this.modal.querySelector(".popup__form") as HTMLFormElement;
    this.inputList = this.form.querySelectorAll(".popup__input") as NodeListOf<HTMLInputElement>;
    this.sendForm = handleSendForm;
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
  public override unsetEventListeners() {
    super.unsetEventListeners();
    this.form.removeEventListener("submit", this.handleSubmit );
  }
  public override setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", this.handleSubmit );
  }
  private handleSubmit = async (event: SubmitEvent) => { 
    event.preventDefault();
    const submitButton = this.form.querySelector(".popup__button") as HTMLButtonElement;
    const originalButtonText = submitButton.textContent;
    try {
      submitButton.textContent = "Guardando...";
      submitButton.disabled = true;
      await this.sendForm( this.getInputValues() );
      this.close();
    } catch (error) {
      console.error("Error sending form data:", error);
    } finally {
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    }
  }

  public getForm():HTMLFormElement {
    return this.form;
  }
}