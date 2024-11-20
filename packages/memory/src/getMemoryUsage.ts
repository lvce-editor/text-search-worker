import type { Page } from 'playwright'

export const getMemoryUsage = async (page: Page) => {
  const client = await page.context().newCDPSession(page)

  const { resolve, promise } = Promise.withResolvers()

  client.once('Target.attachedToTarget', resolve)

  const t1 = await client.send('Target.setAutoAttach', {
    autoAttach: true,
    waitForDebuggerOnStart: true,
  })

  const worker = await promise

  // page.context().routeWebSocket
  console.log({ client })
  console.log({ worker })

  console.log({ t1 })
  // client.on('Target.attachedToTarget', () => {
  //   console.log('attached')
  // })
  // await client.send('Target.attachToTarget', {

  // })
  // await client.send('Runtime.enable')
  // const h = await client.send('Runtime.getHeapUsage', {})

  // console.log({ h })

  const workers = page.workers()

  if (!workers.length) {
    console.error('[memory] No workers found')
    process.exit(1)
  }

  const results = []
  for (const worker of workers) {
    // const cdp = page.context().newCDPSession(worker)
    console.log('worker', worker.url())
    // console.log(worker)
    // worker.
    // const metrics = await worker.evaluate((pageFunction, arg) => {
    // // @ts-ignore
    // const workerSession = await client.connection().createSession(worker.targetId)
    // const metrics = await workerSession.send('Performance.getMetrics')
    // await workerSession.detach()
    // results.push({
    //   // @ts-ignore
    //   jsHeapSize: metrics.metrics.find((m) => m.name === 'JSHeapUsedSize')?.value,
    //   // @ts-ignore
    //   totalHeapSize: metrics.metrics.find((m) => m.name === 'JSHeapTotalSize')?.value,
    // })
  }
  return results
}
