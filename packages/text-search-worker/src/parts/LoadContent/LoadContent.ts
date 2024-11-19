import * as ViewletSearchHandleUpdate from '../HandleUpdate/HandleUpdate.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as RestoreState from '../RestoreState/RestoreState.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

export const loadContent = async (state: SearchState, savedState: unknown): Promise<SearchState> => {
  const { savedValue, savedCollapsedPaths, threads, replacement, flags } = RestoreState.restoreState(savedState)
  if (savedValue) {
    return ViewletSearchHandleUpdate.handleUpdate(state, {
      value: savedValue,
      threads,
      inputSource: InputSource.Script,
      collapsedPaths: savedCollapsedPaths,
      replacement,
      flags,
    })
  }
  return {
    ...state,
    threads,
    flags,
    loaded: true,
  }
}
