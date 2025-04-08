import type { SearchState } from '../SearchState/SearchState.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

export interface WrappedFn {
  (uid: number, ...args: readonly any[]): Promise<void>
}

interface Fn {
  (state: SearchState, ...args: readonly any[]): SearchState | Promise<SearchState>
}

export const wrapCommand = (fn: Fn): WrappedFn => {
  const wrapped = async (uid: number, ...args: readonly any[]): Promise<void> => {
    const { newState } = SearchViewStates.get(uid)
    const newerState = await fn(newState, ...args)
    if (newState === newerState) {
      return
    }
    const latest = SearchViewStates.get(uid)
    SearchViewStates.set(uid, latest.oldState, newerState)
  }
  return wrapped
}
