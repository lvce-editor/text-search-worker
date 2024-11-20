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

  try {
    // Navigate to the test page using http instead of file protocol
    await page.goto(`http://localhost:${options.port}`)

    // Add error handler for worker errors
    await page.evaluate(() => {
      window.addEventListener('error', (event) => {
        if (event.message.includes('Worker')) {
          console.error('Worker failed to launch:', event.message)
          process.exit(1)
        }
      })
    })

    // Wait for worker to be created with timeout
    await page
      .waitForFunction(() => window.__workerReady === true, {
        timeout: 5000,
      })
      .catch((error) => {
        console.error('Worker failed to initialize:', error.message)
        process.exit(1)
      })

    // Get worker metrics
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
