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
      let currentPath = text
      while (true) {
        const parentPath = Path.dirname2(currentPath)
        if (parentPath === currentPath) {
          break
        }
        tree[parentPath] ||= []
        currentPath = parentPath
      }
      if (currentPath === relativePath) {
        tree[rootUri].push({
          type: 5,
          end: 0,
          lineNumber: 0,
          start: 0,
          text: currentPath,
        })
      } else {
        tree[currentPath] ||= []
        tree[currentPath].push(item)
      }
      tree[text] = []
    } else {
      tree[file].push(item)
    }
  }
  return tree
}
