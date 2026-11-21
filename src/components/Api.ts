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
  getAllCards(): Promise<cardDataApi[]> {
    return this.HTTPRequest<cardDataApi[]>("/cards", "GET");
  }
  getAllUsersInfo(): Promise<userDataApi[]> {
    return this.HTTPRequest<userDataApi[]>("/users", "GET");
  }
  getMyUserInfo(): Promise<userDataApi> {
    return this.HTTPRequest<userDataApi>("/users/me", "GET");
  }
  setMyUserInfo(data: { name: string; about: string }): Promise<userDataApi> {
    return this.HTTPRequest<userDataApi>("/users/me", "PATCH", data);
  }
  setMyAvatar(data: { avatar: string }): Promise<userDataApi> {
    return this.HTTPRequest<userDataApi>("/users/me/avatar", "PATCH", data);
  }
  addCard(data: Pick<cardDataApi, "name" | "link">): Promise<cardDataApi> {
    return this.HTTPRequest<cardDataApi>("/cards", "POST", data);
  }
  removeCard(cardId: string): Promise<cardDataApi> {
    return this.HTTPRequest<cardDataApi>(`/cards/${cardId}`, "DELETE");
  }
  toggleLikedCard(cardId: string, isLiked: boolean): Promise<cardDataApi> {
    const method: HttpMethod = isLiked ? "DELETE" : "PUT";
    return this.HTTPRequest<cardDataApi>(`/cards/${cardId}/likes`, method);
  }

}
