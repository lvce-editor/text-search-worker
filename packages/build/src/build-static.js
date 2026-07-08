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
  const diagnosticsSnippet = `const message = error instanceof Error ? error.message : \`\${error}\`;
    const diagnostics = await getPageDiagnostics(page);`
  const newContent = content.includes(diagnosticsSnippet)
    ? content
    : content
        .replace(
          `const runTest = async ({
  page,`,
          `const getPageDiagnostics = async page => {
  try {
    const html = await page.content();
    return \`\\nURL: \${page.url()}\\nHTML: \${html.slice(0, 1200)}\`;
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
