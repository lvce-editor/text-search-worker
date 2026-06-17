import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { Tree } from '../Tree/Tree.ts'
import * as Path from '../Path/Path.ts'

export const createFullParentFolderTree = (folders: readonly string[]): Tree => {
  const denseTree: Record<string, SearchResult[]> = Object.create(null)
  for (const path of folders) {
    let currentPath = path
    let parentPath = Path.dirname2(currentPath)
    while (parentPath !== currentPath) {
      denseTree[parentPath] ||= []
      currentPath = parentPath
      parentPath = Path.dirname2(currentPath)
    }
  }

  return denseTree
}
