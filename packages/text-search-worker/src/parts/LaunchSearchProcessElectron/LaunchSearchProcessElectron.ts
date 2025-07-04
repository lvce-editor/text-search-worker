import type { Rpc } from '@lvce-editor/rpc'
import { TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const launchSearchProcessElectron = async (): Promise<Rpc> => {
  const rpc = await TransferMessagePortRpcParent.create({
    commandMap: {},
    send: RendererWorker.sendMessagePortToSearchProcess,
  })
  return rpc
}
