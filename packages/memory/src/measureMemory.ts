import { chromium } from 'playwright'
import { startServer } from './server.ts'
import { getMemoryUsage } from './getMemoryUsage.ts'

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

main().catch((error) => {
  console.error('[memory] Fatal error:', error)
  process.exit(1)
})
