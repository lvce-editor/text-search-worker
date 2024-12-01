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
    'SearchProcess.invoke'(method, ...params) {
      if (method === 'TextSearch.search') {
        return [
          {
            type: 1,
            text: 'a.txt',
          },
          {
            type: 2,
            text: 'a',
          },
        ]
      }
      console.log({ method })
      return []
    },
  }
  const rpc = await createWorker(workerPath, commandMap)
  const wrapped = createWrappedRpc(rpc)
  return wrapped
}
