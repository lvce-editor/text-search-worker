import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

export const wrapCommand = (fn: any) => {
  const wrapped = async (uid: number, ...args: any[]) => {
    const state = SearchViewStates.get(uid)
    const newState = await fn(state, ...args)
    SearchViewStates.set(uid, state, newState)
  }
  return wrapped
}
