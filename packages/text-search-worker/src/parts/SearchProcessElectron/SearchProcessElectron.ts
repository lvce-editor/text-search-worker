import * as GetOrCreateSearchProcessElectron from '../GetOrCreateSearchProcessElectron/GetOrCreateSearchProcessElectron.ts'

export const invoke = async (method: string, ...params: any[]): Promise<any> => {
  const rpc = await GetOrCreateSearchProcessElectron.getOrCreate()
  return rpc.invoke(method, ...params)
}
