export function showTwoDecimals(number) {
  if (typeof number === "number") return parseInt(number * 100) / 100;
  throw new Error();
}
