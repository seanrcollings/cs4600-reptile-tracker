import { useEffect, useState } from "react";

export class ApiError extends Error {
  data: { error: string };

  constructor(message: string, data: { error: string }) {
    super(message);
    this.data = data;
  }
}

interface RequestParams<B> {
  method: string;
  params?: Record<string, string>;
  body?: B;
}

export class ReptileApi {
  static pathPrefix: string = import.meta.env.VITE_API_URL;
  private static _token: string;

  static get token() {
    return this._token;
  }

  static set token(value: string) {
    this._token = value;
    localStorage.setItem("token", value);
  }

  static async request<T, B>(
    path: string,
    { params = {}, method, body }: RequestParams<B>
  ): Promise<T> {
    const urlParams = new URLSearchParams(params);
    const url = new URL(path, this.pathPrefix);

    const res = await fetch(`${url}?${urlParams}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      if (res.status == 401) {
        localStorage.removeItem("token");
      }

      throw new ApiError(`${method} ${path}: ${res.status}`, await res.json());
    }

    return await res.json();
  }

  static async get<T>(
    path: string,
    params: Record<string, string>
  ): Promise<T> {
    return this.request<T, undefined>(path, { method: "GET", params });
  }

  static async post<T, B>(path: string, body: B): Promise<T> {
    return this.request<T, B>(path, { method: "POST", body });
  }

  static async put<T, B>(path: string, body: B): Promise<T> {
    return this.request<T, B>(path, { method: "PUT", body });
  }

  static async delete<T>(path: string): Promise<T> {
    return this.request<T, undefined>(path, { method: "DELETE" });
  }

  static initAuth() {
    const token = localStorage.getItem("token");
    if (!token) return false;

    this._token = token;
    return true;
  }
}

function stringifyError(error: Error): string {
  if (error instanceof ApiError) {
    return error.data["error"];
  }

  return error.message;
}

type QueryStatus<T> =
  | { loading: true; data: null; error: null }
  | { loading: false; data: T; error: null }
  | { loading: false; data: null; error: string };

type QueryReturn<T> = QueryStatus<T> & { refetch: () => void };

export function useQuery<T>(
  path: string,
  params: Record<string, string> = {}
): QueryReturn<T> {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const makeRequest = () => {
    setLoading(true);
    ReptileApi.get<T>(path, params)
      .then((value) => setData(value))
      .catch((err) => {
        console.error(error);
        setError(stringifyError(err));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => makeRequest(), []);

  return { loading, data, error, refetch: makeRequest } as QueryReturn<T>;
}

type MutationFunction<B, T> = (data: B) => Promise<T>;
type MutationReturn<B, T> = [MutationFunction<B, T>, QueryStatus<T>];

export function useCreate<B, T>(path: string): MutationReturn<B, T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (body: B) => {
    setLoading(true);
    return new Promise((resolve) => {
      ReptileApi.post<T, B>(path, body)
        .then((value) => {
          setData(value);
          setError(null);
          resolve(value);
        })
        .catch((err) => {
          setError(stringifyError(err));
        })
        .finally(() => setLoading(false));
    });
  };

  return [mutate, { loading, data, error }] as MutationReturn<B, T>;
}

export function useUpdate<B, T>(path: string): MutationReturn<B, T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (body: B) => {
    setLoading(true);
    return new Promise((resolve) => {
      ReptileApi.put<T, B>(path, body)
        .then((value) => {
          setData(value);
          setError(null);
          resolve(value);
        })
        .catch((err) => setError(stringifyError(err)))
        .finally(() => setLoading(false));
    });
  };

  return [mutate, { loading, data, error }] as MutationReturn<B, T>;
}

type DeleteReturn<T> = [() => Promise<T>, QueryStatus<T>];

export function useDelete<T>(path: string): DeleteReturn<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mutate = async () => {
    setLoading(true);
    return new Promise((resolve) => {
      ReptileApi.delete<T>(path)
        .then((value) => {
          setData(value);
          setError(null);
          resolve(value);
        })
        .catch((err) => {
          setError(stringifyError(err));
        })
        .finally(() => setLoading(false));
    });
  };

  return [mutate, { loading, data, error }] as DeleteReturn<T>;
}
