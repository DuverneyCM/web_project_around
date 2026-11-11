export const cardTemplate = document.querySelector("#card-template") as HTMLTemplateElement;
export const cardsList = document.querySelector(".cards__list") as HTMLUListElement;
export const profileAddButton = document.querySelector(".profile__add-button") as HTMLButtonElement;
export const newCardPopup = document.querySelector("#new-card-popup") as HTMLDivElement;
export const closeButtonNewCardPopup = newCardPopup.querySelector(".popup__close") as HTMLButtonElement;
export const formNewCardPopup = newCardPopup.querySelector("#new-card-form") as HTMLFormElement;
export const nameInputFormNewCardPopup = formNewCardPopup.querySelector(
  ".popup__input_type_card-name",
) as HTMLInputElement;
export const urlInputFormNewCardPopup = formNewCardPopup.querySelector(
  ".popup__input_type_url",
) as HTMLInputElement;
export const submitFormNewCardPopup = formNewCardPopup.querySelector(
  ".popup__button",
) as HTMLButtonElement | HTMLInputElement; 

// new style
export const cards = {
  template: cardTemplate,
  listToAdd: cardsList,
  button: { openModalAddCard: profileAddButton },
  addCardPopup: {
    self: newCardPopup,
    form: formNewCardPopup,
    button: {
        close: closeButtonNewCardPopup,
        submit: submitFormNewCardPopup
    },
    input: {
        name: nameInputFormNewCardPopup,
        url: urlInputFormNewCardPopup,
    }
  }
}

export default {
  cardTemplate, cardsList,
  profileAddButton, newCardPopup, formNewCardPopup,
  closeButtonNewCardPopup, submitFormNewCardPopup, 
  nameInputFormNewCardPopup, urlInputFormNewCardPopup
};