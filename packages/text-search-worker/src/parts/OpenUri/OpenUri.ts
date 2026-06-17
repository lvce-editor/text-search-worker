import { RendererWorker } from '@lvce-editor/rpc-registry'

export const openUri = async (path: string, shouldFocus = true, props = {}): Promise<void> => {
  await RendererWorker.openUri(path, shouldFocus, props)
}
