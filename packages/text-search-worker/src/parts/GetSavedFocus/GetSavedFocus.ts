export const getSavedFocus = (savedState: unknown): number => {
  if (savedState && typeof savedState === 'object' && 'focus' in savedState && typeof savedState.focus === 'number') {
    return savedState.focus
  }
  return 0
}
