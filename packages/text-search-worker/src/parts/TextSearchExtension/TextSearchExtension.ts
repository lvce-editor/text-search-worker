import * as Assert from '../Assert/Assert.ts'
import * as Rpc from '../Rpc/Rpc.ts'

export const textSearch = async (scheme: string, root: string, query: string) => {
  Assert.string(scheme)
  Assert.string(query)
  const result = await Rpc.invoke('ExtensionHostTextSearch.executeTextSearchProvider', scheme, query)
  return result
}
