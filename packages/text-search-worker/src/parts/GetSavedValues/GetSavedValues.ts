export const getSavedValue = (savedState: unknown): string => {
  if (savedState && typeof savedState === 'object' && 'value' in savedState && typeof savedState.value === 'string') {
    return savedState.value
  }
  return ''
}

export const getSavedReplacement = (savedState: unknown): string => {
  if (savedState && typeof savedState === 'object' && 'replacement' in savedState && typeof savedState.replacement === 'string') {
    return savedState.replacement
  }
  return ''
}

export const getSavedFlags = (savedState: unknown): number => {
  if (savedState && typeof savedState === 'object' && 'flags' in savedState && typeof savedState.flags === 'number') {
    return savedState.flags
  }
  return 0
}

export const getSavedIncludeValue = (savedState: unknown): string => {
  if (savedState && typeof savedState === 'object' && 'includeValue' in savedState && typeof savedState.includeValue === 'string') {
    return savedState.includeValue
  }
  return ''
}

export const getSavedExcludeValue = (savedState: unknown): string => {
  if (savedState && typeof savedState === 'object' && 'excludeValue' in savedState && typeof savedState.excludeValue === 'string') {
    return savedState.excludeValue
  }
  return ''
}

export const getSavedCollapsedPaths = (savedState: unknown): readonly string[] => {
  if (
    savedState &&
    typeof savedState === 'object' &&
    'collapsedPaths' in savedState &&
    Array.isArray(savedState.collapsedPaths) &&
    savedState.collapsedPaths.every((item) => typeof item === 'string')
  ) {
    return savedState.collapsedPaths
  }
  return []
}
