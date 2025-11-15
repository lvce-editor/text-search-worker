interface CutTextResult {
  readonly newText: string
  readonly cutText: string
}

export const getNewTextCut = (currentText: string, selectionStart: number, selectionEnd: number): CutTextResult => {
  const pre = currentText.slice(0, selectionStart)
  const middle = currentText.slice(selectionStart, selectionEnd)
  const post = currentText.slice(selectionEnd)
  return {
    newText: pre + post,
    cutText: middle,
  }
}
