import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.js'
import { cp, readFile, writeFile } from 'node:fs/promises'

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

const brokenSideBarSnippet = `  let actionsDom = [];
  let actionsUid = -1;
  if (commands) {
    const actionsDomIndex = commands.findIndex(command => command[2] === 'setActionsDom');
    if (actionsDomIndex) {
      actionsDom = commands[actionsDomIndex][3];
      commands.splice(actionsDomIndex, 1);
    }
    const eventsIndex = commands.findIndex(command => command[0] === 'Viewlet.registerEventListeners');
    const events = commands[eventsIndex][2];
    actionsUid = create$14();
    commands.push(['Viewlet.createFunctionalRoot', moduleId, actionsUid, true], ['Viewlet.registerEventListeners', actionsUid, events], ['Viewlet.setDom2', actionsUid, actionsDom], ['Viewlet.setUid', actionsUid, childUid]);`

const partiallyFixedSideBarSnippet = `  let actionsDom = [];
  let actionsUid = -1;
  if (commands) {
    const actionsDomIndex = commands.findIndex(command => command[2] === 'setActionsDom');
    if (actionsDomIndex !== -1) {
      actionsDom = commands[actionsDomIndex][3];
      commands.splice(actionsDomIndex, 1);
    }
    const eventsIndex = commands.findIndex(command => command[0] === 'Viewlet.registerEventListeners');
    const events = eventsIndex === -1 ? [] : commands[eventsIndex][2];
    actionsUid = create$14();
    commands.push(['Viewlet.createFunctionalRoot', moduleId, actionsUid, true], ['Viewlet.registerEventListeners', actionsUid, events], ['Viewlet.setDom2', actionsUid, actionsDom], ['Viewlet.setUid', actionsUid, childUid]);`

const safeSideBarSnippet = `  if (commands) {`

const missingSearchCommandModuleSnippet = `    case 'SearchProcess':
      return SearchProcess;`

const searchCommandModuleSnippet = `    case 'Search':
      return Search;
    case 'SearchProcess':
      return SearchProcess;`

const missingSearchLoaderSnippet = `    case SearchProcess:
      return Promise.resolve().then(function () { return SearchProcess_ipc; });`

const searchLoaderSnippet = `    case Search:
      return Promise.resolve().then(function () { return ViewletSearch_ipc; });
    case SearchProcess:
      return Promise.resolve().then(function () { return SearchProcess_ipc; });`

const missingSearchWrappedCommandsSnippet = `const settingsWorkerUrl = \`\${assetDir}/packages/settings-view/dist/settingsViewWorkerMain.js\`;`

const searchWrappedCommandsSnippet = `const searchWrappedCommands = Object.fromEntries(Object.entries(Commands$a).map(([command, fn]) => [\`Search.\${command}\`, wrapViewletCommand('Search', command, fn)]))
Object.assign(commandMapRef, searchWrappedCommands)

const settingsWorkerUrl = \`\${assetDir}/packages/settings-view/dist/settingsViewWorkerMain.js\`;`

const staleSearchStaticCommandMapPattern =
  /\n?const searchCommandAliases = \[[^\n]*\]\nObject\.assign\(commandMap, Object\.fromEntries\(searchCommandAliases\.map\(command => \[`Search\.\$\{command\}`, lazy\(`Search\.\$\{command\}`\)\]\)\)\)\n/g

let newContent = content

if (content.includes('// const textSearchWorkerUrl = ')) {
  const occurrence = `// const textSearchWorkerUrl = \`\${assetDir}/packages/text-search-worker/dist/textSearchWorkerMain.js\`
const textSearchWorkerUrl = \`${remoteUrl}\``
  const replacement = `const textSearchWorkerUrl = \`\${assetDir}/packages/text-search-worker/dist/textSearchWorkerMain.js\``
  newContent = newContent.replace(occurrence, replacement)
}

if (newContent.includes(brokenSideBarSnippet)) {
  newContent = newContent.replace(brokenSideBarSnippet, safeSideBarSnippet)
}

if (newContent.includes(partiallyFixedSideBarSnippet)) {
  newContent = newContent.replace(partiallyFixedSideBarSnippet, safeSideBarSnippet)
}

if (!newContent.includes("case 'Search':") && newContent.includes(missingSearchCommandModuleSnippet)) {
  newContent = newContent.replace(missingSearchCommandModuleSnippet, searchCommandModuleSnippet)
}

if (!newContent.includes('case Search:') && newContent.includes(missingSearchLoaderSnippet)) {
  newContent = newContent.replace(missingSearchLoaderSnippet, searchLoaderSnippet)
}

if (!newContent.includes('const searchWrappedCommands = ') && newContent.includes(missingSearchWrappedCommandsSnippet)) {
  newContent = newContent.replace(missingSearchWrappedCommandsSnippet, searchWrappedCommandsSnippet)
}

newContent = newContent.replace(staleSearchStaticCommandMapPattern, '\n')

if (newContent !== content) {
  await writeFile(rendererWorkerPath, newContent)
}

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
