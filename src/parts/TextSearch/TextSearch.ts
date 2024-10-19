import * as Assert from '../Assert/Assert.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import * as TextSearchProvider from '../TextSearchProvider/TextSearchProvider.ts'

export const textSearch = async (root: string, query: string, options: any) => {
  Assert.string(root)
  Assert.string(query)
  const scheme = GetProtocol.getProtocol(root)
  const provider = TextSearchProvider.getProvider(scheme)
  const results = await provider(scheme, root, query, options)
  return results
}

// @ts-ignore
const cancel = async (searchId: any) => {
  // TODO
  // await SharedProcess.invoke(
  //   /* Search.cancel */ 'Search.cancel',
  //   /* searchId */ state.searchId
  // )
}
