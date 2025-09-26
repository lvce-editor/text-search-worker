import type { SearchState } from '../SearchState/SearchState.ts'
import * as ViewletSearchHandleUpdate from '../HandleUpdate/HandleUpdate.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as RestoreState from '../RestoreState/RestoreState.ts'

export const loadContent = async (state: SearchState, savedState: unknown): Promise<SearchState> => {
  const { savedValue, savedCollapsedPaths, threads, replacement, flags, includeValue, excludeValue, focus } = RestoreState.restoreState(savedState)

  const update: Partial<SearchState> = {
    value: savedValue,
    threads,
    inputSource: InputSource.Script,
    collapsedPaths: savedCollapsedPaths,
    replacement,
    flags,
    includeValue,
    excludeValue,
    focus: 0, // TODO
  }
  if (savedValue) {
    const result = await ViewletSearchHandleUpdate.handleUpdate(state, update)
    return {
      ...result,
      loaded: true,
    }
  }
  return {
    ...state,
    ...update,
    threads,
    flags,
    loaded: true,
  }
}
