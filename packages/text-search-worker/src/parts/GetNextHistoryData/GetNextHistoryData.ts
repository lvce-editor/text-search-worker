export interface NextHistoryData {
  readonly newValue: string
  readonly newHistoryIndex: number
}

export const getNextHistoryData = (history: readonly string[], historyIndex: number): NextHistoryData => {
  if (historyIndex === -1 || history.length === 0) {
    return {
      newValue: '',
      newHistoryIndex: -1,
    }
  }
  const item = history.at(historyIndex) || ''
  return {
    newValue: item,
    newHistoryIndex: historyIndex + 1,
  }
}
