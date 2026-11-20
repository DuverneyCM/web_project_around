export class Api {
    baseUrl;
    headers;
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }
    async HTTPRequest(endpoint, method, body) {
        const options = { method, headers: this.headers };
        if (body) {
            options.body = JSON.stringify(body);
        }
        const res = await fetch(`${this.baseUrl}${endpoint}`, options);
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }
        return res.json();
    }
    async getAllCards() {
        try {
            const result = await this.HTTPRequest("/cards", "GET");
            return result;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }
    async getMyUserInfo() {
        try {
            const result = await this.HTTPRequest("/users/me", "GET");
            return result;
        }
        catch (err) {
            console.error(err);
            return {};
        }
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
}
const api = new Api({
    baseUrl: "[https://around-api.es.tripleten-services.com](https://around-api.es.tripleten-services.com/)/v1",
    headers: {
        authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
        "Content-Type": "application/json"
    }
});
