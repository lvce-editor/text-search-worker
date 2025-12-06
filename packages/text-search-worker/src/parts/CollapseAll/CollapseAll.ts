import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

const getPaths = (items: readonly SearchResult[]): readonly string[] => {
  const paths: string[] = []
  for (const item of items) {
    if (item.type === TextSearchResultType.File) {
      paths.push(item.text)
    }
  }
  return paths
}

export const collapseAll = async (state: SearchState): Promise<SearchState> => {
  const { fileIconCache, headerHeight, height, itemHeight, items } = state
  if (items.length === 0) {
    return state
  }
  const paths = getPaths(items)
  const total = items.length
  const listHeight = height - headerHeight
  const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const maxLineY = Math.min(numberOfVisible, total)
  const visible = items.slice(0, maxLineY)
  const { icons, newFileIconCache } = await GetFileIcons.getFileIcons(visible, fileIconCache)
  return {
    ...state,
    collapsedPaths: paths,
    fileIconCache: newFileIconCache,
    icons,
  }
}
