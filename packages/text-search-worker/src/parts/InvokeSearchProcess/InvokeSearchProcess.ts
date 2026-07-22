import { PlatformType } from '@lvce-editor/constants'
import { RendererWorker, SearchProcess } from '@lvce-editor/rpc-registry'
import * as PlatformState from '../PlatformState/PlatformState.ts'

export const invoke = async (method: string, ...params: readonly any[]): Promise<any> => {
  const platform = PlatformState.get()
  if (platform === PlatformType.Remote || platform === PlatformType.Electron) {
    return SearchProcess.invoke(method, ...params)
  }
  return RendererWorker.invoke('SearchProcess.invoke', method, ...params)
}
