import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import * as CommandMapRef from '../CommandMapRef/CommandMapRef.ts'
import * as TextSearchProviderMap from '../TextSearchProviderMap/TextSearchProviderMap.ts'
import * as TextSearchProviders from '../TextSearchProviders/TextSearchProviders.ts'

export const listen = async (): Promise<void> => {
  Object.assign(CommandMapRef.commandMapRef, CommandMap.commandMap)
  TextSearchProviders.add(TextSearchProviderMap.textSearchProviderMap)
  const rpc = await WebWorkerRpcClient.create({
    commandMap: CommandMapRef.commandMapRef,
  })
  RendererWorker.set(rpc)
}
