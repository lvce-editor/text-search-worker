import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const applyBulkReplacement = async (bulkEdits: readonly any[]): Promise<void> => {
  await ParentRpc.invoke('BulkReplacement.applyBulkReplacement', bulkEdits)
}
