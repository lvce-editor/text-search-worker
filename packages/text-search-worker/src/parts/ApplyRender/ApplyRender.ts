import * as GetRenderer from '../GetRenderer/GetRenderer.ts'
import { SearchState } from '../SearchState/SearchState.ts'

export const applyRender = (oldState: SearchState, newState: SearchState, diffResult: readonly number[]): readonly any[] => {
  const commands = []
  for (const item of diffResult) {
    const fn = GetRenderer.getRenderer(item)
    commands.push(fn(oldState, newState))
  }
  return commands
}
