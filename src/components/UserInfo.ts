import type { ProfileFormValues, ProfileInfoField, userDataApi } from "../types/types.js";
import { profileImage } from "../utils/selectors.js";

export class UserInfo {
  constructor (private fields: ProfileInfoField[], initialData: userDataApi) {
    this.setUserInfo({ title: initialData.name, description: initialData.about });
    this.setUserAvatar(initialData.avatar);
  }

  public getUserInfo():ProfileFormValues {
    const profileInfo:ProfileFormValues = { title: "", description: "" };
    this.fields.forEach(({ selector, property }) => {
      const element = document.querySelector(selector);
      if (element instanceof HTMLElement) {
        profileInfo[property] = element.textContent ?? "";
      }
    });
    return profileInfo;
  } 
  
  public setUserInfo(profileInfo:ProfileFormValues):void {
    this.fields.forEach(({ selector, property }) => {
      const element = document.querySelector(selector);
      if (element instanceof HTMLElement) {
        element.textContent = profileInfo[property];
      }
    });
  }
  public setUserAvatar(avatarUrl:string):void {
    const avatarElement = document.querySelector(profileImage) as HTMLImageElement;
    if (avatarElement instanceof HTMLImageElement) avatarElement.src = avatarUrl;
  }
}
