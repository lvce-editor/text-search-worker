import type { Rpc } from '@lvce-editor/rpc'
import * as LaunchSearchProcess from '../LaunchSearchProcess/LaunchSearchProcess.ts'

interface State {
  rpc: Promise<Rpc> | undefined
}

const state: State = {
  rpc: undefined,
}

export const getOrCreate = (): Promise<Rpc> => {
  if (!state.rpc) {
    // @ts-ignore
    state.rpc = LaunchSearchProcess.launchSearchProcess()
  }
  return state.rpc
}
