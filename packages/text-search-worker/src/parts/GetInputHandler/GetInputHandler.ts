import * as HandleInput from '../HandleInput/HandleInput.ts'
import * as HandleReplaceInput from '../HandleReplaceInput/HandleReplaceInput.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

interface InputHandler {
  (state: SearchState, value: string, inputSource?: number): Promise<SearchState>
}

export const getInputHandler = (name: string): InputHandler => {
  switch (name) {
    case 'search-value':
      return HandleInput.handleInput
    case 'replacement-value':
      return HandleReplaceInput.handleReplaceInput
    default:
      throw new Error(`unknown input handler: ${name}`)
  }
}
