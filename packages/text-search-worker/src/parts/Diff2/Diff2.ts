import * as Diff from '../Diff/Diff.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

export const diff2 = (uid: number): readonly number[] => {
  const { oldState, newState } = SearchViewStates.get(uid)
  const diffResult = Diff.diff(oldState, newState)
  return diffResult
}
