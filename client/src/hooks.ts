import { useContext, useEffect, useState } from "react";
import { ApiContext, AuthContext } from "./context";
import { ApiError } from "./lib/api";

type UseBoolReturn = [boolean, () => void, () => void, () => void];

export function useBool(defaultValue: boolean = true): UseBoolReturn {
  const [value, setValue] = useState(defaultValue);

  return [
    value,
    () => setValue((v) => !v),
    () => setValue(true),
    () => setValue(false),
  ];
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useApi() {
  return useContext(ApiContext);
}

type QueryStatus<T> =
  | { loading: true; data: null; error: null }
  | { loading: false; data: T; error: null }
  | { loading: false; data: null; error: ApiError };

type QueryReturn<T> = QueryStatus<T> & { refetch: () => void };

export function useQuery<T>(
  path: string,
  params: Record<string, string> = {}
): QueryReturn<T> {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const api = useApi();

  const makeRequest = () => {
    setLoading(true);
    api
      .get<T>(path, params)
      .then((value) => setData(value))
      .catch((err) => setError(err))
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
  const [error, setError] = useState<ApiError | null>(null);

  const api = useApi();

  const mutate = async (body: B) => {
    setLoading(true);
    return new Promise((resolve) => {
      api
        .post<T, B>(path, body)
        .then((value) => {
          setData(value);
          setError(null);
          resolve(value);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => setLoading(false));
    });
  };

  return [mutate, { loading, data, error }] as MutationReturn<B, T>;
}

export function useUpdate<B, T>(path: string): MutationReturn<B, T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const api = useApi();

  const mutate = async (body: B) => {
    setLoading(true);
    return new Promise((resolve) => {
      api
        .put<T, B>(path, body)
        .then((value) => {
          setData(value);
          setError(null);
          resolve(value);
        })
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    });
  };

  return [mutate, { loading, data, error }] as MutationReturn<B, T>;
}

type DeleteReturn<T> = [() => Promise<T>, QueryStatus<T>];

export function useDelete<T>(path: string): DeleteReturn<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const api = useApi();

  const mutate = async () => {
    setLoading(true);
    return new Promise((resolve) => {
      api
        .delete<T>(path)
        .then((value) => {
          setData(value);
          setError(null);
          resolve(value);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => setLoading(false));
    });
  };

  return [mutate, { loading, data, error }] as DeleteReturn<T>;
}
