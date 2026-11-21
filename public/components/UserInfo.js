import { profileImage } from "../utils/selectors.js";
export class UserInfo {
    fields;
    constructor(fields, initialData) {
        this.fields = fields;
        this.setUserInfo({ title: initialData.name, description: initialData.about });
        this.setUserAvatar(initialData.avatar);
    }
    getUserInfo() {
        const profileInfo = { title: "", description: "" };
        this.fields.forEach(({ selector, property }) => {
            const element = document.querySelector(selector);
            if (element instanceof HTMLElement) {
                profileInfo[property] = element.textContent ?? "";
            }
        });
        return profileInfo;
    }
    setUserInfo(profileInfo) {
        this.fields.forEach(({ selector, property }) => {
            const element = document.querySelector(selector);
            if (element instanceof HTMLElement) {
                element.textContent = profileInfo[property];
            }
        });
    }
    setUserAvatar(avatarUrl) {
        const avatarElement = document.querySelector(profileImage);
        if (avatarElement instanceof HTMLImageElement)
            avatarElement.src = avatarUrl;
    }
}
