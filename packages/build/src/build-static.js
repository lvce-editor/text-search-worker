import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.js'
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { patchRendererWorker } from './patchRendererWorker.js'

const sharedProcessPath = join(root, 'packages', 'server', 'node_modules', '@lvce-editor', 'shared-process', 'index.js')

const sharedProcessUrl = pathToFileURL(sharedProcessPath).toString()

const sharedProcess = await import(sharedProcessUrl)

process.env.PATH_PREFIX = '/text-search-worker'
const { commitHash } = await sharedProcess.exportStatic({
  root,
  extensionPath: '',
  testPath: 'packages/e2e',
})

const rendererWorkerPath = join(root, 'dist', commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')
const rendererProcessPath = join(root, 'dist', commitHash, 'packages', 'renderer-process', 'dist', 'rendererProcessMain.js')

export const getRemoteUrl = (path) => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const content = await readFile(rendererWorkerPath, 'utf8')
const workerPath = join(root, '.tmp/dist/dist/textSearchWorkerMain.js')
const remoteUrl = getRemoteUrl(workerPath)
const newContent = patchRendererWorker(content, remoteUrl, false)

if (newContent !== content) {
  await writeFile(rendererWorkerPath, newContent)
}

const rendererProcessContent = await readFile(rendererProcessPath, 'utf-8')
const rendererWorkerLaunchDiagnosticsSnippet = `return \`Failed to start \${displayName}: \${error}\`;`
const rendererProcessWithDiagnostics = rendererProcessContent.includes(rendererWorkerLaunchDiagnosticsSnippet)
  ? rendererProcessContent
  : rendererProcessContent
      .replace(
        `const tryToGetActualErrorMessage = async ({
  name
}) => {
  const displayName = getWorkerDisplayName(name);
  return \`Failed to start \${displayName}: Worker Launch Error\`;
};`,
        `const tryToGetActualErrorMessage = async ({
  name,
  url
}) => {
  const displayName = getWorkerDisplayName(name);
  try {
    await import(url);
    return \`Failed to start \${displayName}: Worker Launch Error\`;
  } catch (error) {
    return \`Failed to start \${displayName}: \${error}\`;
  }
};`,
      )
      .replace(
        `const actualErrorMessage = await tryToGetActualErrorMessage({
        name
      });`,
        `const actualErrorMessage = await tryToGetActualErrorMessage({
        name,
        url
      });`,
      )

if (rendererProcessWithDiagnostics !== rendererProcessContent) {
  await writeFile(rendererProcessPath, rendererProcessWithDiagnostics)
}

const staticPath = join(root, '.tmp', 'static')
const staticPrefixPath = join(staticPath, 'text-search-worker')
const serverMainPath = join(root, 'packages', 'server', 'node_modules', '@lvce-editor', 'server', 'src', 'server.js')
const e2eWorkerPath = join(root, 'packages', 'e2e', 'node_modules', '@lvce-editor', 'test-with-playwright-worker', 'dist', 'workerMain.js')

const patchServerStaticPrefix = async () => {
  const content = await readFile(serverMainPath, 'utf-8')
  const occurrence = `  if (url.startsWith('/995dbd2')) {
    return true
  }`
  const replacement = `  if (url.startsWith('/995dbd2')) {
    return true
  }
  if (url.startsWith('/text-search-worker')) {
    return true
  }`
  const newContent = content.includes("url.startsWith('/text-search-worker')") ? content : content.replace(occurrence, replacement)

  if (newContent !== content) {
    await writeFile(serverMainPath, newContent)
  }
}

const patchE2eDiagnostics = async () => {
  const content = await readFile(e2eWorkerPath, 'utf-8')
  const oldDiagnosticsHelper = `const getPageDiagnostics = async page => {
  try {
    const html = await page.content();
    return \`\\nURL: \${page.url()}\\nHTML: \${html.slice(0, 1200)}\`;
  } catch (error) {
    return \`\\nDiagnostics unavailable: \${error}\`;
  }
};
`
  const normalizedContent = content.replace(oldDiagnosticsHelper, '')
  const diagnosticsSnippet = `PageErrors: \${JSON.stringify(diagnostics.pageErrors || [])}`
  const newContent = normalizedContent.includes(diagnosticsSnippet)
    ? normalizedContent
    : normalizedContent
        .replace(
          `const runTest = async ({
  page,`,
          `const getPageDiagnostics = async page => {
  try {
    const html = await page.content();
    const resourceEntries = await page.evaluate(() => performance.getEntriesByType('resource').map(entry => ({
      name: entry.name,
      duration: entry.duration,
      transferSize: entry.transferSize,
      responseStatus: entry.responseStatus
    })).slice(-20));
    const diagnostics = page.__lvceDiagnostics || {};
    return \`\\nURL: \${page.url()}\\nConsole: \${JSON.stringify(diagnostics.console || [])}\\nPageErrors: \${JSON.stringify(diagnostics.pageErrors || [])}\\nRequestFailures: \${JSON.stringify(diagnostics.requestFailures || [])}\\nBadResponses: \${JSON.stringify(diagnostics.badResponses || [])}\\nResources: \${JSON.stringify(resourceEntries)}\\nHTML: \${html.slice(0, 1200)}\`;
  } catch (error) {
    return \`\\nDiagnostics unavailable: \${error}\`;
  }
};
const runTest = async ({
  page,`,
        )
        .replace(
          `    const message = error instanceof Error ? error.message : \`\${error}\`;
    return {
      end,
      error: message,`,
          `    const message = error instanceof Error ? error.message : \`\${error}\`;
    const diagnostics = await getPageDiagnostics(page);
    return {
      end,
      error: message + diagnostics,`,
        )
        .replace(
          `      case Fail:
        failed++;
        break;`,
          `      case Fail:
        failed++;
        await onFinalResult({
          end: performance.now(),
          failed,
          passed,
          skipped,
          start
        });
        return;`,
        )
        .replace(
          `  const page = await browser.newPage();
  // eslint-disable-next-line @typescript-eslint/no-misused-promises`,
          `  const page = await browser.newPage();
  page.__lvceDiagnostics = {
    badResponses: [],
    console: [],
    pageErrors: [],
    requestFailures: []
  };
  page.on('console', message => page.__lvceDiagnostics.console.push({
    type: message.type(),
    text: message.text()
  }));
  page.on('pageerror', error => page.__lvceDiagnostics.pageErrors.push(\`\${error}\`));
  page.on('requestfailed', request => page.__lvceDiagnostics.requestFailures.push({
    errorText: request.failure()?.errorText,
    url: request.url()
  }));
  page.on('response', response => {
    if (response.status() >= 400) {
      page.__lvceDiagnostics.badResponses.push({
        status: response.status(),
        url: response.url()
      });
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-misused-promises`,
        )

  if (newContent !== content) {
    await writeFile(e2eWorkerPath, newContent)
  }
}

await cp(join(root, 'dist'), staticPath, { recursive: true })
await mkdir(staticPrefixPath, { recursive: true })
await cp(join(staticPath, commitHash), join(staticPrefixPath, commitHash), { recursive: true })
await cp(join(staticPath, 'favicon.ico'), join(staticPrefixPath, 'favicon.ico'))
await patchServerStaticPrefix()
await patchE2eDiagnostics()
