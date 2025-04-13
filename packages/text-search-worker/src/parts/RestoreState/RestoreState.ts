import type { RestoredState } from '../RestoredState/RestoredState.ts'
import { getSavedHistory } from '../GetSavedHistory/GetSavedHistory.ts'
import { getSavedValue, getSavedReplacement, getSavedFlags, getSavedIncludeValue, getSavedExcludeValue } from '../GetSavedValues/GetSavedValues.ts'

export const restoreState = (savedState: unknown): RestoredState => {
  return {
    savedValue: getSavedValue(savedState),
    replacement: getSavedReplacement(savedState),
    savedCollapsedPaths: [],
    threads: 1,
    flags: getSavedFlags(savedState),
    includeValue: getSavedIncludeValue(savedState),
    excludeValue: getSavedExcludeValue(savedState),
    history: getSavedHistory(savedState),
  }
}
