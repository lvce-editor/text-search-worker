export const getPaddingLeft = (depth: number): string => {
  return `${Number(depth) + 1}rem` // TODO use classname and dynamic css
}
