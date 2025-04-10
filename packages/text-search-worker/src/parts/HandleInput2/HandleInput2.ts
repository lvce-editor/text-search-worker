import type { SearchState } from '../SearchState/SearchState.ts'
import * as HandleExcludeInput from '../HandleExcludeInput/HandleExcludeInput.ts'
import * as HandleIncludeInput from '../HandleIncludeInput/HandleIncludeInput.ts'
import * as HandleReplaceInput from '../HandleReplaceInput/HandleReplaceInput.ts'
import * as InputName from '../InputName/InputName.ts'
import * as InputSource from '../InputSource/InputSource.ts'

interface InputHandler {
  (state: SearchState, value: string): Promise<SearchState>
}

const getInputHandler = (inputName: string): InputHandler => {
  switch (inputName) {
    case InputName.FilesToExclude:
      return HandleExcludeInput.handleExcludeInput
    case InputName.FilesToInclude:
      return HandleIncludeInput.handleIncludeInput
    case InputName.ReplaceValue:
    default:
      return HandleReplaceInput.handleReplaceInput
  }
}

export const handleInput2 = (state: SearchState, inputName: string, value: string, inputSource = InputSource.Script): Promise<SearchState> => {
  const fn = getInputHandler(inputName)
  return fn(state, value)
}
