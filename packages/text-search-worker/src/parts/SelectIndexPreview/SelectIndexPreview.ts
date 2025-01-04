import type { SearchState } from '../SearchState/SearchState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as GetFileIndex from '../GetFileIndex/GetFileIndex.ts'
import * as OpenUri from '../OpenUri/OpenUri.ts'
import * as Workspace from '../Workspace/Workspace.ts'

export const selectIndexPreview = async (state: SearchState, searchResult: any, index: number): Promise<SearchState> => {
  const { items } = state
  const fileIndex = GetFileIndex.getFileIndex(items, index)
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
