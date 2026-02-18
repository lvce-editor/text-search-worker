const getIndentRule = (indent: number): string => {
  return `.Indent-${indent} {
  padding-left: ${indent}px;
}`
}

export const getCss = (top: number, uniqueIndents: readonly number[]): string => {
  const rules = [
    `.Search {
  --ScrollBarHeight: 20px;
  --ScrollBarTop: 20px;
  --TreeItemsTop: ${top}px;
}
  `,

    ...uniqueIndents.map(getIndentRule),
  ]
  return rules.join('\n')
}
