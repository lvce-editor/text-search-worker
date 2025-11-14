import type { Rpc } from '@lvce-editor/rpc'
import { TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const launchSearchProcessElectron = async (): Promise<Rpc> => {
  const rpc = await TransferMessagePortRpcParent.create({
    commandMap: {},
    send: RendererWorker.sendMessagePortToSearchProcess,
  })
  return rpc
}
