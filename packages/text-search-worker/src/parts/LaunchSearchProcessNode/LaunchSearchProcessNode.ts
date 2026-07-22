import { type Rpc, LazyWebSocketRpcParent2 } from '@lvce-editor/rpc'
import * as CommandMapRef from '../CommandMapRef/CommandMapRef.ts'

export const launchSearchProcessNode = async (): Promise<Rpc> => {
  return LazyWebSocketRpcParent2.create({
    commandMap: CommandMapRef.commandMapRef,
    // @ts-ignore
    type: 'search-process',
  })
}
