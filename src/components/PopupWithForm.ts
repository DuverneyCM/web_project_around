import { Popup } from "./Popup.js";
import type { selectorPopup, FormSubmitHandler } from "../types/types.js";

export class PopupWithForm<T> extends Popup {
  form:HTMLFormElement;
  private inputList!: NodeListOf<HTMLInputElement>;
  sendForm: FormSubmitHandler<T>;
  
  constructor ({selector, handleSendForm}:{selector:selectorPopup, handleSendForm:FormSubmitHandler<T>}) {
    super(selector);
    this.form = this.modal.querySelector(".popup__form") as HTMLFormElement;
    this.inputList = this.form.querySelectorAll(".popup__input") as NodeListOf<HTMLInputElement>;
    this.sendForm = handleSendForm;
  }
  public override open(formValues?: T) {
    if (formValues) this.setInputValues(formValues);
    super.open();
  } 
  public override close() {
    this.form.reset();
    super.close();
  }
  private getInputValues(): T {
    const formValues: Record<string, string> = {};
    this.inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues as T;
  }
  private setInputValues(formValues: T) {
    const values = formValues as Partial<Record<string, string>>;
    this.inputList.forEach((input) => {
      input.value = values[input.name] ?? "";
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
  private handleSubmit = async (event: SubmitEvent): Promise<void> => { 
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
