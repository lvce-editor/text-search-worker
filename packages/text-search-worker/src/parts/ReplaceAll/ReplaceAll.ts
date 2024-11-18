import * as GetBulkReplacementEdits from '../GetBulkReplacementEdits/GetBulkReplacementEdits.ts'
import * as Rpc from '../ParentRpc/ParentRpc.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

export const replaceAll = async (state: SearchState, workspacePath: string, items: readonly any[], replacement: string): Promise<SearchState> => {
  const { files, ranges } = GetBulkReplacementEdits.getBulkReplacementEdits(workspacePath, items)
  await Rpc.invoke('BulkReplacement.applyBulkReplacement', files, ranges, replacement)
  return state
}
