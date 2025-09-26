import type { RestoredState } from '../RestoredState/RestoredState.ts'
import { getSavedFocus, getSavedListFocus } from '../GetSavedFocus/GetSavedFocus.ts'
import { getSavedHistory } from '../GetSavedHistory/GetSavedHistory.ts'
import {
  getSavedValue,
  getSavedReplacement,
  getSavedFlags,
  getSavedIncludeValue,
  getSavedExcludeValue,
  getSavedCollapsedPaths,
} from '../GetSavedValues/GetSavedValues.ts'

export const restoreState = (savedState: unknown): RestoredState => {
  return {
    savedValue: getSavedValue(savedState),
    replacement: getSavedReplacement(savedState),
    savedCollapsedPaths: getSavedCollapsedPaths(savedState),
    threads: 1,
    flags: getSavedFlags(savedState),
    includeValue: getSavedIncludeValue(savedState),
    excludeValue: getSavedExcludeValue(savedState),
    history: getSavedHistory(savedState),
    focus: getSavedFocus(savedState),
    listFocused: getSavedListFocus(savedState),
  }
}
