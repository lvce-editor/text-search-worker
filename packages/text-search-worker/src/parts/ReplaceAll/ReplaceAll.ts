import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetBulkReplacementEdits from '../GetBulkReplacementEdits/GetBulkReplacementEdits.ts'
import * as GetReplaceElements from '../GetReplaceElements/GetReplaceElements.ts'
import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const replaceAll = async (state: SearchState): Promise<SearchState> => {
  const { workspacePath, items, replacement } = state
  const bulkEdits = GetReplaceElements.getReplaceElements(items, workspacePath, replacement)
  await Rpc.invoke('BulkReplacement.applyBulkReplacement', bulkEdits)
  return state
}
