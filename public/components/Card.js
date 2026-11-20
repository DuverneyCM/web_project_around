/**
 * @class used to render the cards. Add buttons to like and delete each card, and uses a callback to manage click events on the card image
 * @public
 */
export class Card {
    cardData;
    cardTemplate;
    cardItem;
    handleCardImageClick;
    handleCardDelete;
    constructor(cardData, selector, handleCardClick, handleCardDelete) {
        this.cardData = cardData;
        this.cardTemplate = document.querySelector(selector);
        this.handleCardImageClick = handleCardClick;
        this.handleCardDelete = handleCardDelete;
        this.cardItem = this.createCard();
    }
    createCard() {
        if (!this.cardTemplate)
            throw new Error("Card Template not found");
        const cardClone = this.cardTemplate.content.querySelector(".card")?.cloneNode(true);
        const cardTitle = cardClone.querySelector(".card__title");
        const cardImage = cardClone.querySelector(".card__image");
        const cardDeleteButton = cardClone.querySelector(".card__delete-button");
        const cardLikeButton = cardClone.querySelector(".card__like-button");
        cardTitle.textContent = this.cardData.name;
        cardImage.src = this.cardData.link;
        cardImage.alt = this.cardData.name;
        cardClone.dataset.id = this.cardData._id;
        cardClone.dataset.owner = this.cardData.owner;
        cardClone.dataset.createdAt = this.cardData.createdAt;
        ;
        //cardClone.dataset.isLiked = this.cardData.isLiked.toString();
        if (this.cardData.isLiked) {
            cardLikeButton.classList.add("card__like-button_is-active");
        }
        else {
            cardLikeButton.classList.remove("card__like-button_is-active");
        }
        cardLikeButton.addEventListener("click", () => {
            cardLikeButton.classList.toggle("card__like-button_is-active");
        });
        cardDeleteButton.addEventListener("click", () => {
            this.handleCardDelete(cardClone);
        });
        cardImage.addEventListener("click", () => { this.handleCardImageClick(this.cardData); });
        return cardClone;
    }
    getCard() {
        return this.cardItem;
    }
    ;
}
