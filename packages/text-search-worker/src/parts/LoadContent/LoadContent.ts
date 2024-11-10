import * as InputSource from '../InputSource/InputSource.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'
import * as ViewletSearchHandleUpdate from '../HandleUpdate/HandleUpdate.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

const getSavedValue = (savedState: any): string => {
  if (savedState && savedState.value) {
    return savedState.value
  }
  return ''
}
const getSavedReplaceExpanded = (savedState: any): boolean => {
  if (savedState && 'replaceExpanded' in savedState) {
    return savedState.replaceExpanded
  }
  return false
}

const getSavedCollapsedPaths = (savedState: any): string[] => {
  if (
    savedState &&
    'collapsedPaths' in savedState &&
    Array.isArray(savedState.collapsedPaths) &&
    savedState.collapsedPaths.every((path: any) => typeof path === 'string')
  ) {
    return savedState.collapsedPaths
  }
  return []
}

const getThreads = () => {
  return 1
}

export const loadContent = async (uid: number, savedState: any): Promise<SearchState> => {
  const state = SearchViewStates.get(uid)
  const savedValue = getSavedValue(savedState)
  const savedReplaceExpanded = getSavedReplaceExpanded(savedState)
  const savedCollapsedPaths = getSavedCollapsedPaths(savedState)
  const threads = getThreads()
  if (savedValue) {
    return ViewletSearchHandleUpdate.handleUpdate(state, {
      value: savedValue,
      threads,
      replaceExpanded: savedReplaceExpanded,
      inputSource: InputSource.Script,
      collapsedPaths: savedCollapsedPaths,
    })
  }
  return {
    ...state,
    threads,
    replaceExpanded: savedReplaceExpanded,
    loaded: true,
  }
}
