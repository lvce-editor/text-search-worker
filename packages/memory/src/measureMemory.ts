import { chromium } from 'playwright'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const parseArgs = () => {
  const args = process.argv.slice(2)
  return {
    headless: !args.includes('--no-headless'),
  }
}

const main = async () => {
  const options = parseArgs()
  const browser = await chromium.launch({
    headless: options.headless,
  })
  const context = await browser.newContext()
  const page = await context.newPage()

  // Navigate to the test page
  const htmlPath = join(__dirname, 'index.html')
  await page.goto(`file://${htmlPath}`)

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
}

main().catch(console.error)
