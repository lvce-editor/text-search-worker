import type { SearchState } from '../SearchState/SearchState.ts'
import * as SelectIndexFile from '../SelectIndexFile/SelectIndexFile.ts'
import * as SelectIndexPreview from '../SelectIndexPreview/SelectIndexPreview.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const selectIndex = async (state: SearchState, index: number): Promise<SearchState> => {
  if (index === -1) {
    return {
      ...state,
      listFocused: true,
      listFocusedIndex: -1,
    }
  }
  const { items } = state
  const searchResult = items[index]
  switch (searchResult.type) {
    case TextSearchResultType.File:
      return SelectIndexFile.selectIndexFile(state, searchResult, index)
    case TextSearchResultType.Match:
      return SelectIndexPreview.selectIndexPreview(state, searchResult, index)
    default:
      throw new Error(`unexpected search result type ${searchResult.type}`)
  }
}
