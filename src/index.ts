import { initialCards, confObject } from "./utils/constants.js";
import { profileEditButton, profileAddButton, profileImage } from "./utils/constants.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { FormValidator } from "./components/FormValidator.js";
import { UserInfo } from "./components/UserInfo.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { Api, type apiOptions } from "./components/Api.js";
import type {FormValues, cardData, cardDataApi, userDataApi} from "./types/types.js";
import * as selector from "./utils/selectors.js";

//create the API controller
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "ec11ff81-b061-43b7-92de-f505e22826c4",
    "Content-Type": "application/json"
  }
});

//create the cards renderer
const handleCardClick = (image:cardDataApi) => {
  modalPreviewCardImage.open(image.name, image.link);
};
const handleCardDelete = (card:HTMLElement) => {
  modalConfirmation.open(card);
}
const cardRenderer = new Section(
  {
    items: await api.getAllCards(),
    renderer: (cardData) => {
      return new Card(cardData, selector.cardTemplate, handleCardClick, handleCardDelete).getCard();
    },
  },
  ".cards__list",
);

//create profileInfo controller
const profileInfo = new UserInfo(
  [selector.profileTitle, selector.profileDescription],
  await api.getMyUserInfo()
);

//Create Modals
const modalEditProfile = new PopupWithForm({
  selector: selector.popupEditProfile,
  handleSendForm: async (formData) => {
    const userDataUpdated = await api.setMyUserInfo({ name: formData.title, about: formData.description });
    profileInfo.setUserInfo({ title: userDataUpdated.name, description: userDataUpdated.about });
  },
});
new FormValidator(confObject, modalEditProfile.getForm());

const modalAddCards = new PopupWithForm({
  selector: selector.popupAddCards,
  handleSendForm: async (formData) => {
    const savedCard = await api.addCard({
      name: formData.name,
      link: formData.link,
    });
    cardRenderer.addItem(
      new Card(savedCard, selector.cardTemplate, handleCardClick, handleCardDelete).getCard()
    );
  },
});
new FormValidator(confObject, modalAddCards.getForm());
//new Card(formData, selector.cardTemplate, handleCardClick, handleCardDelete).getCard(),

const modalPreviewCardImage = new PopupWithImage({
  selector: selector.popupPreviewCardImage,
});

const modalChangeAvatar = new PopupWithForm({
  selector: selector.popupChangeAvatar,
  handleSendForm: async (formData) => {
    const userDataUpdated = await api.setMyAvatar({ avatar: formData.avatar });
    profileInfo.setUserAvatar(userDataUpdated.avatar);
  },
});

const modalConfirmation = new PopupWithConfirmation({
  selector: selector.popupConfirmation,
  handleConfirm: async (card) => {
    console.log( await api.removeCard(card.dataset.id as string) ); 
    card.remove()
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
