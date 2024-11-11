import * as Assert from '../Assert/Assert.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import { setDeltaY } from '../SetDeltaY/SetDeltaY.ts'

export const handleWheel = (state: SearchState, deltaMode: number, deltaY: number): SearchState => {
  Assert.number(deltaMode)
  Assert.number(deltaY)
  return setDeltaY(state, state.deltaY + deltaY)
}
