export class UserInfo {
    selectors;
    constructor(selectors) {
        this.selectors = selectors;
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
}
