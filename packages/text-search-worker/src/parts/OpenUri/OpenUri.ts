import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const openUri = async (path: string, focus = true, props = {}): Promise<void> => {
  await Rpc.invoke(/* Main.openUri */ 'Main.openUri', /* uri */ path, /* focus */ focus, props)
}
