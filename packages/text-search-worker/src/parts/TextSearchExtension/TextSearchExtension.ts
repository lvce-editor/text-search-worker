import * as Assert from '../Assert/Assert.ts'
import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const textSearch = async (scheme: string, root: string, query: string): Promise<any> => {
  Assert.string(scheme)
  Assert.string(query)
  const result = await Rpc.invoke('ExtensionHostTextSearch.executeTextSearchProvider', scheme, query)
  return result
}
