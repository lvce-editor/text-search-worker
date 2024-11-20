import { chromium } from 'playwright'
import { getMemoryUsage } from './getMemoryUsage.ts'
import { parseArgs } from './parseArgs.ts'
import { startServer } from './server.ts'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '../../..')

const main = async () => {
  const options = parseArgs()
  const textSearchWorkerPath = join(root, '.tmp/dist/dist/textSearchWorkerMain.js')

  await startServer(options.port, textSearchWorkerPath)

  const browser = await chromium.launch({
    headless: options.headless,
  })
  const context = await browser.newContext()
  const page = await context.newPage()

  try {
    await page.goto(`http://localhost:${options.port}`)

    await new Promise((r) => {})
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
