import * as Assert from '../Assert/Assert.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const textSearch = async (scheme: string, root: string, query: string): Promise<any> => {
  Assert.string(scheme)
  Assert.string(query)
  const result = await RendererWorker.invoke('ExtensionHostTextSearch.executeTextSearchProvider', scheme, query)
  return result
}
