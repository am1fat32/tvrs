export function convertKebabToPascal(str) {
  return str
    .split("-")
    .map((it) => it[0].toUpperCase().concat(it.slice(1)))
    .join("");
}
