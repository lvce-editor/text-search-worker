import * as Assert from '../Assert/Assert.ts'
import * as OpenUri from '../OpenUri/OpenUri.js'
import { SearchState } from '../SearchState/SearchState.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.js'
import * as Workspace from '../Workspace/Workspace.js'

const getFileIndex = (items: readonly any[], index: number): number => {
  for (let i = index; i >= 0; i--) {
    const item = items[i]
    if (item.type === TextSearchResultType.File) {
      return i
    }
  }
  return -1
}

const selectIndexFile = async (state: SearchState, searchResult: any, index: number): Promise<SearchState> => {
  const { collapsedPaths } = state
  const path = Workspace.getAbsolutePath(searchResult.text)
  Assert.string(path)
  return {
    ...state,
    collapsedPaths: [...collapsedPaths, path],
    listFocusedIndex: index,
    listFocused: true,
  }
}

const selectIndexPreview = async (state: SearchState, searchResult: any, index: number): Promise<SearchState> => {
  const { items } = state
  const fileIndex = getFileIndex(items, index)
  if (fileIndex === -1) {
    throw new Error('Search result is missing file')
  }
  const { lineNumber } = searchResult
  // console.log({ searchResult })
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

export const selectIndex = async (state: SearchState, index: number, isClose: boolean): Promise<SearchState> => {
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
      return selectIndexFile(state, searchResult, index)
    case TextSearchResultType.Match:
      return selectIndexPreview(state, searchResult, index)
    default:
      throw new Error(`unexpected search result type ${searchResult.type}`)
  }
}
