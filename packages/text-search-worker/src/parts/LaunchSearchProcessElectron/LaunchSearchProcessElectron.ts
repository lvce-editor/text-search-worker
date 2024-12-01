import { MessagePortRpcParent } from '@lvce-editor/rpc'
import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const launchSearchProcessElectron = async (): Promise<any> => {
  const { port1, port2 } = GetPortTuple.getPortTuple()
  const rpcPromise = MessagePortRpcParent.create({
    messagePort: port2,
    commandMap: {},
    isMessagePortOpen: true,
  })
  console.log('before send port')
  await ParentRpc.invokeAndTransfer(
    'SendMessagePortToElectron.sendMessagePortToElectron',
    port1,
    'HandleMessagePortForSearchProcess.handleMessagePortForSearchProcess',
  )
  port2.start()
  console.log('after send port')

  console.log('before promise')
  const rpc = await rpcPromise
  console.log('after promise')
  return rpc
}
