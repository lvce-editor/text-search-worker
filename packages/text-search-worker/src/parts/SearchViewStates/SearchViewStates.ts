import type { SearchState } from '../SearchState/SearchState.ts'

const states = Object.create(null)

export const get = (
  uid: number,
): {
  oldState: SearchState
  newState: SearchState
} => {
  return states[uid]
}

export const set = (uid: number, oldState: SearchState, newState: SearchState): void => {
  states[uid] = {
    oldState,
    newState,
  }
}
