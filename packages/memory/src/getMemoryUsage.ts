import type { Page } from 'playwright'
import * as WorkerState from './workerState.ts'

export const getMemoryUsage = async (page: Page) => {
  const workerState = await Promise.race([
    page.waitForFunction(() => window.__workerDidLaunch === 1, { timeout: 5000 }).then(() => WorkerState.Launched),
    page.waitForFunction(() => window.__workerDidLaunch === 2, { timeout: 5000 }).then(() => WorkerState.Error),
  ])

  if (workerState === WorkerState.Error) {
    console.error('[memory] Worker failed to initialize')
    process.exit(1)
  }

  const client = await page.context().newCDPSession(page)
  const { workers } = await client.send('ServiceWorker.getAllWorkers')

  if (!workers.length) {
    console.error('[memory] No workers found')
    process.exit(1)
  }

  const results = []
  for (const worker of workers) {
    const metrics = await client.send('Performance.getMetrics')
    results.push({
      jsHeapSize: metrics.metrics.find((m) => m.name === 'JSHeapUsedSize')?.value,
      totalHeapSize: metrics.metrics.find((m) => m.name === 'JSHeapTotalSize')?.value,
    })
  }
  return results
}
