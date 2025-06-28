import { Rpc } from '@lvce-editor/rpc'
import * as RpcRegistry from '../RpcRegistry/RpcRegistry.ts'

interface LazyRpc {
  setFactory: (value: () => Promise<Rpc>) => void
  invoke: (method: string, ...params: readonly any[]) => Promise<any>
}

export const createLazyRpc = (rpcId: number): LazyRpc => {
  let rpcPromise: Promise<void> | undefined
  let factory: () => Promise<Rpc>
  const createRpc = async (): Promise<void> => {
    const rpc = await factory()
    RpcRegistry.set(rpcId, rpc)
  }
  const ensureRpc = async () => {
    if (!rpcPromise) {
      rpcPromise = createRpc()
    }
    await rpcPromise
  }
  return {
    setFactory(value: () => Promise<Rpc>) {
      factory = value
    },
    async invoke(method: string, ...params: readonly any[]): Promise<any> {
      await ensureRpc()
      // @ts-ignore
      return invoke(method, ...params)
    },
  }
}
