const state = {
  rpc: undefined,
}

export const setRpc = (rpc: any) => {
  state.rpc = rpc
}

export const invoke = (method: string, ...params: any[]): Promise<any> => {
  const rpc = state.rpc
  // @ts-ignore
  return rpc.invoke(method, ...params)
}
