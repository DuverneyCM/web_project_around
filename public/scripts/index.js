import { initialCards, confObject } from "./utils/constants.js";
import { profileEditButton, profileAddButton } from "./utils/constants.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { FormValidator } from "./components/FormValidator.js";
import { UserInfo } from "./components/UserInfo.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import * as selector from "./utils/selectors.js";
//create the cards renderer
const handleCardClick = (image) => {
    modalPreviewCardImage.open(image.name, image.link, image.alt);
};
const cardRenderer = new Section({
    items: initialCards,
    renderer: (cardData) => {
        return new Card(cardData, selector.cardTemplate, handleCardClick).getCard();
    },
}, ".cards__list");
//create profileInfo controller
const profileInfo = new UserInfo([selector.profileTitle, selector.profileDescription]);
//Create Modals
const modalEditProfile = new PopupWithForm({
    selector: selector.popupEditProfile,
    handleSendForm: (formData) => {
        profileInfo.setUserInfo(formData);
    },
});
new FormValidator(confObject, modalEditProfile.getForm());
const modalAddCards = new PopupWithForm({
    selector: selector.popupAddCards,
    handleSendForm: (formData) => {
        cardRenderer.addItem(new Card(formData, selector.cardTemplate, handleCardClick).getCard());
    },
});
new FormValidator(confObject, modalAddCards.getForm());
const modalPreviewCardImage = new PopupWithImage({
    selector: selector.popupPreviewCardImage,
});
//Buttons' events that open modals
profileEditButton.addEventListener("click", () => {
    modalEditProfile.open(profileInfo.getUserInfo());
});
profileAddButton.addEventListener("click", () => {
    modalAddCards.open();
});
