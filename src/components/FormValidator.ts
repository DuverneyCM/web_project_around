import { confObject } from "../utils/constants.js";

/**
 * validar los campos del formulario
 * asegurar que los elementos del DOM se manejan correctamente
 * @template @public @class @remarks @see
 */
export class FormValidator {
  private popup?: HTMLDivElement;
  private inputList: NodeListOf<HTMLInputElement>
  private observer?: MutationObserver;
  constructor (
    private objSelectors:Record<string,string>, 
    private form:HTMLFormElement
  ){
    this.popup = form.closest(objSelectors.popup) as HTMLDivElement;
    this.inputList = this.form.querySelectorAll(objSelectors.input) as NodeListOf<HTMLInputElement>;
    if (this.popup) this.observer = new MutationObserver(() => this.handleObserver() );
    this.enableValidation();
  }
  public disableValidation():void {
    this.form.removeEventListener("input", this.handleValidateAllInputs);
    if (this.observer) 
      this.observer.disconnect();
  }
  public enableValidation():void {
    this.form.addEventListener("input", this.handleValidateAllInputs);
    if (this.popup && this.observer) {
      this.observer.observe(this.popup, { attributes: true, attributeFilter: ["class"] });
    }
  }

  private handleValidateAllInputs = (event: InputEvent):void => {
    const inputTarget = event.target as HTMLInputElement;
    this.checkInputValidity(inputTarget);
  }
  private checkInputValidity(input:HTMLInputElement):void {
    if (!input.validity.valid) 
      this.showInputError(input, input.validationMessage);
    else
      this.hideInputError(input);
    this.toggleSubmitButtonState();
  }
  public resetValidation():void {
    this.inputList.forEach((input) => { this.hideInputError(input)  });
  }
  showInputError(element:HTMLInputElement, errorMessage:string) {
    const errorElement = document.querySelector(`#${element.id}-error`);
    element.classList.add(this.objSelectors["input_typeError"]);
    if (errorElement) {
      errorElement.classList.add(this.objSelectors["error_isVisible"]);
      errorElement.textContent = errorMessage;
    } else console.log("no found errorElement");
  }
  hideInputError(element:HTMLInputElement) {
    const errorElement = document.querySelector(`#${element.id}-error`);
    element.classList.remove(this.objSelectors["input_typeError"]);
    if (errorElement) {
      errorElement.classList.remove(this.objSelectors["error_isVisible"]); 
      errorElement.textContent = "";
    } else console.log("no found errorElement");
  }
  toggleSubmitButtonState() {
    const submitButton = this.form.querySelector(this.objSelectors.submit) as HTMLButtonElement;
    const allValidInput = Array.from(this.inputList).every((input) => input.validity.valid);
    if (submitButton) submitButton.disabled = !allValidInput;
  }

  handleObserver = ():void => {
    if (!this.popup) return;
    const isOpen = this.popup.classList.contains(this.objSelectors["popup_isOpen"]);  
    if (isOpen) { // popup abierto
      this.toggleSubmitButtonState();
    } else { // popup cerrado
      this.resetValidation();
    }
  }
}