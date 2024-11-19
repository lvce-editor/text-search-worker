import type { RestoredState } from '../RestoredState/RestoredState.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

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
  if (savedState && typeof savedState === 'object') {
    let flags = 0
    if ('preserveCase' in savedState && savedState.preserveCase === true) {
      flags |= SearchFlags.PreserveCase
    }
    if ('useRegularExpression' in savedState && savedState.useRegularExpression === true) {
      flags |= SearchFlags.UseRegularExpression
    }
    if ('replaceExpanded' in savedState && savedState.replaceExpanded === true) {
      flags |= SearchFlags.ReplaceExpanded
    }
    if ('matchWholeWord' in savedState && savedState.matchWholeWord === true) {
      flags |= SearchFlags.MatchWholeWord
    }
    if ('matchCase' in savedState && savedState.matchCase === true) {
      flags |= SearchFlags.MatchCase
    }
    return flags
  }
  return 0
}

const getSavedCollapsedPaths = (savedState: unknown): string[] => {
  if (
    savedState &&
    typeof savedState === 'object' &&
    'collapsedPaths' in savedState &&
    Array.isArray(savedState.collapsedPaths) &&
    savedState.collapsedPaths.every((path: any) => typeof path === 'string')
  ) {
    return savedState.collapsedPaths
  }
  return []
}

const getThreads = (): number => {
  return 1
}

export const restoreState = (savedState: unknown): RestoredState => {
  const savedValue = getSavedValue(savedState)
  const savedCollapsedPaths = getSavedCollapsedPaths(savedState)
  const threads = getThreads()
  const replacement = getSavedReplacement(savedState)
  const flags = getSavedFlags(savedState)

  return {
    savedCollapsedPaths,
    savedValue,
    threads,
    replacement,
    flags,
  }
}
