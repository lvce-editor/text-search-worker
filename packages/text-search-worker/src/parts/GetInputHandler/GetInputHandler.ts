import * as HandleExcludeInput from '../HandleExcludeInput/HandleExcludeInput.ts'
import * as HandleInput from '../HandleInput/HandleInput.ts'
import * as HandleReplaceInput from '../HandleReplaceInput/HandleReplaceInput.ts'
import type { InputHandler } from '../InputHandler/InputHandler.ts'


export const getInputHandler = (name: string): InputHandler => {
  switch (name) {
    case 'search-value':
      return HandleInput.handleInput
    case 'replacement-value':
      return HandleReplaceInput.handleReplaceInput
    case 'files-to-exclude-value':
      return HandleExcludeInput.handleExcludeInput
    default:
      throw new Error(`unknown input handler: ${name}`)
  }
}
