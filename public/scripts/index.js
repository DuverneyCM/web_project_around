//import editProfileInfo from "./utils/editProfileInfo.js";
import { initialCards } from "./utils/constants.js";
import * as editProfileInfo from "./utils/editProfileInfo.js";
import * as addCards from "./utils/addCards.js";
import * as previewCardImage from "./utils/previewCardImage.js";
import { setEventListeners, resetValidation } from "./validate.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { FormValidator } from "./components/FormValidator.js";
import { UserInfo } from "./components/UserInfo.js";
//Avoiding Namespace (like c++) for first-phase integration
Object.assign(window, editProfileInfo);
Object.assign(window, addCards);
Object.assign(window, previewCardImage);
//create profileInfo controller
const profileInfo = new UserInfo([".profile__title", ".profile__description"]);
//Create Modals
const modalEditProfile = new PopupWithForm({
    selector: "#edit-popup",
    handleSendForm: (formData) => {
        profileInfo.setUserInfo(formData);
    },
});
//new FormValidator("setupObject", modalEditProfile.getForm());
const modalAddCards = new PopupWithForm({
    selector: "#new-card-popup",
    handleSendForm: (formData) => {
        const name = formData["place-name"];
        const url = formData["link"];
        renderCard(name, url, cardsList); // cardsList= ...".cards__list"
    },
});
new FormValidator("setupObject", modalAddCards.getForm());
const modalPreviewCardImage = new PopupWithImage({
    selector: "#image-popup",
});
//Open modals
profileEditButton.addEventListener("click", () => {
    modalEditProfile.open(profileInfo.getUserInfo());
});
profileAddButton.addEventListener("click", () => {
    modalAddCards.open();
});
//cardImage is defined into getCardElement()
initialCards.forEach((card) => {
    renderCard(card.name, card.link, cardsList);
});
function renderCard(name, link, container) {
    container.prepend(getCardElement(name, link));
}
function getCardElement(name = "Sin título", link = "./images/placeholder.jpg", alt = name) {
    const cardTemplate = document.querySelector("#card-template");
    const cardClone = cardTemplate.content.querySelector(".card").cloneNode(true);
    const cardTitle = cardClone.querySelector(".card__title");
    const cardImage = cardClone.querySelector(".card__image");
    const cardDeleteButton = cardClone.querySelector(".card__delete-button");
    const cardLikeButton = cardClone.querySelector(".card__like-button");
    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = alt;
    cardLikeButton.addEventListener("click", () => {
        cardLikeButton.classList.toggle("card__like-button_is-active");
    });
    cardDeleteButton.addEventListener("click", () => {
        cardClone.remove();
    });
    cardImage.addEventListener("click", () => {
        modalPreviewCardImage.open(name, link, alt);
    });
    return cardClone;
}
