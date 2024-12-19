import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetBulkReplacementEdits from '../GetBulkReplacementEdits/GetBulkReplacementEdits.ts'
import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const replaceAll = async (state: SearchState): Promise<SearchState> => {
  const { workspacePath, items, replacement } = state
  const { files, ranges } = GetBulkReplacementEdits.getBulkReplacementEdits(workspacePath, items)
  await Rpc.invoke('BulkReplacement.applyBulkReplacement', files, ranges, replacement)
  return state
}
