import { readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { patchRendererWorker } from './patchRendererWorker.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const root = join(__dirname, '..', '..', '..')

export const getRemoteUrl = (path) => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const nodeModulesPath = join(root, 'packages', 'server', 'node_modules')

const textSearchWorkerPath = join(root, '.tmp', 'dist', 'dist', 'textSearchWorkerMain.js')

const serverStaticPath = join(nodeModulesPath, '@lvce-editor', 'static-server', 'static')
const serverMainPath = join(nodeModulesPath, '@lvce-editor', 'server', 'src', 'server.js')
const e2eWorkerPath = join(root, 'packages', 'e2e', 'node_modules', '@lvce-editor', 'test-with-playwright-worker', 'dist', 'workerMain.js')

const RE_COMMIT_HASH = /^[a-z\d]+$/
const isCommitHash = (dirent) => {
  return dirent.length === 7 && dirent.match(RE_COMMIT_HASH)
}

const dirents = await readdir(serverStaticPath)
const commitHash = dirents.find(isCommitHash) || ''
const rendererWorkerMainPath = join(serverStaticPath, commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')
const rendererProcessMainPath = join(serverStaticPath, commitHash, 'packages', 'renderer-process', 'dist', 'rendererProcessMain.js')

const content = await readFile(rendererWorkerMainPath, 'utf-8')
const remoteUrl = getRemoteUrl(textSearchWorkerPath)
const newContent = patchRendererWorker(content, remoteUrl, true)

if (newContent !== content) {
  await writeFile(rendererWorkerMainPath, newContent)
}

const rendererProcessContent = await readFile(rendererProcessMainPath, 'utf-8')
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
  await writeFile(rendererProcessMainPath, rendererProcessWithDiagnostics)
}

const serverContent = await readFile(serverMainPath, 'utf-8')
const staticPrefixSnippet = `  if (url.startsWith('/995dbd2')) {
    return true
  }`
const staticPrefixReplacement = `  if (url.startsWith('/995dbd2')) {
    return true
  }
  if (url.startsWith('/text-search-worker')) {
    return true
  }`
const newServerContent = serverContent.includes("url.startsWith('/text-search-worker')")
  ? serverContent
  : serverContent.replace(staticPrefixSnippet, staticPrefixReplacement)

if (newServerContent !== serverContent) {
  await writeFile(serverMainPath, newServerContent)
}

const e2eWorkerContent = await readFile(e2eWorkerPath, 'utf-8')
const oldE2eDiagnosticsHelper = `const getPageDiagnostics = async page => {
  try {
    const html = await page.content();
    return \`\\nURL: \${page.url()}\\nHTML: \${html.slice(0, 1200)}\`;
  } catch (error) {
    return \`\\nDiagnostics unavailable: \${error}\`;
  }
};
`
const normalizedE2eWorkerContent = e2eWorkerContent.replace(oldE2eDiagnosticsHelper, '')
const e2eDiagnosticsSnippet = `PageErrors: \${JSON.stringify(diagnostics.pageErrors || [])}`
const e2eWorkerWithDiagnostics = normalizedE2eWorkerContent.includes(e2eDiagnosticsSnippet)
  ? normalizedE2eWorkerContent
  : normalizedE2eWorkerContent
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

if (e2eWorkerWithDiagnostics !== e2eWorkerContent) {
  await writeFile(e2eWorkerPath, e2eWorkerWithDiagnostics)
}
