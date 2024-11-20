import WebSocket from 'ws'
import { waitForWebSocketToBeOpen } from './waitForWebSocketToBeOpen.ts'

export const getMemoryUsageWs = async (wsEndpoint: string) => {
  const ws = new WebSocket(wsEndpoint)
  await waitForWebSocketToBeOpen(ws)

  const send = (method: string, params: any = {}) => {
    const { promise, resolve } = Promise.withResolvers()
    const id = Math.random()
    ws.send(JSON.stringify({ id, method, params }))

    const listener = (message: string) => {
      const data = JSON.parse(message.toString())
      if (data.id === id) {
        ws.removeListener('message', listener)
        resolve(data.result)
      }
    }
    ws.on('message', listener)
    return promise
  }

  await send('Target.setAutoAttach', { autoAttach: true, waitForDebuggerOnStart: true, flatten: true })
  const { targetInfos } = await send('Target.getTargets')

  const workers = targetInfos.filter((target: any) => target.type === 'worker')

  if (!workers.length) {
    console.error('[memory] No workers found')
    process.exit(1)
  }

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
