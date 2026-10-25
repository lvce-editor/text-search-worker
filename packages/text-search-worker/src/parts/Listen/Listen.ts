import * as CommandMap from '../CommandMap/CommandMap.ts'
import * as CommandMapRef from '../CommandMapRef/CommandMapRef.ts'
import * as InitializeRendererWorker from '../InitializeRendererWorker/InitializeRendererWorker.ts'
import * as TextSearchProviderMap from '../TextSearchProviderMap/TextSearchProviderMap.ts'
import * as TextSearchProviders from '../TextSearchProviders/TextSearchProviders.ts'

export const listen = async (): Promise<void> => {
  Object.assign(CommandMapRef.commandMapRef, CommandMap.commandMap)
  TextSearchProviders.add(TextSearchProviderMap.textSearchProviderMap)

  await InitializeRendererWorker.initializeRendererWorker()
}
