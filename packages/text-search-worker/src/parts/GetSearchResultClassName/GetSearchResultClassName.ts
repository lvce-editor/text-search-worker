import { ClassNames } from '@lvce-editor/virtual-dom-worker'

export const getSearchResultClassName = (isFocused: boolean): string => {
  if (isFocused) {
    return ClassNames.TreeItem + ' ' + ClassNames.TreeItemActive
  }
  return ClassNames.TreeItem
}
