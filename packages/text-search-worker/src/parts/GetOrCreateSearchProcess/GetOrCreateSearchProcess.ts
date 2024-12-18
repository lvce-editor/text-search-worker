import * as LaunchSearchProcess from '../LaunchSearchProcess/LaunchSearchProcess.ts'

interface State {
  rpc: any
}

const state: State = {
  rpc: undefined,
}

export const getOrCreate = (): Promise<any> => {
  if (!state.rpc) {
    // @ts-ignore
    state.rpc = LaunchSearchProcess.launchSearchProcess()
  }
  return state.rpc
}
