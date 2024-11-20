import { chromium } from 'playwright'
import { startServer } from './server.ts'
import * as WorkerState from './workerState.ts'

const parseArgs = () => {
  const args = process.argv.slice(2)
  return {
    headless: !args.includes('--no-headless'),
    port: 3000,
  }
}

const main = async () => {
  const options = parseArgs()

  await startServer(options.port)

  const browser = await chromium.launch({
    headless: options.headless,
  })
  const context = await browser.newContext()
  const page = await context.newPage()

  try {
    await page.goto(`http://localhost:${options.port}`)

    const workerState = await Promise.race([
      page.waitForFunction(() => window.__workerDidLaunch === 1, { timeout: 5000 }).then(() => WorkerState.Launched),
      page.waitForFunction(() => window.__workerDidLaunch === 2, { timeout: 5000 }).then(() => WorkerState.Error),
    ])

    if (workerState === WorkerState.Error) {
      console.error('Worker failed to initialize')
      process.exit(1)
    }

    const client = await context.newCDPSession(page)
    const { workers } = await client.send('ServiceWorker.getAllWorkers')

    if (!workers.length) {
      console.error('No workers found')
      process.exit(1)
    }

    for (const worker of workers) {
      const metrics = await client.send('Performance.getMetrics')
      console.log('Worker Memory Usage:', {
        jsHeapSize: metrics.metrics.find((m) => m.name === 'JSHeapUsedSize')?.value,
        totalHeapSize: metrics.metrics.find((m) => m.name === 'JSHeapTotalSize')?.value,
      })
    }
  } catch (error) {
    console.error('Measurement failed:', error)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
