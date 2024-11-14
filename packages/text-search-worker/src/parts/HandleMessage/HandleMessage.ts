import * as Callback from '../Callback/Callback.ts'
import * as Command from '../Command/Command.ts'
import * as HandleJsonRpcMessage from '../JsonRpc/JsonRpc.ts'

const requiresSocket = (): boolean => {
  return false
}

const preparePrettyError = (error: any): any => {
  return error
}

const logError = (): void => {
  // handled by renderer worker
}

export const handleMessage = (event: any): Promise<void> => {
  return HandleJsonRpcMessage.handleJsonRpcMessage(
    event.target,
    event.data,
    Command.execute,
    Callback.resolve,
    preparePrettyError,
    logError,
    requiresSocket,
  )
}
