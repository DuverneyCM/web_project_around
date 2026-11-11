export const cardImagePopup = document.querySelector("#image-popup") as HTMLDivElement;
export const closeButtonImagePopup = cardImagePopup.querySelector(".popup__close") as HTMLButtonElement;
export const imageImagePopup = cardImagePopup.querySelector(".popup__image") as HTMLImageElement;
export const captionImagePopup = cardImagePopup.querySelector(".popup__caption") as HTMLParagraphElement;

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