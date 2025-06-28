import { SearchProcess } from '@lvce-editor/rpc-registry'
import * as GetOrCreateSearchProcess from '../GetOrCreateSearchProcess/GetOrCreateSearchProcess.ts'
import * as GetOrCreateSearchProcessElectron from '../GetOrCreateSearchProcessElectron/GetOrCreateSearchProcessElectron.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const { set, dispose } = SearchProcess

export const lazyInvoke = async (platform: number | undefined, method: string, ...params: readonly any[]): Promise<any> => {
  if (platform === PlatformType.Electron) {
    await GetOrCreateSearchProcessElectron.getOrCreate()
  } else if (platform === PlatformType.Remote) {
    await GetOrCreateSearchProcess.getOrCreate()
  }
  // @ts-ignore
  return invoke(method, ...params)
}
