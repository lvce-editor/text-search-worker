import * as Assert from '../Assert/Assert.ts'
import * as Command from '../Command/Command.ts'
import * as GetReplaceAllConfirmText from '../GetReplaceAllConfirmText/GetReplaceAllConfirmText.ts'
import * as ViewletSearchStrings from '../SearchStrings/SearchStrings.ts'

export const replaceAllAndPrompt = async (
  workspacePath: string,
  items: readonly any[],
  replacement: string,
  matchCount: number,
  fileCount: number,
): Promise<boolean> => {
  Assert.string(workspacePath)
  Assert.array(items)
  Assert.string(replacement)
  Assert.number(matchCount)
  Assert.number(fileCount)
  const confirmTitle = ViewletSearchStrings.replaceAll()
  const confirmAccept = ViewletSearchStrings.replace()
  const confirmText = GetReplaceAllConfirmText.getReplaceAllConfirmText(matchCount, fileCount, replacement)
  const shouldReplace = await Command.execute('ConfirmPrompt.prompt', confirmText, { title: confirmTitle, confirmMessage: confirmAccept })
  if (!shouldReplace) {
    return false
  }
  // TODO
  // await TextSearchReplaceAll.replaceAll(workspacePath, items, replacement)
  return true
}
