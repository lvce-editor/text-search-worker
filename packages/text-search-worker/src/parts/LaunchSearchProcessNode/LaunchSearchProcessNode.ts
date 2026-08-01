import { type Rpc, LazyWebSocketRpcParent2, WebSocketRpcParent } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMapRef from '../CommandMapRef/CommandMapRef.ts'

export const launchSearchProcessNode = async (): Promise<Rpc> => {
  try {
    const { protocols, url } = (await RendererWorker.invoke('WebSocketCapability.create', 'search-process')) as {
      readonly protocols: string[]
      readonly url: string
    }
    return WebSocketRpcParent.create({
      commandMap: CommandMapRef.commandMapRef,
      webSocket: new WebSocket(url, protocols),
    })
  } catch (error) {
    if (!(
      error instanceof Error &&
      (error.message.includes('WebSocketCapability.create') || error.message.includes('module WebSocketCapability not found')) &&
      /command not found|not found/i.test(error.message)
    )) {
      throw error
    }
  }
  return LazyWebSocketRpcParent2.create({
    commandMap: CommandMapRef.commandMapRef,
    // @ts-ignore
    type: 'search-process',
  })
}
