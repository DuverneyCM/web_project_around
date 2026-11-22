import type { callbackCardImageClick, cardDataApi } from "../types/types.js";

/**
 * @class used to render the cards. Add buttons to like and delete each card, and uses a callback to manage click events on the card image
 * @public
 */
export class Card {
  private cardData:cardDataApi;
  private cardTemplate:HTMLTemplateElement;
  private cardItem:HTMLElement;
  private handleCardImageClick:callbackCardImageClick;
  private handleCardDelete:(card:HTMLElement)=>void;
  private handleCardLike:(cardLikeButton:HTMLButtonElement, cardId: string)=>void;

  constructor (
    cardData:cardDataApi, 
    selector:string,
    handleCardClick:callbackCardImageClick,
    handleCardDelete:(card:HTMLElement)=>void,
    handleCardLike:(cardLikeButton:HTMLButtonElement, cardId: string)=>void,
  ) {
    this.cardData = cardData;
    this.cardTemplate = document.querySelector(selector) as HTMLTemplateElement;
    this.handleCardImageClick = handleCardClick
    this.handleCardDelete = handleCardDelete;
    this.handleCardLike = handleCardLike;
    this.cardItem = this.createCard();
    
  }

  private createCard ():HTMLElement {
    if (!this.cardTemplate) throw new Error("Card Template not found");
    const cardClone = this.cardTemplate.content.querySelector(".card")?.cloneNode(true) as HTMLElement;
    
    const cardTitle = cardClone.querySelector(".card__title") as HTMLHeadingElement;
    const cardImage = cardClone.querySelector(".card__image") as HTMLImageElement;
    const cardDeleteButton = cardClone.querySelector(".card__delete-button") as HTMLButtonElement;
    const cardLikeButton = cardClone.querySelector(".card__like-button") as HTMLButtonElement;
  
    cardTitle.textContent = this.cardData.name;
    cardImage.src = this.cardData.link;
    cardImage.alt = this.cardData.name;
    cardClone.dataset.id = this.cardData._id;
    cardClone.dataset.owner = this.cardData.owner;
    cardClone.dataset.createdAt = this.cardData.createdAt;;    

    if (this.cardData.isLiked) {
      cardLikeButton.classList.add("card__like-button_is-active");
    } else {
      cardLikeButton.classList.remove("card__like-button_is-active");
    }

    cardLikeButton.addEventListener("click", () => {
      this.handleCardLike(cardLikeButton, cardClone.dataset.id as string);
    });
    cardDeleteButton.addEventListener("click", () => {
      this.handleCardDelete(cardClone);
    });
    cardImage.addEventListener("click", () => {this.handleCardImageClick(this.cardData)});  
    
    return cardClone;
  }

  public getCard():HTMLElement {
    return this.cardItem;
  };
}
