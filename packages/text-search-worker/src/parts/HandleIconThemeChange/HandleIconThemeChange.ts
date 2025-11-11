import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'

export const handleIconThemeChange = async (state: SearchState): Promise<SearchState> => {
  const { items, minLineY, maxLineY } = state
  const visibleItems = items.slice(minLineY, maxLineY)
  const { icons, newFileIconCache } = await GetFileIcons.getFileIcons(visibleItems, {})
  return {
    ...state,
    icons,
    fileIconCache: newFileIconCache,
  }
}
