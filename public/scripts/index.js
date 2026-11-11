//import editProfileInfo from "./utils/editProfileInfo.js";
import { initialCards } from "./utils/constants.js";
import * as editProfileInfo from "./utils/editProfileInfo.js";
import * as addCards from "./utils/addCards.js";
import * as previewCardImage from "./utils/previewCardImage.js";
import { setEventListeners, resetValidation } from "./validate.js";
//Avoiding Namespace (like c++) for first-phase integration
Object.assign(window, editProfileInfo);
Object.assign(window, addCards);
Object.assign(window, previewCardImage);
// Common functions to handle modal/popup
function handleClickOutsideModal(event) {
    if (!event.target.matches(".popup"))
        return;
    const popup = event.target; //overlay
    closeModal(popup);
}
function handleEscClose(event) {
    if (event.key !== "Escape")
        return;
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup)
        closeModal(openedPopup);
}
function openModal(modal) {
    modal.classList.add("popup_is-opened");
    modal.addEventListener("click", handleClickOutsideModal);
    document.addEventListener("keydown", handleEscClose);
    setEventListeners(modal);
}
function closeModal(modal) {
    modal.classList.remove("popup_is-opened");
    modal.removeEventListener("click", handleClickOutsideModal);
    document.removeEventListener("keydown", handleEscClose);
    resetValidation(modal);
}
function fillProfileForm() {
    nameInputFormEditPopup.value = profileTitle.textContent;
    descriptionInputFormEditPopup.value = profileDescription.textContent;
}
function handleOpenEditModal() {
    fillProfileForm();
    openModal(editPopup);
}
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInputFormEditPopup.value;
    profileDescription.textContent = descriptionInputFormEditPopup.value;
    closeModal(editPopup);
}
profileEditButton.addEventListener("click", handleOpenEditModal);
closeButtonEditPopup.addEventListener("click", () => closeModal(editPopup));
formEditPopup.addEventListener("submit", handleProfileFormSubmit);
initialCards.forEach((card) => {
    renderCard(card.name, card.link, cardsList);
});
function renderCard(name, link, container) {
    container.prepend(getCardElement(name, link));
}
function getCardElement(name = "Sin título", link = "./images/placeholder.jpg", alt = name) {
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
        imageImagePopup.src = link;
        imageImagePopup.alt = alt;
        captionImagePopup.textContent = name;
        openModal(cardImagePopup);
    });
    return cardClone;
}
closeButtonImagePopup.addEventListener("click", () => {
    closeModal(cardImagePopup);
});
profileAddButton.addEventListener("click", handleOpenNewCardModal); //
function handleOpenNewCardModal() {
    openModal(newCardPopup);
}
closeButtonNewCardPopup.addEventListener("click", handleCloseNewCardModal); //
function handleCloseNewCardModal() {
    formNewCardPopup.reset();
    closeModal(newCardPopup);
}
formNewCardPopup.addEventListener("submit", handleCardFormSubmit);
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const name = nameInputFormNewCardPopup.value;
    const url = urlInputFormNewCardPopup.value;
    renderCard(name, url, cardsList);
    closeModal(newCardPopup);
    formNewCardPopup.reset();
}
