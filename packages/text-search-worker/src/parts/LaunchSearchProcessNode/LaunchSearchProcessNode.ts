import type { Rpc } from '@lvce-editor/rpc'
import { WebSocketRpcParent2 } from '@lvce-editor/rpc'

export const launchSearchProcessNode = async (): Promise<Rpc> => {
  const rpc = await WebSocketRpcParent2.create({
    commandMap: {},
    // @ts-ignore
    type: 'search-process',
  })
  return rpc
}
