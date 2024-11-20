import { connect } from './ChromeDevToolsProtocol.ts'

export const getMemoryUsageWs = async (debuggingEndpoint: string) => {
  const protocol = await connect(debuggingEndpoint)

  try {
    const version = await protocol.send('Browser.getVersion')

    const { resolve, promise } = Promise.withResolvers()
    protocol.addEventListener('Target.attachedToTarget', resolve)
    await protocol.send('Target.setAutoAttach', {
      autoAttach: true,
      waitForDebuggerOnStart: true,
      flatten: true,
    })

    const targetEvent = await promise
    const target = targetEvent.detail

    const sessionId = target.sessionId

    await protocol.send('Runtime.enable', {}, sessionId)

    const mem = await protocol.send('Runtime.getHeapUsage', {}, sessionId)
    console.log({ mem })

    const results = []
    // for (const worker of workers) {
    //   const { metrics } = await protocol.send('Performance.getMetrics', { sessionId })
    //   results.push({
    //     jsHeapSize: metrics.find((m: any) => m.name === 'JSHeapUsedSize')?.value,
    //     totalHeapSize: metrics.find((m: any) => m.name === 'JSHeapTotalSize')?.value,
    //   })
    // }

    return results
  } finally {
    protocol.close()
  }
}
