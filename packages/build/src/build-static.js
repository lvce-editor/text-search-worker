import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.js'
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { patchRendererWorker } from './patchRendererWorker.js'

const sharedProcessPath = join(root, 'node_modules', '@lvce-editor', 'shared-process', 'index.js')

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
const serverMainPath = join(root, 'node_modules', '@lvce-editor', 'server', 'src', 'server.js')

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

await cp(join(root, 'dist'), staticPath, { recursive: true })
await mkdir(staticPrefixPath, { recursive: true })
await cp(join(staticPath, commitHash), join(staticPrefixPath, commitHash), { recursive: true })
await cp(join(staticPath, 'favicon.ico'), join(staticPrefixPath, 'favicon.ico'))
await patchServerStaticPrefix()
