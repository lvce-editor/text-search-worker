import type { Rpc } from '@lvce-editor/rpc';
import { MessagePortRpcParent } from '@lvce-editor/rpc'
import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'
import * as SearchProcess from '../SearchProcess/SearchProcess.ts'

export const launchSearchProcessElectron = async (): Promise<Rpc> => {
  const { port1, port2 } = GetPortTuple.getPortTuple()
  const rpcPromise = MessagePortRpcParent.create({
    messagePort: port2,
    commandMap: {},
    isMessagePortOpen: true,
  })
  await RendererWorker.invokeAndTransfer(
    'SendMessagePortToElectron.sendMessagePortToElectron',
    port1,
    'HandleMessagePortForSearchProcess.handleMessagePortForSearchProcess',
  )
  port2.start()
  const rpc = await rpcPromise
  SearchProcess.set(rpc)
  return rpc
}
