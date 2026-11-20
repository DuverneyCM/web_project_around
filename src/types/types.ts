export interface FormValues { [key: string]: string; };
export type dictString = Record<string,string>;
export type selectorPopup = "#edit-popup" | "#new-card-popup" | "#image-popup" | "#confirmation-popup" | "#change-avatar-popup"
//export type callbackPopupWithForm<T> = (data: T) => void;
export type callbackPopupWithForm = (formValues:FormValues) => void | Promise<void>;
export type callbackCardImageClick = (cardDataApi:cardDataApi) => void;
export type callbackSectionRenderer = (cardDataApi:cardDataApi) => HTMLElement;
export type callbackConfirm = (card: HTMLElement) => void | Promise<void>;


export interface cardDataApi {
  _id: string;
  name: string;
  link: string;
  isLiked: boolean;
  owner: string;
  createdAt: string;
};
export interface userDataApi {
  _id: string;
  name: string;
  about: string;
  avatar: string;
};


export type cardData = Pick<cardDataApi, "name" | "link">;
export type callbackAddCardForm = (formValues:cardData) => void;
