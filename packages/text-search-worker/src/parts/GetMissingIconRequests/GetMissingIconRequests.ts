import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { IconRequest } from '../IconRequest/IconRequest.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'

const getMissingDirents = (dirents: readonly SearchResult[], fileIconCache: FileIconCache): readonly SearchResult[] => {
  const missingDirents: SearchResult[] = []
  for (const dirent of dirents) {
    const uri = ''
    if (!(uri in fileIconCache)) {
      missingDirents.push(dirent)
    }
  }
  return missingDirents
}

const toIconRequest = (dirent: SearchResult): IconRequest => {
  return {
    type: dirent.type,
    name: '',
    path: '',
  }
}

export const getMissingIconRequests = (dirents: readonly SearchResult[], fileIconCache: FileIconCache): readonly IconRequest[] => {
  const missingRequests = getMissingDirents(dirents, fileIconCache)
  const iconRequests = missingRequests.map(toIconRequest)
  return iconRequests
}
