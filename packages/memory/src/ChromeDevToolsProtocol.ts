import WebSocket from 'ws'
import { waitForWebSocketToBeOpen } from './waitForWebSocketToBeOpen.ts'

let _id = 1

const send = async (ws: WebSocket, method: string, params: any = {}) => {
  const { promise, resolve } = Promise.withResolvers()
  const id = ++_id
  ws.send(JSON.stringify({ id, method, params }))

  const listener = (message: string) => {
    console.log({ message: message.toString() })
    const data = JSON.parse(message.toString())
    if (data.id === id) {
      ws.removeListener('message', listener)
      resolve(data)
    }
  }
  ws.on('message', listener)
  const result = await promise

  if (result && result.error && result.error.error) {
    throw new Error(`[send] ${result.error.error.message}`)
  }
  if (result && result.result) {
    return result.result
  }
  return result
}

export type Protocol = {
  ws: WebSocket
  send: (method: string, params?: any) => Promise<any>
  close: () => void
}

export const connect = async (debuggingEndpoint: string): Promise<Protocol> => {
  const response = await fetch(`${debuggingEndpoint}/json/list`)

  if (!response.ok) {
    throw new Error(`Failed to connect to debugging endpoint: ${response.statusText}`)
  }

  const json = await response.json()
  const wsUrl = json[0].webSocketDebuggerUrl

  const ws = new WebSocket(wsUrl)
  await waitForWebSocketToBeOpen(ws)

  return {
    ws,
    send: (method: string, params: any = {}) => send(ws, method, params),
    close: () => ws.close(),
  }
}
