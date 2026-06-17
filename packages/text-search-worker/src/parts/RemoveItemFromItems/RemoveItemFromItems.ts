import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as Arrays from '../Arrays/Arrays.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

interface RemoveIndices {
  itemsToRemove: number
  newFileCount: number
  newFocusedIndex: number
  newMatchCount: number
  startIndex: number
}

const getSetSize = (items: readonly SearchResult[], index: number): number => {
  let childCount = 0
  for (let i = index + 1; i < items.length; i++) {
    if (items[i].type === TextSearchResultType.File) {
      break
    }
    childCount++
  }
  return childCount
}

const getRemoveIndicesFile = (
  items: readonly SearchResult[],
  item: SearchResult,
  index: number,
  matchCount: number,
  fileCount: number,
): RemoveIndices => {
  const childCount = getSetSize(items, index)
  return {
    itemsToRemove: childCount + 1,
    newFileCount: fileCount - 1,
    newFocusedIndex: index + childCount + 1 < items.length ? index : index - 1,
    newMatchCount: matchCount - childCount,
    startIndex: index,
  }
}

const getRemoveIndicesMatch = (items: readonly SearchResult[], index: number, matchCount: number, fileCount: number): RemoveIndices => {
  for (let i = index; i >= 0; i--) {
    if (items[i].type === TextSearchResultType.File) {
      const childCount = getSetSize(items, i)
      if (childCount === 1) {
        return {
          itemsToRemove: 2,
          newFileCount: fileCount - 1,
          newFocusedIndex: i - 1,
          newMatchCount: matchCount - 1,
          startIndex: i,
        }
      }
      return {
        itemsToRemove: 1,
        newFileCount: fileCount,
        newFocusedIndex: index,
        newMatchCount: matchCount - 1,
        startIndex: index,
      }
    }
  }
  throw new Error('could not compute indices to remove')
}

const getRemoveIndices = (items: readonly SearchResult[], index: number, matchCount: number, fileCount: number): RemoveIndices => {
  const item = items[index]
  switch (item.type) {
    case TextSearchResultType.File:
      return getRemoveIndicesFile(items, item, index, matchCount, fileCount)
    case TextSearchResultType.Match:
      return getRemoveIndicesMatch(items, index, matchCount, fileCount)
    default:
      throw new Error('unknown search result type')
  }
}

export const removeItemFromItems = (items: readonly SearchResult[], index: number, matchCount: number, fileCount: number): any => {
  const { itemsToRemove, newFileCount, newFocusedIndex, newMatchCount, startIndex } = getRemoveIndices(items, index, matchCount, fileCount)
  const newItems = Arrays.remove(items, startIndex, itemsToRemove)
  return {
    newFileCount,
    newFocusedIndex,
    newItems,
    newMatchCount,
  }
}
