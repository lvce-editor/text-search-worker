import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFileIndex from '../GetFileIndex/GetFileIndex.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as OpenUri from '../OpenUri/OpenUri.ts'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import * as Workspace from '../Workspace/Workspace.ts'

export const selectIndexPreview = async (state: SearchState, searchResult: any, index: number): Promise<SearchState> => {
  const { items, workspacePath } = state
  const fileIndex = GetFileIndex.getFileIndex(items, index)
  if (fileIndex === -1) {
    throw new Error('Search result is missing file')
  }
  const { lineNumber } = searchResult
  const fileResult = items[fileIndex]
  const relativePath = Workspace.getRelativePath(fileResult.text)
  const absolutePath = `${workspacePath}${relativePath}`
  await OpenUri.openUri(absolutePath, true, {
    selections: new Uint32Array([lineNumber, 0, lineNumber, 0]),
  })
  return {
    ...state,
    listFocusedIndex: index,
    listFocused: false,
    focus: WhenExpression.FocusSearchResults,
    focusSource: InputSource.Script,
  }
}
