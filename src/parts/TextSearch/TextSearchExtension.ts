import * as Assert from '../Assert/Assert.ts'

export const textSearch = async (scheme: string, root: string, query: string) => {
  Assert.string(scheme)
  Assert.string(query)
  throw new Error('not implemented')
}
