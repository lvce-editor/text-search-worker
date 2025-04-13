import type { SearchState } from '../SearchState/SearchState.ts'
import { getNextHistoryData } from '../GetNextHistoryData/GetNextHistoryData.ts'
import * as HandleUpdate from '../HandleUpdate/HandleUpdate.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const nextHistoryResult = async (state: SearchState): Promise<SearchState> => {
  const { history, historyIndex, value } = state
  const { newValue, newHistoryIndex } = getNextHistoryData(history, historyIndex)
  if (newValue === value) {
    return state
  }

  return HandleUpdate.handleUpdate(state, {
    value: newValue,
    inputSource: InputSource.Script,
    historyIndex: newHistoryIndex,
  })
}
