import { type Rpc, LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMapRef from '../CommandMapRef/CommandMapRef.ts'

export const launchSearchProcessElectron = async (): Promise<Rpc> => {
  return LazyTransferMessagePortRpcParent.create({
    commandMap: CommandMapRef.commandMapRef,
    send: RendererWorker.sendMessagePortToSearchProcess,
  })
}
