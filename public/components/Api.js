export class Api {
    baseUrl;
    headers;
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }
    async getUserInfo() {
        // ...
    }
    async setUserInfo(data) {
        // ...
    }
    async addCard(data) {
        // ...
    }
    async removeCard(cardId) {
        // ...
    }
    async getInitialCards() {
        try {
            const res = await fetch(`${this.baseUrl}/cards/`, {
                headers: {
                    authorization: this.headers.authorization,
                    "Content-Type": this.headers["Content-Type"]
                }
            });
            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }
            const result = await res.json();
            return result;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }
}
const api = new Api({
    baseUrl: "[https://around-api.es.tripleten-services.com](https://around-api.es.tripleten-services.com/)/v1",
    headers: {
        authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
        "Content-Type": "application/json"
    }
});
