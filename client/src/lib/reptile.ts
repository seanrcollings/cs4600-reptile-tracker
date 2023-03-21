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
