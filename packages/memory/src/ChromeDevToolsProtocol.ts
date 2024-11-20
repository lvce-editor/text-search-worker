import { WebSocket } from 'node:ws'
import { waitForWebSocketToBeOpen } from './waitForWebSocketToBeOpen.ts'
import { Protocol } from './Protocol.ts'

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
  const pendingMessages = Object.create(null) as Record<number, (data: any) => void>
  const eventTarget = new EventTarget()

  ws.addEventListener('message', (event) => {
    console.log({ message: event.data.toString() })
    const data = JSON.parse(event.data.toString())

    if (data.method) {
      const event = new CustomEvent(data.method, { detail: data.params })
      eventTarget.dispatchEvent(event)
      return
    }

    const resolve = pendingMessages[data.id]
    if (resolve) {
      delete pendingMessages[data.id]
      resolve(data)
    }
  })

  const send = async (method: string, params: any = {}, sessionId = undefined) => {
    const id = messageId++
    const { promise, resolve } = Promise.withResolvers()

    pendingMessages[id] = resolve
    ws.send(JSON.stringify({ id, method, params, sessionId }))

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
      for (const id in pendingMessages) {
        delete pendingMessages[id]
      }
      ws.close()
    },
    addEventListener: (event, listener) => eventTarget.addEventListener(event, listener),
    removeEventListener: (event, listener) => eventTarget.removeEventListener(event, listener),
  }
}
