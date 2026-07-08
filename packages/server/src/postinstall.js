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

const content = await readFile(rendererWorkerMainPath, 'utf-8')
const remoteUrl = getRemoteUrl(textSearchWorkerPath)
const newContent = patchRendererWorker(content, remoteUrl, true)

if (newContent !== content) {
  await writeFile(rendererWorkerMainPath, newContent)
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
const e2eDiagnosticsSnippet = `const message = error instanceof Error ? error.message : \`\${error}\`;
    const diagnostics = await getPageDiagnostics(page);`
const e2eWorkerWithDiagnostics = e2eWorkerContent.includes(e2eDiagnosticsSnippet)
  ? e2eWorkerContent
  : e2eWorkerContent
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

if (e2eWorkerWithDiagnostics !== e2eWorkerContent) {
  await writeFile(e2eWorkerPath, e2eWorkerWithDiagnostics)
}
