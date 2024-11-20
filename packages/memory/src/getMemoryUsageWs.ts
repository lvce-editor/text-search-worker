import { connect } from './ChromeDevToolsProtocol.ts'

export const getMemoryUsageWs = async (debuggingEndpoint: string) => {
  const protocol = await connect(debuggingEndpoint)

  try {
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
    return results
  } finally {
    protocol.close()
  }
}
