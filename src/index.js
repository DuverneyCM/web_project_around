import editProfileInfo from "./utils/editProfileInfo.js";
import { initialCards, confObject } from "./utils/constants.js";
//import * as editProfileInfo from "./utils/editProfileInfo.js";
import * as addCards from "./utils/addCards.js";
import * as previewCardImage from "./utils/previewCardImage.js";
//import { setEventListeners, resetValidation } from "./validate.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { FormValidator } from "./components/FormValidator.js";
import { UserInfo } from "./components/UserInfo.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";

//Avoiding Namespace (like c++) for first-phase integration
Object.assign(window, editProfileInfo);
Object.assign(window, addCards);
Object.assign(window, previewCardImage);

//create profileInfo controller
const profileInfo = new UserInfo([".profile__title", ".profile__description"]);

//create the cards renderer
const handleCardClick = (image) => {
  modalPreviewCardImage.open(image.name, image.link, image.alt);
};
const cardRenderer = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      return new Card(cardData, "#card-template", handleCardClick).getCard();
    },
  },
  ".cards__list",
);

//Create Modals
const modalEditProfile = new PopupWithForm({
  selector: "#edit-popup",
  handleSendForm: (formData) => {
    profileInfo.setUserInfo(formData);
  },
});
modalEditProfile.validator = new FormValidator(
  confObject,
  modalEditProfile.getForm(),
);

const modalAddCards = new PopupWithForm({
  selector: "#new-card-popup",
  handleSendForm: (formData) => {
    cardRenderer.addItem(
      new Card(formData, "#card-template", handleCardClick).getCard(),
    );
  },
});
modalAddCards.validator = new FormValidator(
  confObject,
  modalAddCards.getForm(),
);

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
