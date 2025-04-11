const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}

export const getSavedHistory = (savedState: unknown): readonly string[] => {
  if (
    savedState &&
    typeof savedState === 'object' &&
    'history' in savedState &&
    Array.isArray(savedState.history) &&
    savedState.history.every(isString)
  ) {
    return savedState.history
  }
  return []
}
