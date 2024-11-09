import * as Assert from '../Assert/Assert.ts'
import * as FileHandleType from '../FileHandleType/FileHandleType.ts'
import * as GetDirectoryHandle from '../GetDirectoryHandle/GetDirectoryHandle.ts'
import * as TextSearchInFile from '../TextSearchInFile/TextSearchInFile.ts'
import { VError } from '../VError/VError.ts'

const textSearchRecursively = async (all: any[], parent: string, handle: any, query: string): Promise<void> => {
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

export const textSearch = async (scheme: string, root: string, query: string): Promise<readonly any[]> => {
  Assert.string(scheme)
  Assert.string(root)
  Assert.string(query)
  const relativeRoot = root.slice('html://'.length)
  const handle = await GetDirectoryHandle.getDirectoryHandle(relativeRoot)
  if (!handle) {
    throw new VError(`Folder not found ${relativeRoot}`)
  }
  const all: any[] = []
  await textSearchRecursively(all, '', handle, query)
  return all
}
