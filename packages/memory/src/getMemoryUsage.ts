import type { Page } from 'playwright'

export const getMemoryUsage = async (page: Page) => {
  await new Promise((r) => setTimeout(r, 1000))
  const client = await page.context().newCDPSession(page)

  const workers = page.workers()

  if (!workers.length) {
    console.error('[memory] No workers found')
    process.exit(1)
  }

  const results = []
  for (const worker of workers) {
    console.log('worker', worker.url())
    console.log(worker)
    worker.
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
