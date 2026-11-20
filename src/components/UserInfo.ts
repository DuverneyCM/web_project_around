import type { ProfileFormValues, userDataApi } from "../types/types.js";
import { profileImage } from "../utils/selectors.js";

export class UserInfo {
  constructor (private selectors: string[], private initialData: userDataApi) {
    this.setUserInfo({ title: initialData.name, description: initialData.about });
    this.setUserAvatar(initialData.avatar);
  }

  public getUserInfo():ProfileFormValues {
    const profileInfo:ProfileFormValues = { title: "", description: "" };
    this.selectors.forEach( selector => { 
      const name = selector.split("__")[1];
      const element = document.querySelector(selector) as HTMLElement;
      if (element instanceof HTMLElement) {
        profileInfo[name as keyof ProfileFormValues] = element.textContent ?? "";
      }
    });
    return profileInfo;
  } 
  
  public setUserInfo(profileInfo:ProfileFormValues):void {
    this.selectors.forEach( selector => {
      const name = selector.split("__")[1];
      const element = document.querySelector(selector) as HTMLElement;
      if (element instanceof HTMLElement) {
        element.textContent = profileInfo[name as keyof ProfileFormValues];
      }
    });
  }
  public setUserAvatar(avatarUrl:string):void {
    const avatarElement = document.querySelector(profileImage) as HTMLImageElement;
    if (avatarElement instanceof HTMLImageElement) avatarElement.src = avatarUrl;
  }
}
