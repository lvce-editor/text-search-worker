import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const invoke = (method: string, ...params: any[]): Promise<any> => {
  return Rpc.invoke('SearchProcess.invoke', method, ...params)
}
