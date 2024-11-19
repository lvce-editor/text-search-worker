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

const getSavedReplaceExpanded = (savedState: unknown): boolean => {
  if (savedState && typeof savedState === 'object' && 'replaceExpanded' in savedState && typeof savedState.replaceExpanded === 'boolean') {
    return savedState.replaceExpanded
  }
  return false
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

const getSavedPreserveCase = (savedState: unknown): boolean => {
  if (savedState && typeof savedState === 'object' && 'preserveCase' in savedState && typeof savedState.preserveCase === 'boolean') {
    return savedState.preserveCase
  }
  return false
}

const getSavedMatchCase = (savedState: unknown): boolean => {
  if (savedState && typeof savedState === 'object' && 'matchCase' in savedState && typeof savedState.matchCase === 'boolean') {
    return savedState.matchCase
  }
  return false
}

const getSavedMatchWholeWord = (savedState: unknown): boolean => {
  if (savedState && typeof savedState === 'object' && 'matchWholeWord' in savedState && typeof savedState.matchWholeWord === 'boolean') {
    return savedState.matchWholeWord
  }
  return false
}

export const restoreState = (savedState: unknown): RestoredState => {
  const savedValue = getSavedValue(savedState)
  const savedReplaceExpanded = getSavedReplaceExpanded(savedState)
  const savedCollapsedPaths = getSavedCollapsedPaths(savedState)
  const threads = getThreads()
  const replacement = getSavedReplacement(savedState)
  const savedPreserveCase = getSavedPreserveCase(savedState)
  const savedMatchCase = getSavedMatchCase(savedState)
  const savedMatchWholeWord = getSavedMatchWholeWord(savedState)

  return {
    savedCollapsedPaths,
    savedReplaceExpanded,
    savedValue,
    threads,
    replacement,
    savedPreserveCase,
    savedMatchCase,
    savedMatchWholeWord,
  }
}
