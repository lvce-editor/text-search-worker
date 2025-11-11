import { DirentType } from '@lvce-editor/constants'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { IconRequest } from '../IconRequest/IconRequest.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'

const getFileName = (text: string): string => {
  if (text.startsWith('./')) {
    return text.slice(2)
  }
  return text
}

const getMissingDirents = (items: readonly SearchResult[], fileIconCache: FileIconCache): readonly SearchResult[] => {
  const missingDirents: SearchResult[] = []
  for (const item of items) {
    const uri = getFileName(item.text)

    if (!(uri in fileIconCache)) {
      missingDirents.push(item)
    }
  }
  return missingDirents
}

const toIconRequest = (item: SearchResult): IconRequest => {
  return {
    type: DirentType.File,
    name: getFileName(item.text),
    path: getFileName(item.text),
  }
}

export const getMissingIconRequests = (dirents: readonly SearchResult[], fileIconCache: FileIconCache): readonly IconRequest[] => {
  const missingRequests = getMissingDirents(dirents, fileIconCache)
  const iconRequests = missingRequests.map(toIconRequest)
  return iconRequests
}
