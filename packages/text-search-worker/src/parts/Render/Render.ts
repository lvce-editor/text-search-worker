import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as Diff from '../Diff/Diff.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

export const doRender = (uid: number): readonly any[] => {
  const { oldState, newState } = SearchViewStates.get(uid)
  const diffResult = Diff.diff(oldState, newState)
  return ApplyRender.applyRender(oldState, newState, diffResult)
}
