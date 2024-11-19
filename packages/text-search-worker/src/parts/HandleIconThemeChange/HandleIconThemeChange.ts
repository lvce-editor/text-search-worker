import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

export const handleIconThemeChange = async (state: SearchState): Promise<SearchState> => {
  const { items, minLineY, maxLineY } = state
  const visibleItems = items.slice(minLineY, maxLineY)
  const icons = await GetFileIcons.getFileIcons(visibleItems)
  return {
    ...state,
    icons,
  }
}
