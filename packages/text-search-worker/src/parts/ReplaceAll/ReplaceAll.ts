import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetReplacedMessage from '../GetReplacedMessage/GetReplacedMessage.ts'
import * as GetReplaceElements from '../GetReplaceElements/GetReplaceElements.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const replaceAll = async (state: SearchState): Promise<SearchState> => {
  const { workspacePath, items, replacement, matchCount } = state
  const bulkEdits = GetReplaceElements.getReplaceElements(items, workspacePath, replacement)
  await ParentRpc.invoke('BulkReplacement.applyBulkReplacement', bulkEdits)
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
