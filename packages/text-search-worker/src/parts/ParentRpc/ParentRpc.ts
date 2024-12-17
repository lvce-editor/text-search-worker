import type { RendererWorkerApi } from '../RendererWorkerApi/RendererWorkerApi.ts'

const state = {
  rpc: undefined,
}

export const invoke = <T extends keyof RendererWorkerApi>(
  method: T,
  ...params: Parameters<RendererWorkerApi[T]>
): ReturnType<RendererWorkerApi[T]> => {
  const rpc = state.rpc
  // @ts-ignore
  return rpc.invoke(method, ...params)
}

export const invokeAndTransfer = <T extends keyof RendererWorkerApi>(
  method: T,
  ...params: Parameters<RendererWorkerApi[T]>
): ReturnType<RendererWorkerApi[T]> => {
  const rpc = state.rpc
  // @ts-ignore
  return rpc.invokeAndTransfer(method, ...params)
}

export const setRpc = (rpc: any): void => {
  state.rpc = rpc
}
