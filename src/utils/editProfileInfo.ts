// for compatibility
export const profileTitle = document.querySelector(".profile__title") as HTMLHeadingElement;
export const profileDescription = document.querySelector(".profile__description") as HTMLParagraphElement;
export const profileEditButton = document.querySelector(".profile__edit-button") as HTMLButtonElement;
export const editPopup = document.querySelector("#edit-popup") as HTMLDivElement;
export const closeButtonEditPopup = editPopup?.querySelector(".popup__close") as HTMLButtonElement;
export const formEditPopup = editPopup?.querySelector("#edit-profile-form") as HTMLFormElement;
export const nameInputFormEditPopup = formEditPopup?.querySelector(
  ".popup__input_type_name",
) as HTMLInputElement;
export const descriptionInputFormEditPopup = formEditPopup.querySelector(
  ".popup__input_type_description",
) as HTMLInputElement;
export const submitFormEditPopup = formEditPopup.querySelector(
  ".popup__button",
) as HTMLButtonElement | HTMLInputElement; 

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
}

// export default { name: profileTitle,  aboutMe: profileDescription };
export default {
  profileTitle, profileDescription, profileEditButton,
  editPopup, formEditPopup, closeButtonEditPopup, submitFormEditPopup,
  nameInputFormEditPopup, descriptionInputFormEditPopup,
};