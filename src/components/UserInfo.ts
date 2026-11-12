import type { selectorPopup, callbackPopupWithForm, FormValues } from "../types/types.js";

export class UserInfo {
  constructor (private selectors: string[]) {}

  public getUserInfo():FormValues {
    const profileInfo:FormValues = {};
    this.selectors.forEach( selector => { 
      const name = selector.split("__")[1];
      const element = document.querySelector(selector) as HTMLElement;
      if (element instanceof HTMLElement) profileInfo[name] = element.textContent;
    });
    return profileInfo;
  } 
  
  public setUserInfo(profileInfo:FormValues):void {
    this.selectors.forEach( selector => {
      const name = selector.split("__")[1];
      const element = document.querySelector(selector) as HTMLElement;
      if (element instanceof HTMLElement) element.textContent = profileInfo[name];
    });
  } 
}