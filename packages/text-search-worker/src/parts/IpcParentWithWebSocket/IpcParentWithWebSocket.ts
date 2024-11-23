import * as Assert from '../Assert/Assert.ts'
import * as FirstWebSocketEventType from '../FirstWebSocketEventType/FirstWebSocketEventType.ts'
import * as GetWebSocketUrl from '../GetWebSocketUrl/GetWebSocketUrl.ts'
import { IpcError } from '../IpcError/IpcError.ts'
import * as Json from '../Json/Json.ts'
import * as ReconnectingWebSocket from '../ReconnectingWebSocket/ReconnectingWebSocket.ts'
import * as WaitForWebSocketToBeOpen from '../WaitForWebSocketToBeOpen/WaitForWebSocketToBeOpen.ts'
import * as Location from '../Location/Location.ts'

export const create = async ({ type }: { type: string }): Promise<any> => {
  Assert.string(type)
  const host = Location.getHost()
  const wsUrl = GetWebSocketUrl.getWebSocketUrl(type, host)
  const webSocket = ReconnectingWebSocket.create(wsUrl)
  const firstWebSocketEvent = await WaitForWebSocketToBeOpen.waitForWebSocketToBeOpen(webSocket)
  if (firstWebSocketEvent.type === FirstWebSocketEventType.Close) {
    throw new IpcError('Websocket connection was immediately closed')
  }
  return webSocket
}

const getMessage = (event: any): any => {
  return Json.parse(event.data)
}

export const wrap = (webSocket: any): any => {
  return {
    webSocket,
    /**
     * @type {any}
     */
    listener: undefined,
    get onmessage() {
      return this.listener
    },
    set onmessage(listener) {
      this.listener = listener
      const wrappedListener = (event: any): void => {
        const message = getMessage(event)
        const syntheticEvent = {
          data: message,
          target: this,
        }
        listener(syntheticEvent)
      }
      this.webSocket.onmessage = wrappedListener
    },
    send(message: any): void {
      const stringifiedMessage = Json.stringifyCompact(message)
      this.webSocket.send(stringifiedMessage)
    },
  }
}