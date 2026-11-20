export class Api {
    baseUrl;
    headers;
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }
    async HTTPRequest(endpoint, method, body) {
        const options = { method, headers: this.headers };
        if (body !== undefined) {
            options.body = JSON.stringify(body);
        }
        const res = await fetch(`${this.baseUrl}${endpoint}`, options);
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }
        return (await res.json());
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
    async getAllUsersInfo() {
        try {
            const result = await this.HTTPRequest("/users", "GET");
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
    async setMyUserInfo(data) {
        try {
            const result = await this.HTTPRequest("/users/me", "PATCH", data);
            return result;
        }
        catch (err) {
            console.error(err);
            return {};
        }
    }
    async setMyAvatar(data) {
        try {
            const result = await this.HTTPRequest("/users/me/avatar", "PATCH", data);
            return result;
        }
        catch (err) {
            console.error(err);
            return {};
        }
    }
    async addCard(data) {
        try {
            const result = await this.HTTPRequest("/cards", "POST", data);
            return result;
        }
        catch (err) {
            console.error(err);
            return {};
        }
    }
    async removeCard(cardId) {
        try {
            const result = await this.HTTPRequest(`/cards/${cardId}`, "DELETE");
            return result;
        }
        catch (err) {
            console.error(err);
            return {};
        }
    }
    async toggleLikedCard(cardId, isLiked) {
        try {
            if (isLiked) {
                const result = await this.HTTPRequest(`/cards/${cardId}/likes`, "DELETE");
                return result;
            }
            else {
                const result = await this.HTTPRequest(`/cards/${cardId}/likes`, "PUT");
                return result;
            }
        }
        catch (err) {
            console.error(err);
            return {};
        }
    }
}
