export function error(...messages: string[]) {
  return {
    errors: messages.map((m) => ({
      message: m,
    })),
  };
}
