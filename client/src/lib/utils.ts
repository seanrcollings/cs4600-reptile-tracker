export function speciesName(name: string) {
  switch (name) {
    case "ball_python":
      return "Ball Python";
    case "king_snake":
      return "King Snake";
    case "corn_snake":
      return "Corn Snake";
    case "redtail_boa":
      return "Redtail Boa";
    default:
      return "Unkown";
  }
}
export function sexName(sex: string) {
  switch (sex) {
    case "m":
    case "M":
      return "Male";
    case "f":
    case "F":
      return "Female";
    default:
      return "Unkown";
  }
}

export function fmtDate(value: Date | string) {
  const date = new Date(value);
  return date.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function sentenceCase(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export type DayName =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export function getTodaysName(): DayName {
  const date = new Date();
  return date
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase() as DayName;
}
