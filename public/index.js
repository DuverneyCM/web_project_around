import { confObject, tokenApi } from "./utils/constants.js";
import { profileEditButton, profileAddButton, profileImage } from "./utils/constants.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { FormValidator } from "./components/FormValidator.js";
import { UserInfo } from "./components/UserInfo.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { Api } from "./components/Api.js";
import * as selector from "./utils/selectors.js";
//create the API controller
const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: tokenApi,
        "Content-Type": "application/json"
    }
});
//create the cards renderer
const handleCardClick = (image) => {
    modalPreviewCardImage.open(image.name, image.link);
};
const handleCardDelete = (card) => {
    modalConfirmation.open(card);
};
const handleCardLike = (cardLikeButton, cardId) => {
    api.toggleLikedCard(cardId, cardLikeButton.classList.contains("card__like-button_is-active"))
        .then((updatedCard) => {
        if (updatedCard.isLiked) {
            cardLikeButton.classList.add("card__like-button_is-active");
        }
        else {
            cardLikeButton.classList.remove("card__like-button_is-active");
        }
    })
        .catch((error) => {
        console.error("Could not update card like:", error);
    });
};
const cardRenderer = new Section({
    items: await api.getAllCards().catch((error) => {
        console.error("Could not fetch cards:", error);
        return [{
                _id: "no-id",
                name: "Card Name",
                link: "./images/placeholder.jpg",
                isLiked: false,
                owner: "",
                createdAt: ""
            }];
    }),
    renderer: (cardData) => {
        return new Card(cardData, selector.cardTemplate, handleCardClick, handleCardDelete, handleCardLike).getCard();
    },
}, ".cards__list");
//create profileInfo controller
const profileInfo = new UserInfo([
    { selector: selector.profileTitle, property: "title" },
    { selector: selector.profileDescription, property: "description" },
], await api.getMyUserInfo().catch((error) => {
    console.error("No se pudo cargar el perfil:", error);
    return {
        _id: "",
        name: "Name (no loaded)",
        about: "About (no loaded)",
        avatar: "./images/placeholder.jpg"
    };
}));
//Create Modals
const modalEditProfile = new PopupWithForm({
    selector: selector.popupEditProfile,
    handleSendForm: async (formData) => {
        return api.setMyUserInfo({ name: formData.title, about: formData.description })
            .then((userDataUpdated) => {
            profileInfo.setUserInfo({ title: userDataUpdated.name, description: userDataUpdated.about });
        });
    },
});
new FormValidator(confObject, modalEditProfile.getForm());
const modalAddCards = new PopupWithForm({
    selector: selector.popupAddCards,
    handleSendForm: async (formData) => {
        return api.addCard({ name: formData.name, link: formData.link })
            .then((savedCard) => {
            cardRenderer.addItem(new Card(savedCard, selector.cardTemplate, handleCardClick, handleCardDelete, handleCardLike).getCard());
        });
    },
});
new FormValidator(confObject, modalAddCards.getForm());
const modalPreviewCardImage = new PopupWithImage({
    selector: selector.popupPreviewCardImage,
});
const modalChangeAvatar = new PopupWithForm({
    selector: selector.popupChangeAvatar,
    handleSendForm: async (formData) => {
        return api.setMyAvatar({ avatar: formData.avatar })
            .then((userDataUpdated) => {
            profileInfo.setUserAvatar(userDataUpdated.avatar);
        });
    },
});
new FormValidator(confObject, modalChangeAvatar.getForm());
const modalConfirmation = new PopupWithConfirmation({
    selector: selector.popupConfirmation,
    handleConfirm: async (card) => {
        return api.removeCard(card.dataset.id)
            .then((deletedCard) => {
            console.log(deletedCard);
            card.remove();
        });
    }
});
//Buttons' events that open modals
profileEditButton.addEventListener("click", () => {
    modalEditProfile.open(profileInfo.getUserInfo());
});
profileAddButton.addEventListener("click", () => {
    modalAddCards.open();
});
profileImage.addEventListener("click", () => {
    modalChangeAvatar.open();
});
