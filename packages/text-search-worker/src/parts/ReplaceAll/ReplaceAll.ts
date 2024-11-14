import * as GetBulkReplacementEdits from '../GetBulkReplacementEdits/GetBulkReplacementEdits.ts'
import * as Rpc from '../Rpc/Rpc.ts'

export const replaceAll = async (workspacePath: string, items: readonly any[], replacement: string): Promise<void> => {
  const { files, ranges } = GetBulkReplacementEdits.getBulkReplacementEdits(workspacePath, items)
  await Rpc.invoke('BulkReplacement.applyBulkReplacement', files, ranges, replacement)
}
