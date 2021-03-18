export function addBreakpoint(breakpoint, classes) {
  if (
    typeof breakpoint === "string" &&
    typeof classes === "string" &&
    classes
  ) {
    classes = ` ${classes}`;
    const newClasses = classes
      .replace(/\s/g, ` ${breakpoint}:`)
      .replace(" ", "");
    return newClasses;
  }
  throw new Error();
}
