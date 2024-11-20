import WebSocket from 'ws'
import { waitForWebSocketToBeOpen } from './waitForWebSocketToBeOpen.ts'

// const send = async (ws, method: string, params: any = {}) => {
//   const { promise, resolve } = Promise.withResolvers()
//   const id = Math.random()
//   ws.send(JSON.stringify({ id, method, params }))

//   const listener = (message: string) => {
//     console.log({ message: message.toString() })
//     const data = JSON.parse(message.toString())
//     if (data.id === id) {
//       ws.removeListener('message', listener)
//       resolve(data)
//     }
//   }
//   ws.on('message', listener)
//   const result = await promise

//   if (result && result.error && result.error.error) {
//     throw new Error(`[send] ${result.error.error.message}`)
//   }
//   return result
// }

export const getMemoryUsageWs = async (debuggingEndpoint: string) => {
  const response = await fetch(`${debuggingEndpoint}/json/list`)

  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const json = await response.json()
  const wsUrl = json[0].webSocketDebuggerUrl

  console.log({ wsUrl })

  const ws = new WebSocket(wsUrl)
  await waitForWebSocketToBeOpen(ws)

  console.log({ wsUrl })

  // await new Promise((r) => {
  //   setTimeout(r, 32132112)
  // })
  // await send(ws, 'Target.setAutoAttach', { autoAttach: true, waitForDebuggerOnStart: true, flatten: true })
  // const targets = await send(ws, 'Target.getTargets')

  // console.log({ targets })

  // const workers = targetInfos.filter((target: any) => target.type === 'worker')

  // if (!workers.length) {
  //   console.error('[memory] No workers found')
  //   process.exit(1)
  // }

  const results = []
  for (const worker of workers) {
    const { sessionId } = await send('Target.attachToTarget', { targetId: worker.targetId, flatten: true })
    const { metrics } = await send('Performance.getMetrics', { sessionId })
    results.push({
      jsHeapSize: metrics.find((m: any) => m.name === 'JSHeapUsedSize')?.value,
      totalHeapSize: metrics.find((m: any) => m.name === 'JSHeapTotalSize')?.value,
    })
  }

  ws.close()
  return results
}
