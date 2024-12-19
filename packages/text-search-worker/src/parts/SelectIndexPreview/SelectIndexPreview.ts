import type { SearchState } from '../SearchState/SearchState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as OpenUri from '../OpenUri/OpenUri.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'
import * as Workspace from '../Workspace/Workspace.ts'

const getFileIndex = (items: readonly any[], index: number): number => {
  for (let i = index; i >= 0; i--) {
    const item = items[i]
    if (item.type === TextSearchResultType.File) {
      return i
    }
  }
  return -1
}

export const selectIndexPreview = async (state: SearchState, searchResult: any, index: number): Promise<SearchState> => {
  const { items } = state
  const fileIndex = getFileIndex(items, index)
  if (fileIndex === -1) {
    throw new Error('Search result is missing file')
  }
  const { lineNumber } = searchResult
  const fileResult = items[fileIndex]
  const path = Workspace.getAbsolutePath(fileResult.text)
  Assert.string(path)
  await OpenUri.openUri(path, true, {
    selections: new Uint32Array([lineNumber, 0, lineNumber, 0]),
  })
  return {
    ...state,
    listFocusedIndex: index,
    listFocused: false,
  }
}
