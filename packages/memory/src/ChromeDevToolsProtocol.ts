import WebSocket from 'ws'
import { waitForWebSocketToBeOpen } from './waitForWebSocketToBeOpen.ts'

export type Protocol = {
  send: (method: string, params?: any) => Promise<any>
  close: () => void
  addEventListener: (event: string, listener: (event: CustomEvent) => void) => void
  removeEventListener: (event: string, listener: (event: CustomEvent) => void) => void
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

  let messageId = 1
  const pendingMessages = new Map<number, (data: any) => void>()
  const eventTarget = new EventTarget()

  ws.on('message', (message: string) => {
    console.log({ message: message.toString() })
    const data = JSON.parse(message.toString())

    if (data.method) {
      // This is an event from Chrome
      const event = new CustomEvent(data.method, { detail: data.params })
      eventTarget.dispatchEvent(event)
      return
    }

    const resolve = pendingMessages.get(data.id)
    if (resolve) {
      pendingMessages.delete(data.id)
      resolve(data)
    }
  })

  const send = async (method: string, params: any = {}) => {
    const id = messageId++
    const { promise, resolve } = Promise.withResolvers()

    pendingMessages.set(id, resolve)
    ws.send(JSON.stringify({ id, method, params }))

    const result = await promise

    if (result && result.error && result.error.error) {
      throw new Error(`[send] ${result.error.error.message}`)
    }
    if (result && result.result) {
      return result.result
    }
    return result
  }

  return {
    send,
    close: () => {
      pendingMessages.clear()
      ws.close()
    },
    addEventListener: (event, listener) => eventTarget.addEventListener(event, listener),
    removeEventListener: (event, listener) => eventTarget.removeEventListener(event, listener),
  }
}
