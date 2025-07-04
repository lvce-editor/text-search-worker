import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const applyBulkReplacement = async (bulkEdits: readonly any[]): Promise<void> => {
  await RendererWorker.invoke('BulkReplacement.applyBulkReplacement', bulkEdits)
}
