import { useState } from "react";
import { useActionData } from "react-router";

interface Error<T> {
  errors: T | null;
}

export function useErrorData<T = string>(): T | null {
  const data = useActionData() as Error<T>;

  if (data?.error) {
    return data.error;
  }

  return null;
}

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
