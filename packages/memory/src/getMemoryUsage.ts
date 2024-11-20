import type { Page } from 'playwright'
import * as WorkerState from './workerState.ts'

export const getMemoryUsage = async (page: Page) => {
  const workerState = await Promise.race([
    // @ts-ignore
    page.waitForFunction(() => window.__workerDidLaunch === 1, { timeout: 5000 }).then(() => WorkerState.Launched),
    // @ts-ignore
    page.waitForFunction(() => window.__workerDidLaunch === 2, { timeout: 5000 }).then(() => WorkerState.Error),
  ])

  if (workerState === WorkerState.Error) {
    console.error('[memory] Worker failed to initialize')
    process.exit(1)
  }

  const client = await page.context().newCDPSession(page)
  const { targetInfos } = await client.send('Target.getTargets')

  const workers = targetInfos.filter((target) => target.type === 'worker')

  if (!workers.length) {
    console.error('[memory] No workers found')
    process.exit(1)
  }

  const results = []
  for (const worker of workers) {
    // @ts-ignore
    const workerSession = await client.connection().createSession(worker.targetId)
    const metrics = await workerSession.send('Performance.getMetrics')
    await workerSession.detach()
    results.push({
      // @ts-ignore
      jsHeapSize: metrics.metrics.find((m) => m.name === 'JSHeapUsedSize')?.value,
      // @ts-ignore
      totalHeapSize: metrics.metrics.find((m) => m.name === 'JSHeapTotalSize')?.value,
    })
  }
  return results
}
