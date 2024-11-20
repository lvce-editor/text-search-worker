import { chromium } from 'playwright'
import { getMemoryUsageWs } from './getMemoryUsageWs.ts'
import { parseArgs } from './parseArgs.ts'
import { startServer } from './server.ts'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { waitForWorkerReady } from './waitForWorkerReady.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '../../..')

const main = async () => {
  const options = parseArgs()
  const textSearchWorkerPath = join(root, '.tmp/dist/dist/textSearchWorkerMain.js')

  await startServer(options.port, textSearchWorkerPath)

  const browser = await chromium.launchServer({
    headless: options.headless,
  })

  const s = browser.wsEndpoint()

  console.log(s)
  const c = await chromium.connect(browser.wsEndpoint())
  const context = await c.newContext()
  const page = await context.newPage()

  try {
    await page.goto(`http://localhost:${options.port}`)
    await waitForWorkerReady(page)

    const memoryUsages = await getMemoryUsageWs(browser.wsEndpoint())
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
