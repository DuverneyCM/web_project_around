import type { FormValues, callbackCardImageClick } from "../types/types.js";

/**
 * @class used to render the cards. Add buttons to like and delete each card, and uses a callback to manage click events on the card image
 * @public
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

  public getCard():HTMLElement {
    return this.cardItem;
  };
}