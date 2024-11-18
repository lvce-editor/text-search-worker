import { FileNotFoundError } from '../../errors/FileNotFoundError.ts'
import * as Assert from '../Assert/Assert.ts'
import * as FileHandleType from '../FileHandleType/FileHandleType.ts'
import * as GetDirectoryHandle from '../GetDirectoryHandle/GetDirectoryHandle.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as TextSearchInFile from '../TextSearchInFile/TextSearchInFile.ts'

const textSearchRecursively = async (all: SearchResult[], parent: string, handle: any, query: string): Promise<void> => {
  const childHandles: any[] = []
  // TODO
  // await FileSystemHtml.getChildHandles(handle)
  const promises: any[] = []
  for (const childHandle of childHandles) {
    const absolutePath = parent + '/' + childHandle.name
    switch (childHandle.kind) {
      case FileHandleType.Directory:
        promises.push(textSearchRecursively(all, absolutePath, childHandle, query))
        break
      case FileHandleType.File:
        promises.push(TextSearchInFile.textSearchInFile(all, childHandle, absolutePath, query))
        break
      default:
        break
    }
  }
  await Promise.all(promises)
}

export const textSearch = async (scheme: string, root: string, query: string): Promise<readonly SearchResult[]> => {
  Assert.string(scheme)
  Assert.string(root)
  Assert.string(query)
  const relativeRoot = root.slice('html://'.length)
  const handle = await GetDirectoryHandle.getDirectoryHandle(relativeRoot)
  if (!handle) {
    throw new FileNotFoundError(`Folder not found: ${relativeRoot}`)
  }
  const all: SearchResult[] = []
  await textSearchRecursively(all, '', handle, query)
  return all
}
