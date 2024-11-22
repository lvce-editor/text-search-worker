export const launchBrowser = async (headless: boolean, remoteDebuggingPort: string) => {
  // @ts-ignore
  const { chromium } = await import('playwright')
  const browser = await chromium.launch({
    headless: headless,
    args: [`--remote-debugging-port=${remoteDebuggingPort}`],
  })

  const context = await browser.newContext()
  const page = await context.newPage()

  return {
    page,
    browser,
  }
}
