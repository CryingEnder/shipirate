export function addDarkmode(classes) {
  if (typeof classes === "string" && classes) {
    classes = ` ${classes}`;
    let newClasses = classes.replace(/\s/g, ` dark:`).replace(" ", "");
    return newClasses;
  }
  throw new Error();
}
