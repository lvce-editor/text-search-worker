import * as GetOrCreateSearchProcess from '../GetOrCreateSearchProcess/GetOrCreateSearchProcess.ts'

export const invoke = async (method: string, ...params: readonly any[]): Promise<any> => {
  const rpc = await GetOrCreateSearchProcess.getOrCreate()
  return rpc.invoke(method, ...params)
}
