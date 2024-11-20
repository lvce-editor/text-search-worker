import { WebSocket } from 'node:ws'

export const waitForWebSocketToBeOpen = async (ws: WebSocket): Promise<void> => {
  if (ws.readyState === WebSocket.OPEN) {
    return
  }
  const { promise, resolve } = Promise.withResolvers<void>()
  ws.addEventListener('open', resolve, { once: true })
  await promise
}
