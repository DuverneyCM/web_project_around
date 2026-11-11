export const cardImagePopup = document.querySelector("#image-popup");
export const closeButtonImagePopup = cardImagePopup.querySelector(".popup__close");
export const imageImagePopup = cardImagePopup.querySelector(".popup__image");
export const captionImagePopup = cardImagePopup.querySelector(".popup__caption");
// new style
export const previewCardImage = {
    popup: {
        self: cardImagePopup,
        image: imageImagePopup,
        caption: captionImagePopup,
        button: { close: closeButtonImagePopup }
    }
};
export default {
    cardImagePopup, closeButtonImagePopup,
    imageImagePopup, captionImagePopup
};
