import type { cardData, cardDataApi, userDataApi } from "../types/types.js";

export interface apiOptions {
  baseUrl: string;
  headers: {
    authorization: string;
    "Content-Type": string;
  };
}

export class Api {
	private baseUrl: string;
  private headers: { authorization: string; "Content-Type": string };
  constructor(options: apiOptions) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  async HTTPRequest(endpoint: string, method: string, body?: any) {
    const options: RequestInit = { method, headers: this.headers };
    if (body) {
      options.body = JSON.stringify(body);
    }
    const res = await fetch(`${this.baseUrl}${endpoint}`, options);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  }

  async getAllCards(): Promise<cardDataApi[]> {
    try { 
      const result: cardDataApi[] = await this.HTTPRequest("/cards", "GET");
      return result;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async getMyUserInfo(): Promise<userDataApi>{
    try {
      const result: userDataApi = await this.HTTPRequest("/users/me", "GET");
      return result;
    } catch (err) {
      console.error(err);
      return {} as userDataApi;
    }
  }
  async setUserInfo(data: { name: string; about: string }) {
    // ...
  }
  async addCard(data: { name: string; link: string }) {
    // ...
  }
  async removeCard(cardId: string) {
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