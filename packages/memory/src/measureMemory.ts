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

  const server = await startServer(options.port, textSearchWorkerPath)

  const remoteDebuggingPort = '9222'
  const browser = await chromium.launch({
    headless: options.headless,
    args: [`--remote-debugging-port=${remoteDebuggingPort}`],
  })

  const context = await browser.newContext()
  const page = await context.newPage()

  try {
    await page.goto(`http://localhost:${options.port}`)
    await waitForWorkerReady(page)

    const memoryUsages = await getMemoryUsageWs(remoteDebuggingPort)
    for (const usage of memoryUsages) {
      console.log('[memory] Worker Memory Usage:', usage)
    }
  } catch (error) {
    console.error('[memory] Measurement failed:', error)
    process.exit(1)
  } finally {
    server.close()
    await browser.close()
  }
}

main()
