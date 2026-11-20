import { profileImage } from "../utils/selectors.js";
export class UserInfo {
    selectors;
    initialData;
    constructor(selectors, initialData) {
        this.selectors = selectors;
        this.initialData = initialData;
        this.setUserInfo({ title: initialData.name, description: initialData.about });
        this.setUserAvatar(initialData.avatar);
    }
    getUserInfo() {
        const profileInfo = {};
        this.selectors.forEach(selector => {
            const name = selector.split("__")[1];
            const element = document.querySelector(selector);
            if (element instanceof HTMLElement)
                profileInfo[name] = element.textContent;
        });
        return profileInfo;
    }
    setUserInfo(profileInfo) {
        this.selectors.forEach(selector => {
            const name = selector.split("__")[1];
            const element = document.querySelector(selector);
            if (element instanceof HTMLElement)
                element.textContent = profileInfo[name];
        });
    }
    setUserAvatar(avatarUrl) {
        const avatarElement = document.querySelector(profileImage);
        if (avatarElement instanceof HTMLImageElement)
            avatarElement.src = avatarUrl;
    }
}
