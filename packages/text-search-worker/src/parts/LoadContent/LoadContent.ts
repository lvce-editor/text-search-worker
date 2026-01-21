import type { SearchState } from '../SearchState/SearchState.ts'
import * as ViewletSearchHandleUpdate from '../HandleUpdate/HandleUpdate.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as RestoreState from '../RestoreState/RestoreState.ts'

export const loadContent = async (state: SearchState, savedState: unknown): Promise<SearchState> => {
  const { excludeValue, flags, includeValue, replacement, savedCollapsedPaths, savedValue, threads } = RestoreState.restoreState(savedState)

  const update: Partial<SearchState> = {
    collapsedPaths: savedCollapsedPaths,
    excludeValue,
    flags,
    focus: 0, // TODO
    includeValue,
    inputSource: InputSource.Script,
    replacement,
    threads,
    value: savedValue,
  }
  if (savedValue) {
    const result = await ViewletSearchHandleUpdate.handleUpdate(state, update)
    return {
      ...result,
      initial: false,
      loaded: true,
    }
  }
  return {
    ...state,
    ...update,
    flags,
    initial: false,
    loaded: true,
    threads,
  }
}
