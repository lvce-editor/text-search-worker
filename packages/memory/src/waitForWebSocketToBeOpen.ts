import type WebSocket from 'ws'

export const waitForWebSocketToBeOpen = async (ws: WebSocket): Promise<void> => {
  const { promise, resolve } = Promise.withResolvers<void>()
  ws.once('open', resolve)
  await promise
}
