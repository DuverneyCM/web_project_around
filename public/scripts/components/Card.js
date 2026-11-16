/**
 * Produce una tarjeta con texto y un enlace a la imagen:
 * @template @public @class @remarks @see
 * Toma los datos de la tarjeta (define una interfaz para estos datos) y un selector de elemento de plantilla como parámetros en el constructor.
 * Añade un tercer parámetro al constructor: la función handleCardClick(). Cuando el usuario haga clic en la tarjeta, esta función abrirá el popup con una imagen (acoplamiento débil).
 * Dispone de métodos privados tipados para trabajar con el marcado y añadir detectores de eventos.
 * Tiene un método público que devuelve un elemento card (HTMLElement) completamente funcional
 */
export class Card {
    cardData;
    cardTemplate;
    cardItem;
    handleCardImageClick;
    constructor(cardData, selector, handleCardClick) {
        this.cardData = cardData;
        this.cardTemplate = document.querySelector(selector);
        this.handleCardImageClick = handleCardClick;
        this.cardItem = this.createCard();
    }
    // Dispone de métodos privados tipados para trabajar con el marcado y añadir detectores de eventos.
    createCard() {
        if (!this.cardTemplate)
            throw new Error("Card Template not found");
        const cardClone = this.cardTemplate.content.querySelector(".card")?.cloneNode(true);
        const cardTitle = cardClone.querySelector(".card__title");
        const cardImage = cardClone.querySelector(".card__image");
        const cardDeleteButton = cardClone.querySelector(".card__delete-button");
        const cardLikeButton = cardClone.querySelector(".card__like-button");
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
        cardImage.addEventListener("click", () => { this.handleCardImageClick(this.cardData); });
        return cardClone;
    }
    // Tiene un método público que devuelve un elemento card (HTMLElement) completamente funcional.
    getCard() {
        return this.cardItem;
    }
    ;
}
