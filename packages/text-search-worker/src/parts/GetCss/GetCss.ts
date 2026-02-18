export const getCss = (top: number): string => {
  return `.Search {
  --ScrollBarHeight: 20px;
  --ScrollBarTop: 20px;
  --TreeItemsTop: ${top}px;
}
  `
}
