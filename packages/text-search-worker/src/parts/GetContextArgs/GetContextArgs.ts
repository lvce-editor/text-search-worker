export const getContextArgs = (contextLines?: number): readonly string[] => {
  if (contextLines && contextLines > 0) {
    return ['--context', `${Math.trunc(contextLines)}`]
  }
  return []
}
