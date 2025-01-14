import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

export const wrapCommand = (fn: any): any => {
  const wrapped = async (uid: number, ...args: readonly any[]): Promise<void> => {
    const { newState } = SearchViewStates.get(uid)
    const newerState = await fn(newState, ...args)
    SearchViewStates.set(uid, newState, newerState)
  }
  return wrapped
}
