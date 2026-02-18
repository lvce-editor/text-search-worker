const getIndentRule = (indent: number): string => {
  return `.Indent-${indent} {
  padding-left: ${indent}px;
}`
}

export const getCss = (top: number, uniqueIndents: readonly number[], scrollBarHeight: number, scrollBarY: number): string => {
  const rules = [
    `.Search {
  --ScrollBarHeight: ${scrollBarHeight}px;
  --ScrollBarTop: ${scrollBarY}px;
  --TreeItemsTop: ${top}px;
}
  `,

    ...uniqueIndents.map(getIndentRule),
  ]
  return rules.join('\n')
}
