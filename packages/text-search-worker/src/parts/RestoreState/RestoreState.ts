import type { RestoredState } from '../RestoredState/RestoredState.ts'

const getSavedValue = (savedState: unknown): string => {
  if (savedState && typeof savedState === 'object' && 'value' in savedState && typeof savedState.value === 'string') {
    return savedState.value
  }
  return ''
}

const getSavedReplacement = (savedState: unknown): string => {
  if (savedState && typeof savedState === 'object' && 'replacement' in savedState && typeof savedState.replacement === 'string') {
    return savedState.replacement
  }
  return ''
}

const getSavedFlags = (savedState: unknown): number => {
  if (savedState && typeof savedState === 'object' && 'flags' in savedState && typeof savedState.flags === 'number') {
    return savedState.flags
  }
  return 0
}

export const restoreState = (savedState: unknown): RestoredState => {
  return {
    savedValue: getSavedValue(savedState),
    replacement: getSavedReplacement(savedState),
    savedCollapsedPaths: [],
    threads: 1,
    flags: getSavedFlags(savedState),
  }
}
