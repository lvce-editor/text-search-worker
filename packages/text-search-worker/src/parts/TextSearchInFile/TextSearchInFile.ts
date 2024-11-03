import * as Arrays from '../Arrays/Arrays.ts'
import * as BrowserErrorTypes from '../BrowserErrorTypes/BrowserErrorTypes.ts'
import * as FileSystemFileHandle from '../FileSystemFileHandle/FileSystemFileHandle.ts'
import * as TextSearchInText from '../TextSearchInText/TextSearchInText.ts'

export const textSearchInFile = async (all: string, handle: any, absolutePath: string, query: string) => {
  try {
    const file = await FileSystemFileHandle.getFile(handle)
    const content = await file.text()
    const results = TextSearchInText.textSearchInText(absolutePath, content, query)
    Arrays.push(all, results)
  } catch (error) {
    if (BrowserErrorTypes.isNotReadableError(error)) {
      // ignore
      return
    }
    throw error
  }
}
