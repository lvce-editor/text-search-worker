import { createWorker } from './createWorker.js'

const workerPath = new URL('../../../.tmp/dist/dist/textSearchWorkerMain.js', import.meta.url).toString()

const getResult = (method, ...params) => {
  return null
}

const handleMessage = (event) => {
  const { data, target } = event
  if (data.id) {
    const result = getResult(data.method, ...data.params)
    target.postMessage({
      jsonrpc: '2.0',
      id: data.id,
      result,
    })
  }
}

const createWrappedRpc = (rpc) => {
  return rpc
}

export const setup = async () => {
  const commandMap = {
    'SendMessagePortToRendererProcess.sendMessagePortToRendererProcess'(port) {
      port.addEventListener('message', handleMessage)
      port.postMessage('ready')
    },
    'SendMessagePortToSyntaxHighlightingWorker.sendMessagePortToSyntaxHighlightingWorker'(port) {
      port.addEventListener('message', handleMessage)
      port.postMessage('ready')
    },
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker'(port) {
      port.addEventListener('message', handleMessage)
      port.postMessage('ready')
    },
    'Editor.setSelections'() {},
    'ExtensionHostManagement.activateByEvent'() {},
    'GetEditorSourceActions.getEditorSourceActions'() {
      return [
        {
          name: 'a',
        },
      ]
    },
    'Focus.setAdditionalFocus'() {},
    'Focus.setFocus'() {},
    'Viewlet.openWidget'() {},
    'Languages.getLanguageConfiguration'() {
      return {
        comments: {
          lineComment: '//',
          blockComment: ['/*', '*/'],
        },
      }
    },
  }
  const rpc = await createWorker(workerPath, commandMap)
  const syntaxHighlightingEnabled = true
  const syncIncremental = true
  await rpc.invoke('Initialize.initialize', syntaxHighlightingEnabled, syncIncremental)
  const wrapped = createWrappedRpc(rpc)
  return wrapped
}
