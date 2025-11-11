import type { BulkReplacementEdit } from '../BulkReplacementEdit/BulkReplacementEdit.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { TextEdit } from '../TextEdit/TextEdit.ts'
import * as GetFileName from '../GetFileName/GetFileName.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const getReplaceElements = (items: readonly SearchResult[], workspacePath: string, replacement: string): readonly BulkReplacementEdit[] => {
  let element: BulkReplacementEdit = {
    uri: '',
    changes: [],
  }
  const bulkChanges: BulkReplacementEdit[] = []
  let changes: TextEdit[] = []
  // TODO simplify code by first matching files with their elements, then creating bulk edits
  for (const match of items) {
    const { type, text, lineNumber, end, start } = match
    if (type === TextSearchResultType.File) {
      changes = []
      const fileName = GetFileName.getFilePath(text)
      const absolutePath = `${workspacePath}/${fileName}`
      element = {
        uri: absolutePath,
        changes,
      }
      bulkChanges.push(element)
    } else {
      changes.push({
        text: replacement,
        startRowIndex: lineNumber - 1,
        startColumnIndex: start,
        endRowIndex: lineNumber,
        endColumnIndex: end,
      })
    }
  }
  return bulkChanges
}
