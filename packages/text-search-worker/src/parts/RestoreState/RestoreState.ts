const getSavedValue = (savedState: unknown): string => {
  if (savedState && typeof savedState === 'object' && 'value' in savedState && typeof savedState.value === 'string') {
    return savedState.value
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

interface RestoredState {
  readonly savedValue: string
  readonly savedReplaceExpanded: boolean
  readonly savedCollapsedPaths: readonly string[]
  readonly threads: number
}

export const restoreState = (savedState: unknown): RestoredState => {
  const savedValue = getSavedValue(savedState)
  const savedReplaceExpanded = getSavedReplaceExpanded(savedState)
  const savedCollapsedPaths = getSavedCollapsedPaths(savedState)
  const threads = getThreads()
  return {
    savedCollapsedPaths,
    savedReplaceExpanded,
    savedValue,
    threads,
  }
}
