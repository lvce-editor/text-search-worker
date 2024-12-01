import * as JsonRpc from '../JsonRpc/JsonRpc.ts'
import * as LaunchSearchProcess from '../LaunchSearchProcess/LaunchSearchProcess.ts'

interface State {
  ipc: any
}

const state: State = {
  ipc: undefined,
}

export const getOrCreate = (): Promise<any> => {
  if (!state.ipc) {
    // @ts-ignore
    state.ipc = LaunchSearchProcess.launchSearchProcess()
  }
  return state.ipc
}

export const invoke = async (method: string, ...params: any[]): Promise<any> => {
  const ipc = await getOrCreate()
  return JsonRpc.invoke(ipc, method, ...params)
}
