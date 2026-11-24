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
  public async validateImageUrl(inputName: string, url: string): Promise<void> {
    const input = Array.from(this.inputList).find((field) => field.name === inputName);
    if (!input) throw new Error(`No se encontró el campo ${inputName}.`);

    const errorMessage1 = "No es un enlace http/https válido.";
    const errorMessage2 = "El enlace no carga una imagen válida.";
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
        throw new Error(errorMessage1);
      }
    } catch {
      this.showInputError(input, errorMessage1);
      throw new Error(errorMessage1);
    }

    try {
      await new Promise<void>((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
          if (image.naturalWidth > 0 && image.naturalHeight > 0) {
            resolve();
          } else {
            reject(new Error(errorMessage2));
          }
        };
        image.onerror = () => reject(new Error(errorMessage2));
        image.onabort = () => reject(new Error(errorMessage2));
        image.src = url;
      });
    } catch {
      this.showInputError(input, errorMessage2);
      throw new Error(errorMessage2);
    }

    this.hideInputError(input);
  }
  showInputError(element:HTMLInputElement, errorMessage:string) {
    const errorElement = document.querySelector(`#${element.id}-error`);
    element.classList.add(this.objSelectors["input_typeError"]);
    if (errorElement) {
      errorElement.classList.add(this.objSelectors["error_isVisible"]);
      errorElement.textContent = errorMessage;
    }
  }
  hideInputError(element:HTMLInputElement) {
    const errorElement = document.querySelector(`#${element.id}-error`);
    element.classList.remove(this.objSelectors["input_typeError"]);
    if (errorElement) {
      errorElement.classList.remove(this.objSelectors["error_isVisible"]); 
      errorElement.textContent = "";
    }
  }
  toggleSubmitButtonState() {
    const submitButton = this.form.querySelector(this.objSelectors.submit) as HTMLButtonElement;
    const allValidInput = Array.from(this.inputList).every((input) => input.validity.valid);
    if (submitButton) submitButton.disabled = !allValidInput;
  }

  handleObserver = ():void => {
    if (!this.popup) return;
    const isOpen = this.popup.classList.contains(this.objSelectors["popup_isOpen"]);  
    if (isOpen) {
      this.toggleSubmitButtonState();
    } else {
      this.resetValidation();
    }
  }
}
