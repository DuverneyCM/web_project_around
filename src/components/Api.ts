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
  async getAllUsersInfo(): Promise<userDataApi[]>{
    try {
      const result: userDataApi[] = await this.HTTPRequest("/users", "GET");
      return result;
    } catch (err) {
      console.error(err);
      return [] as userDataApi[];
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
  async setMyUserInfo(data: { name: string; about: string }): Promise<userDataApi> {
    try {
      const result:userDataApi = await this.HTTPRequest("/users/me", "PATCH", data);
      return result;
    } catch (err) {
      console.error(err);
      return {} as userDataApi;
    }
  }
  async setMyAvatar(data: { avatar: string }): Promise<userDataApi> {
    try {
      const result:userDataApi = await this.HTTPRequest("/users/me/avatar", "PATCH", data);
      return result;
    } catch (err) {
      console.error(err);
      return {} as userDataApi;
    }
  }
  async addCard(data: Pick<cardDataApi, "name" | "link">): Promise<cardDataApi> {
    try {
      const result:cardDataApi = await this.HTTPRequest("/cards", "POST", data);
      return result;
    } catch (err) {
      console.error(err);
      return {} as cardDataApi;
    }
  }
  async removeCard(cardId: string) {
    try {
      const result:cardDataApi = await this.HTTPRequest(`/cards/${cardId}`, "DELETE");
      return result;
    } catch (err) {
      console.error(err);
      return {} as cardDataApi;
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
