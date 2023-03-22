import { useState } from "react";

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
