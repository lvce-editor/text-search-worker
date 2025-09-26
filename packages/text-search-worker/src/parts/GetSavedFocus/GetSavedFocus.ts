export const getSavedFocus = (savedState: unknown): number => {
  if (savedState && typeof savedState === 'object' && 'focus' in savedState && typeof savedState.focus === 'number') {
    return savedState.focus
  }
  return 0
}

export const getSavedListFocus = (savedState: unknown): boolean => {
  if (savedState && typeof savedState === 'object' && 'listFocused' in savedState && typeof savedState.listFocused === 'boolean') {
    return savedState.listFocused
  }
  return false
}
