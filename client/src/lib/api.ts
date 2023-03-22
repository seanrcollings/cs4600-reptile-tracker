interface RequestParams<B> {
  method: string;
  params?: Record<string, string>;
  body?: B;
}

export class ReptileApi {
  static pathPrefix: string = import.meta.env.VITE_API_URL;
  token: string;

  constructor(token: string) {
    this.token = token;
  }

  async request<T, B>(
    path: string,
    { params = {}, method, body }: RequestParams<B>
  ): Promise<T> {
    const urlParams = new URLSearchParams(params);
    const url = new URL(path, ReptileApi.pathPrefix);

    const res = await fetch(`${url}?${urlParams}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      throw new ApiError(`${method} ${path}: ${res.status}`, await res.json());
    }

    return await res.json();
  }

  async get<T>(path: string, params: Record<string, string>): Promise<T> {
    return this.request<T, undefined>(path, { method: "GET", params });
  }

  async post<T, B>(path: string, body: B): Promise<T> {
    return this.request<T, B>(path, { method: "POST", body });
  }

  async put<T, B>(path: string, body: B): Promise<T> {
    return this.request<T, B>(path, { method: "PUT", body });
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T, undefined>(path, { method: "DELETE" });
  }
}

type ErrorValue = {
  instancePath?: string;
  message: string;
};

interface ErrorData {
  errors: ErrorValue[];
}

export class ApiError extends Error {
  data: ErrorData;

  constructor(message: string, data: ErrorData) {
    super(message);
    this.data = data;
  }

  get(path: string) {
    return this.data.errors.find((e) => e.instancePath == path)?.message;
  }

  toString() {
    return this.data.errors.reduce((c, e) => c + ` ${e.message}`, "");
  }
}
