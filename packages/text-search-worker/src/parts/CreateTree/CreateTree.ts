import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { Tree } from '../Tree/Tree.ts'
import * as Path from '../Path/Path.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const createTree = (items: readonly SearchResult[], root: string): Tree => {
  const tree: Record<string, SearchResult[]> = Object.create(null)
  for (const item of items) {
    const { type, text } = item
    if (type === TextSearchResultType.File) {
      const relativePath = text
      const dirname = Path.dirname2(relativePath)
      tree[dirname] ||= []
      tree[dirname].push(item)
    }
  }
  return tree
}
