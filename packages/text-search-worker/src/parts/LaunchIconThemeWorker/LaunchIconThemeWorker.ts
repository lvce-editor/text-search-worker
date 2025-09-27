import type { Rpc } from '@lvce-editor/rpc'
import { TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

const send = async (port: MessagePort): Promise<void> => {
  await RendererWorker.sendMessagePortToIconThemeWorker(port, 0)
}

export const launchIconThemeWorker = async (): Promise<Rpc> => {
  // TODO connect to icon theme worker
  const rpc = await TransferMessagePortRpcParent.create({
    commandMap: {},
    send,
  })
  return rpc
}
