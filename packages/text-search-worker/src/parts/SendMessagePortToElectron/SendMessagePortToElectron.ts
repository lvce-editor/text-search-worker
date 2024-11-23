import * as Assert from '../Assert/Assert.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const sendMessagePortToElectron = async (port: MessagePort, initialCommand: string, ipcId: any): Promise<void> => {
  Assert.object(port)
  Assert.string(initialCommand)
  await ParentRpc.invokeAndTransfer(initialCommand, port, ipcId)
}
