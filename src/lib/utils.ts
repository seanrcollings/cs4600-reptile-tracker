type ErrorData =
  | string
  | {
      instancePath?: string;
      message: string;
    };

export function error(...errors: ErrorData[]) {
  return {
    errors: errors.map((m) => {
      if (typeof m == "string") {
        return { message: m };
      } else {
        return m;
      }
    }),
  };
}
