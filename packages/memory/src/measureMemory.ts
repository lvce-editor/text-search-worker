import { chromium } from 'playwright'
import { startServer } from './server.ts'

const parseArgs = () => {
  const args = process.argv.slice(2)
  return {
    headless: !args.includes('--no-headless'),
    port: 3000,
  }
}

const main = async () => {
  const options = parseArgs()

  // Start the server
  await startServer(options.port)

  const browser = await chromium.launch({
    headless: options.headless,
  })
  const context = await browser.newContext()
  const page = await context.newPage()

  // Navigate to the test page using http instead of file protocol
  await page.goto(`http://localhost:${options.port}`)

  // Wait for worker to be created
  await page.waitForFunction(() => window.__workerReady === true)

  // Get worker metrics
  const client = await context.newCDPSession(page)
  const { workers } = await client.send('ServiceWorker.getAllWorkers')

  for (const worker of workers) {
    const metrics = await client.send('Performance.getMetrics')
    console.log('Worker Memory Usage:', {
      jsHeapSize: metrics.metrics.find((m) => m.name === 'JSHeapUsedSize')?.value,
      totalHeapSize: metrics.metrics.find((m) => m.name === 'JSHeapTotalSize')?.value,
    })
  }

  await browser.close()
  // Force exit as the server keeps the process alive
  process.exit(0)
}

main().catch(console.error)
