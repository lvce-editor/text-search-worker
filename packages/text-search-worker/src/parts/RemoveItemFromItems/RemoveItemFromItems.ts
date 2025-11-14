import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as Arrays from '../Arrays/Arrays.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

interface RemoveIndices {
  startIndex: number
  removeCount: number
  newFocusedIndex: number
  newFileCount: number
  newMatchCount: number
}

const getSetSize = (items: readonly SearchResult[], index: number): number => {
  let setSize = 0
  for (let i = index + 1; i < items.length; i++) {
    if (items[i].type === TextSearchResultType.File) {
      break
    }
    setSize++
  }
  return setSize
}

const getRemoveIndicesFile = (
  items: readonly SearchResult[],
  item: SearchResult,
  index: number,
  matchCount: number,
  fileCount: number,
): RemoveIndices => {
  const setSize = getSetSize(items, index)
  return {
    startIndex: index,
    removeCount: setSize + 1,
    newFocusedIndex: index + setSize + 1 < items.length ? index : index - 1,
    newFileCount: fileCount - 1,
    newMatchCount: matchCount - setSize,
  }
}

const getRemoveIndicesMatch = (items: readonly SearchResult[], index: number, matchCount: number, fileCount: number): RemoveIndices => {
  for (let i = index; i >= 0; i--) {
    if (items[i].type === TextSearchResultType.File) {
      const setSize = getSetSize(items, i)
      if (setSize === 1) {
        return {
          startIndex: i,
          removeCount: 2,
          newFocusedIndex: i - 1,
          newFileCount: fileCount - 1,
          newMatchCount: matchCount - 1,
        }
      }
      return {
        startIndex: index,
        removeCount: 1,
        newFocusedIndex: index,
        newFileCount: fileCount,
        newMatchCount: matchCount - 1,
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
  const { startIndex, removeCount, newFocusedIndex, newFileCount, newMatchCount } = getRemoveIndices(items, index, matchCount, fileCount)
  const newItems = Arrays.remove(items, startIndex, removeCount)
  return {
    newItems,
    newFocusedIndex,
    newFileCount,
    newMatchCount,
  }
}
