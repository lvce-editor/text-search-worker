import * as ParentRpc from '../RendererWorker/RendererWorker.ts'

export const applyBulkReplacement = async (bulkEdits: readonly any[]): Promise<void> => {
  await ParentRpc.invoke('BulkReplacement.applyBulkReplacement', bulkEdits)
}
