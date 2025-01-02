import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getSearchResultClassName = (focused: boolean): string => {
  if (focused) {
    return ClassNames.TreeItem + ' ' + ClassNames.TreeItemActive
  }
  return ClassNames.TreeItem
}
