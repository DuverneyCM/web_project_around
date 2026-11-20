import type { cardDataApi, userDataApi } from "../types/types.js";

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

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

  async HTTPRequest<T>(endpoint: string, method: HttpMethod, body?: unknown): Promise<T> {
    const options: RequestInit = { method, headers: this.headers };
    if (body !== undefined) {
      options.body = JSON.stringify(body);
    }
    const res = await fetch(`${this.baseUrl}${endpoint}`, options);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return (await res.json()) as T;
  }
  async getAllCards(): Promise<cardDataApi[]> {
    try { 
      const result = await this.HTTPRequest<cardDataApi[]>("/cards", "GET");
      return result;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  async getAllUsersInfo(): Promise<userDataApi[]>{
    try {
      const result = await this.HTTPRequest<userDataApi[]>("/users", "GET");
      return result;
    } catch (err) {
      console.error(err);
      return [] as userDataApi[];
    }
  }
  async getMyUserInfo(): Promise<userDataApi>{
    try {
      const result = await this.HTTPRequest<userDataApi>("/users/me", "GET");
      return result;
    } catch (err) {
      console.error(err);
      return {} as userDataApi;
    }
  }
  async setMyUserInfo(data: { name: string; about: string }): Promise<userDataApi> {
    try {
      const result = await this.HTTPRequest<userDataApi>("/users/me", "PATCH", data);
      return result;
    } catch (err) {
      console.error(err);
      return {} as userDataApi;
    }
  }
  async setMyAvatar(data: { avatar: string }): Promise<userDataApi> {
    try {
      const result = await this.HTTPRequest<userDataApi>("/users/me/avatar", "PATCH", data);
      return result;
    } catch (err) {
      console.error(err);
      return {} as userDataApi;
    }
  }
  async addCard(data: Pick<cardDataApi, "name" | "link">): Promise<cardDataApi> {
    try {
      const result = await this.HTTPRequest<cardDataApi>("/cards", "POST", data);
      return result;
    } catch (err) {
      console.error(err);
      return {} as cardDataApi;
    }
  }
  async removeCard(cardId: string) {
    try {
      const result = await this.HTTPRequest<cardDataApi>(`/cards/${cardId}`, "DELETE");
      return result;
    } catch (err) {
      console.error(err);
      return {} as cardDataApi;
    }
  }
  async toggleLikedCard(cardId: string, isLiked: boolean): Promise<cardDataApi> {
    try {
      if (isLiked) {
        const result = await this.HTTPRequest<cardDataApi>(`/cards/${cardId}/likes`, "DELETE");
        return result;
      } else {
        const result = await this.HTTPRequest<cardDataApi>(`/cards/${cardId}/likes`, "PUT");
        return result;
      } 
    } catch (err) {
      console.error(err);
      return {} as cardDataApi;
    }
  }

}
