import { MessagePortRpcParent } from '@lvce-editor/rpc'
import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'
import * as ParentRpc from '../RendererWorker/RendererWorker.ts'

export const launchSearchProcessElectron = async (): Promise<any> => {
  const { port1, port2 } = GetPortTuple.getPortTuple()
  const rpcPromise = MessagePortRpcParent.create({
    messagePort: port2,
    commandMap: {},
    isMessagePortOpen: true,
  })
  await ParentRpc.invokeAndTransfer(
    'SendMessagePortToElectron.sendMessagePortToElectron',
    port1,
    'HandleMessagePortForSearchProcess.handleMessagePortForSearchProcess',
  )
  port2.start()
  const rpc = await rpcPromise
  return rpc
}
