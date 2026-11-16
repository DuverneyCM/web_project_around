import type { FormValues, callbackCardImageClick } from "../types/types.js";

/**
 * Produce una tarjeta con texto y un enlace a la imagen:
 * @template @public @class @remarks @see
 * Toma los datos de la tarjeta (define una interfaz para estos datos) y un selector de elemento de plantilla como parámetros en el constructor.
 * Añade un tercer parámetro al constructor: la función handleCardClick(). Cuando el usuario haga clic en la tarjeta, esta función abrirá el popup con una imagen (acoplamiento débil).
 * Dispone de métodos privados tipados para trabajar con el marcado y añadir detectores de eventos.
 * Tiene un método público que devuelve un elemento card (HTMLElement) completamente funcional
 */
export class Card {
  private cardData:FormValues;
  private cardTemplate:HTMLTemplateElement;
  private cardItem:HTMLElement;
  private handleCardImageClick:callbackCardImageClick;

  constructor (
    cardData:FormValues, 
    selector:string,
    handleCardClick:callbackCardImageClick,
  ) {
    this.cardData = cardData;
    this.cardTemplate = document.querySelector(selector) as HTMLTemplateElement;
    this.handleCardImageClick = handleCardClick
    this.cardItem = this.createCard();
    
  }

  // Dispone de métodos privados tipados para trabajar con el marcado y añadir detectores de eventos.
  private createCard ():HTMLElement {
    if (!this.cardTemplate) throw new Error("Card Template not found");
    const cardClone = this.cardTemplate.content.querySelector(".card")?.cloneNode(true) as HTMLElement;
    
    const cardTitle = cardClone.querySelector(".card__title") as HTMLHeadingElement;
    const cardImage = cardClone.querySelector(".card__image") as HTMLImageElement;
    const cardDeleteButton = cardClone.querySelector(".card__delete-button") as HTMLButtonElement;
    const cardLikeButton = cardClone.querySelector(".card__like-button") as HTMLButtonElement;
    this.cardData.alt = this.cardData.name;
    cardTitle.textContent = this.cardData.name;
    cardImage.src = this.cardData.link;
    cardImage.alt = this.cardData.alt;
    
    cardLikeButton.addEventListener("click", () => {
      cardLikeButton.classList.toggle("card__like-button_is-active");
    });
    cardDeleteButton.addEventListener("click", () => {
      cardClone.remove();
    });
    cardImage.addEventListener("click", () => {this.handleCardImageClick(this.cardData)});  
    
    return cardClone;
  }
  // Tiene un método público que devuelve un elemento card (HTMLElement) completamente funcional.
  public getCard():HTMLElement {
    return this.cardItem;
  };
}