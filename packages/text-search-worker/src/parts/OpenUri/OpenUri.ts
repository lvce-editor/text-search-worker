import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const openUri = async (path: string, focus = true, props = {}): Promise<void> => {
  await RendererWorker.openUri(path, focus, props)
}
