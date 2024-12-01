import * as LaunchSearchProcessElectron from '../LaunchSearchProcessElectron/LaunchSearchProcessElectron.ts'

interface State {
  rpc: any
}

const state: State = {
  rpc: undefined,
}

export const getOrCreate = (): Promise<any> => {
  if (!state.rpc) {
    // @ts-ignore
    state.rpc = LaunchSearchProcessElectron.launchSearchProcessElectron()
  }
  return state.rpc
}
