export interface FormValues { [key: string]: string; };
export type selectorPopup = "#edit-popup" | "#new-card-popup" | "#image-popup"
export type callbackPopupWithForm = (formValues:FormValues) => void;
