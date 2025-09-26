import type { SearchResult } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../SearchState/SearchState.ts'
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
  const { items } = state
  if (items.length === 0) {
    return state
  }
  const paths = getPaths(items)
  return {
    ...state,
    collapsedPaths: paths,
  }
}
