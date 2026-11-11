// for compatibility
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");
export const profileEditButton = document.querySelector(".profile__edit-button");
export const editPopup = document.querySelector("#edit-popup");
export const closeButtonEditPopup = editPopup?.querySelector(".popup__close");
export const formEditPopup = editPopup?.querySelector("#edit-profile-form");
export const nameInputFormEditPopup = formEditPopup?.querySelector(".popup__input_type_name");
export const descriptionInputFormEditPopup = formEditPopup.querySelector(".popup__input_type_description");
export const submitFormEditPopup = formEditPopup.querySelector(".popup__button");
// new style
export const profile = {
    title: profileTitle,
    description: profileDescription,
    button: { openModalEditProfile: profileEditButton },
    editPopup: {
        self: editPopup,
        form: formEditPopup,
        button: {
            close: closeButtonEditPopup,
            submit: submitFormEditPopup
        },
        input: {
            name: nameInputFormEditPopup,
            description: descriptionInputFormEditPopup,
        }
    }
};
// export default { name: profileTitle,  aboutMe: profileDescription };
export default {
    profileTitle, profileDescription, profileEditButton,
    editPopup, formEditPopup, closeButtonEditPopup, submitFormEditPopup,
    nameInputFormEditPopup, descriptionInputFormEditPopup,
};
