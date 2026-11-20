import type { FormValues, userDataApi } from "../types/types.js";
import { profileImage } from "../utils/selectors.js";

export class UserInfo {
  constructor (private selectors: string[], private initialData: userDataApi) {
    this.setUserInfo({ title: initialData.name, description: initialData.about });
    this.setProfileAvatar(initialData.avatar);
  }

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
  public setProfileAvatar(avatarUrl:string):void {
    const avatarElement = document.querySelector(profileImage) as HTMLImageElement;
    if (avatarElement instanceof HTMLImageElement) avatarElement.src = avatarUrl;
  }
}