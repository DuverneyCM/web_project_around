export type dictString = Record<string,string>;
export type selectorPopup = "#edit-popup" | "#new-card-popup" | "#image-popup"
//export type callbackPopupWithForm<T> = (data: T) => void;
export type callbackPopupWithForm = (formValues:FormValues) => void;
export type callbackCardImageClick = (formValues:FormValues) => void;
export type callbackSectionRenderer = (initialCards:cardData) => HTMLElement;



export interface FormValues { [key: string]: string; };
export interface cardDataApi {
  _id: string;
  name: string;
  link: string;
  isLiked: boolean;
  owner: string;
  createdAt: string;
};
export type cardData = Pick<cardDataApi, "name" | "link">;
export type callbackAddCardForm = (formValues:cardData) => void;
