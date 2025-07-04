import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'
import * as TextSearchProviderMap from '../TextSearchProviderMap/TextSearchProviderMap.ts'
import * as TextSearchProviders from '../TextSearchProviders/TextSearchProviders.ts'

export const listen = async (): Promise<void> => {
  TextSearchProviders.add(TextSearchProviderMap.textSearchProviderMap)
  const rpc = await WebWorkerRpcClient.create({
    commandMap: CommandMap.commandMap,
  })
  RendererWorker.set(rpc)
}
