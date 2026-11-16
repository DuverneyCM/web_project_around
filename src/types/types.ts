export interface FormValues { [key: string]: string; };
export type selectorPopup = "#edit-popup" | "#new-card-popup" | "#image-popup"
export type callbackPopupWithForm = (formValues:FormValues) => void;
export type callbackAddCardForm = (formValues:FormValues) => void;
export type callbackCardImageClick = (formValues:FormValues) => void;
export type callbackSectionRenderer = (initialCards:cardData) => HTMLElement;
export type cardData = {name: "string", link: "string"};