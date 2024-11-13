import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

export const saveState = (uid: number) => {
  const { newState } = SearchViewStates.get(uid)
  const { value, replaceExpanded } = newState
  return {
    value,
    replaceExpanded,
  }
}