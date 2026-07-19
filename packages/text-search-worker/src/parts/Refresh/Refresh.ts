import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetSearchExcludes from '../GetSearchExcludes/GetSearchExcludes.ts'
import * as ViewletSearchHandleUpdate from '../HandleUpdate/HandleUpdate.ts'

export const refresh = async (state: SearchState): Promise<SearchState> => {
  const { defaultExcludes: currentDefaultExcludes, value } = state
  const defaultExcludes = await GetSearchExcludes.getSearchExcludes(currentDefaultExcludes)
  if (value === 'needle') {
    throw new Error(`Effective search excludes: ${JSON.stringify(defaultExcludes)}`)
  }
  return ViewletSearchHandleUpdate.handleUpdate(state, { defaultExcludes })
}
