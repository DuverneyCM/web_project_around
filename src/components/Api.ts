import type { cardData, cardDataApi } from "../types/types.js";

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
  async getUserInfo() {
    // ...
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
  async getInitialCards(): Promise<cardDataApi[]> {
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
      const result: cardDataApi[] = await res.json();
      return result;
    } catch (err) {
      console.error(err);
      return [];
    }
  }


  // otros métodos para trabajar con la API
}

const api = new Api({
  baseUrl: "[https://around-api.es.tripleten-services.com](https://around-api.es.tripleten-services.com/)/v1",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json"
  }
});