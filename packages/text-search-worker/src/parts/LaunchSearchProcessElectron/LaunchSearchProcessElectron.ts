import type { Rpc } from '@lvce-editor/rpc'
import { TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

const send = async (port: MessagePort): Promise<void> => {
  await RendererWorker.invokeAndTransfer(
    'SendMessagePortToElectron.sendMessagePortToElectron',
    port,
    'HandleMessagePortForSearchProcess.handleMessagePortForSearchProcess',
  )
}

export const launchSearchProcessElectron = async (): Promise<Rpc> => {
  const rpc = await TransferMessagePortRpcParent.create({
    commandMap: {},
    send,
  })
  return rpc
}
