import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { Tree } from '../Tree/Tree.ts'
import * as Path from '../Path/Path.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const createParentFolderTree = (items: readonly SearchResult[]): Tree => {
  const tree: Record<string, SearchResult[]> = Object.create(null)
  let file = ''
  const rootUri = ''
  tree[rootUri] = []
  for (const item of items) {
    const { type, text } = item
    if (type === TextSearchResultType.File) {
      file = text
      const relativePath = text
      const dirname = Path.dirname2(relativePath)
      if (dirname === relativePath) {
        tree[rootUri].push({
          type: 5,
          end: 0,
          lineNumber: 0,
          start: 0,
          text: dirname,
        })
      } else {
        tree[dirname] ||= []
        tree[dirname].push(item)
      }
      tree[text] = []
    } else {
      tree[file].push(item)
    }
  }
  return tree
}
