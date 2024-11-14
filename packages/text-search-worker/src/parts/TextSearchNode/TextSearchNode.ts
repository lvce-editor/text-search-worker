import * as GetTextSearchRipGrepArgs from '../GetTextSearchRipGrepArgs/GetTextSearchRipGrepArgs.ts'
import * as SearchProcess from '../SearchProcess/SearchProcess.ts'

export const textSearch = async (scheme: string, root: string, query: string, options: any): Promise<any> => {
  const ripGrepArgs = GetTextSearchRipGrepArgs.getRipGrepArgs({
    ...options,
    searchString: query,
  })
  const actualOptions = {
    ripGrepArgs,
    searchDir: root,
  }
  const result = await SearchProcess.invoke('TextSearch.search', actualOptions)
  // TODO api is weird
  return result.results
}
