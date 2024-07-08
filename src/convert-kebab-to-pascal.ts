export function convertKebabToPascal(str: string): string {
  return str
    .split("-")
    .map((it) => it[0].toUpperCase().concat(it.slice(1)))
    .join("");
}
