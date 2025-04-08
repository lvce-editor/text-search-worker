import type { SearchState } from '../SearchState/SearchState.ts'
import * as ApplyBulkReplacement from '../ApplyBulkReplacement/ApplyBulkReplacement.ts'
import * as GetReplacedMessage from '../GetReplacedMessage/GetReplacedMessage.ts'
import * as GetReplaceElements from '../GetReplaceElements/GetReplaceElements.ts'

export const replaceAll = async (state: SearchState): Promise<SearchState> => {
  const { workspacePath, items, replacement, matchCount } = state
  const bulkEdits = GetReplaceElements.getReplaceElements(items, workspacePath, replacement)
  await ApplyBulkReplacement.applyBulkReplacement(bulkEdits)
  const fileCount = bulkEdits.length
  const message = GetReplacedMessage.getReplacedMessage(fileCount, matchCount, replacement)
  return {
    ...state,
    items: [],
    listItems: [],
    minLineY: 0,
    maxLineY: 0,
    message,
  }
}
