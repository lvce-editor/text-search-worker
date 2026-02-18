const getIndentRule = (indent: number): string => {
  return `.Indent-${indent} {
  padding-left: ${indent}px;
}`
}

const getIndentRightRule = (indentRight: number): string => {
  return `.IndentRight-${indentRight} {
  padding-right: ${indentRight}px;
}`
}

const getTreeItemsTopRule = (treeItemsTop: number): string => {
  return `.TreeItemsTop-${treeItemsTop} {
  top: ${treeItemsTop}px;
}`
}

export const getCss = (
  top: number,
  uniqueIndents: readonly number[],
  uniqueIndentRights: readonly number[],
  scrollBarHeight: number,
  scrollBarY: number,
  treeItemsTop: number,
): string => {
  const rules = [
    `.Search {
  --ScrollBarHeight: ${scrollBarHeight}px;
  --ScrollBarTop: ${scrollBarY}px;
  --TreeItemsTop: ${top}px;
}
  `,

    ...uniqueIndents.map(getIndentRule),
    ...uniqueIndentRights.map(getIndentRightRule),
    getTreeItemsTopRule(treeItemsTop),
  ]
  return rules.join('\n')
}
