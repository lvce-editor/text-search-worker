import * as LaunchSearchProcess from '../LaunchSearchProcess/LaunchSearchProcess.ts'

interface State {
  rpc: any
}

const state: State = {
  rpc: undefined,
}

const getOrCreate = (): Promise<any> => {
  if (!state.rpc) {
    // @ts-ignore
    state.rpc = LaunchSearchProcess.launchSearchProcess()
  }
  return state.rpc
}

export const invoke = async (method: string, ...params: any[]): Promise<any> => {
  const rpc = await getOrCreate()
  return rpc.invoke(method, ...params)
}
