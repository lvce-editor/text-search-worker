import { WebSocketRpcParent } from '@lvce-editor/rpc'
import * as GetWebSocketUrl from '../GetWebSocketUrl/GetWebSocketUrl.ts'
import * as Location from '../Location/Location.ts'

export const launchSearchProcess = async (): Promise<any> => {
  const host = Location.getHost()
  const wsUrl = GetWebSocketUrl.getWebSocketUrl('search-process', host)
  const webSocket = new WebSocket(wsUrl)
  const rpc = await WebSocketRpcParent.create({
    webSocket,
    commandMap: {},
  })
  return rpc
}
