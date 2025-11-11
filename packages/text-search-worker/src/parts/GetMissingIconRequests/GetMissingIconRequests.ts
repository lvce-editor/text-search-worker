import { DirentType } from '@lvce-editor/constants'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { IconRequest } from '../IconRequest/IconRequest.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import { getFilePath } from '../GetFileName/GetFileName.ts'
import { isFile } from '../IsFile/IsFile.ts'

const getMissingDirents = (searchResults: readonly SearchResult[], fileIconCache: FileIconCache): readonly SearchResult[] => {
  const missingDirents: SearchResult[] = []
  const files = searchResults.filter(isFile)
  for (const file of files) {
    const uri = getFilePath(file.text)

    if (!(uri in fileIconCache)) {
      missingDirents.push(file)
    }
  }
  return missingDirents
}

const toIconRequest = (item: SearchResult): IconRequest => {
  return {
    type: DirentType.File,
    name: getFilePath(item.text),
    path: getFilePath(item.text),
  }
}

export const getMissingIconRequests = (dirents: readonly SearchResult[], fileIconCache: FileIconCache): readonly IconRequest[] => {
  const missingRequests = getMissingDirents(dirents, fileIconCache)
  const iconRequests = missingRequests.map(toIconRequest)
  return iconRequests
}
