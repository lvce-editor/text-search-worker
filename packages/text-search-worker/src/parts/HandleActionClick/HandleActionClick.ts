import type { SearchState } from '../SearchState/SearchState.ts'
import { clearSearchResults } from '../ClearSearchResults/ClearSearchResults.ts'
import { collapseAll } from '../CollapseAll/CollapseAll.ts'
import * as InputName from '../InputName/InputName.ts'

export const handleActionClick = async (state: SearchState, name: string): Promise<SearchState> => {
  switch (name) {
    case InputName.ClearAll:
      return clearSearchResults(state)
    case InputName.CollapseAll:
      return collapseAll(state)
    default:
      return state
  }
}
