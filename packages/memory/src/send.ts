import WebSocket from 'ws'

let _id = 1

export const send = async (ws: WebSocket, method: string, params: any = {}) => {
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
