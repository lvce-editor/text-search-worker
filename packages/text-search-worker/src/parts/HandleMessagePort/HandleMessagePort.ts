import { PlainMessagePortRpc } from '@lvce-editor/rpc'
import { TextSearchViewWorker } from '@lvce-editor/rpc-registry'
import * as CommandMapRef from '../CommandMapRef/CommandMapRef.ts'

export const handleMessagePort = async (port: MessagePort): Promise<void> => {
  const rpc = await PlainMessagePortRpc.create({
    commandMap: CommandMapRef.commandMapRef,
    messagePort: port,
  })
  TextSearchViewWorker.set(rpc)
}
