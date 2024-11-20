import { chromium } from 'playwright'
import { getMemoryUsage } from './getMemoryUsage.ts'
import { parseArgs } from './parseArgs.ts'
import { startServer } from './server.ts'

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

    const memoryUsages = await getMemoryUsage(page)
    for (const usage of memoryUsages) {
      console.log('[memory] Worker Memory Usage:', usage)
    }
  } catch (error) {
    console.error('[memory] Measurement failed:', error)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

main()
