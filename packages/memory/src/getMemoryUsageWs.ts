import CDP from 'chrome-remote-interface'

export const getMemoryUsageWs = async (debuggingPort: string) => {
  const client = await CDP({
    host: 'localhost',
    port: Number(debuggingPort),
  })

  try {
    const { promise, resolve } = Promise.withResolvers()
    client.Target.attachedToTarget(resolve)

    await client.Target.setAutoAttach({
      autoAttach: true,
      waitForDebuggerOnStart: true,
      flatten: true,
    })

    const { sessionId } = await promise

    await client.Runtime.enable(sessionId)
    const mem = await client.Runtime.getHeapUsage(sessionId)
    console.log({ mem })

    return []
  } finally {
    await client.close()
  }
}
