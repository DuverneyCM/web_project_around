export const cardTemplate = document.querySelector("#card-template");
export const cardsList = document.querySelector(".cards__list");
export const profileAddButton = document.querySelector(".profile__add-button");
export const newCardPopup = document.querySelector("#new-card-popup");
export const closeButtonNewCardPopup = newCardPopup.querySelector(".popup__close");
export const formNewCardPopup = newCardPopup.querySelector("#new-card-form");
export const nameInputFormNewCardPopup = formNewCardPopup.querySelector(".popup__input_type_card-name");
export const urlInputFormNewCardPopup = formNewCardPopup.querySelector(".popup__input_type_url");
export const submitFormNewCardPopup = formNewCardPopup.querySelector(".popup__button");
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
};
export default {
    cardTemplate, cardsList,
    profileAddButton, newCardPopup, formNewCardPopup,
    closeButtonNewCardPopup, submitFormNewCardPopup,
    nameInputFormNewCardPopup, urlInputFormNewCardPopup
};
