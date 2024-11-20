import { connect } from './ChromeDevToolsProtocol.ts'

export const getMemoryUsageWs = async (debuggingEndpoint: string) => {
  const protocol = await connect(debuggingEndpoint)

  try {
    const version = await protocol.send('Browser.getVersion')

    await protocol.send('Target.setAutoAttach', {
      autoAttach: true,
      waitForDebuggerOnStart: true,
      flatten: true,
    })

    console.log({ version })

    const results = []
    for (const worker of workers) {
      const { sessionId } = await protocol.send('Target.attachToTarget', {
        targetId: worker.targetId,
        flatten: true,
      })

      const { metrics } = await protocol.send('Performance.getMetrics', { sessionId })
      results.push({
        jsHeapSize: metrics.find((m: any) => m.name === 'JSHeapUsedSize')?.value,
        totalHeapSize: metrics.find((m: any) => m.name === 'JSHeapTotalSize')?.value,
      })
    }

    return results
  } finally {
    protocol.close()
  }
}
