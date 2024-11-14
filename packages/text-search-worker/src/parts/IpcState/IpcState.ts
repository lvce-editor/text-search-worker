const state = {
  ipc: undefined,
}

export const get = (): any => {
  return state.ipc
}

export const set = (ipc: any): void => {
  state.ipc = ipc
}
