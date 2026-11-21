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
    getAllCards() {
        return this.HTTPRequest("/cards", "GET");
    }
    getAllUsersInfo() {
        return this.HTTPRequest("/users", "GET");
    }
    getMyUserInfo() {
        return this.HTTPRequest("/users/me", "GET");
    }
    setMyUserInfo(data) {
        return this.HTTPRequest("/users/me", "PATCH", data);
    }
    setMyAvatar(data) {
        return this.HTTPRequest("/users/me/avatar", "PATCH", data);
    }
    addCard(data) {
        return this.HTTPRequest("/cards", "POST", data);
    }
    removeCard(cardId) {
        return this.HTTPRequest(`/cards/${cardId}`, "DELETE");
    }
    toggleLikedCard(cardId, isLiked) {
        const method = isLiked ? "DELETE" : "PUT";
        return this.HTTPRequest(`/cards/${cardId}/likes`, method);
    }
}
