import type { TextSearchOptions } from '../TextSearchOptions/TextSearchOptions.ts'
import * as Assert from '../Assert/Assert.ts'
import * as GetTextSearchRipGrepArgs from '../GetTextSearchRipGrepArgs/GetTextSearchRipGrepArgs.ts'
import * as InvokeSearchProcess from '../InvokeSearchProcess/InvokeSearchProcess.ts'

export const textSearchIncremental = async (
  root: string,
  query: string,
  options: TextSearchOptions,
  assetDir: string,
  _platform: number,
  searchId: string,
): Promise<void> => {
  Assert.string(root)
  Assert.string(query)
  const ripGrepArgs = GetTextSearchRipGrepArgs.getRipGrepArgs({
    ...options,
    searchString: query,
  })
  const actualOptions = {
    id: searchId,
    ripGrepArgs,
    searchDir: root,
  }

  await InvokeSearchProcess.invoke('TextSearch.searchIncremental', actualOptions)
}
