import * as I18nString from '../I18NString/I18NString.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const noResults = (): string => {
  return I18nString.i18nString(UiStrings.NoResults)
}

export const oneResult = (): string => {
  return I18nString.i18nString(UiStrings.Oneresult)
}

export const toggleReplace = (): string => {
  return I18nString.i18nString(UiStrings.ToggleReplace)
}

export const matchCase = (): string => {
  return I18nString.i18nString(UiStrings.MatchCase)
}

export const preserveCase = (): string => {
  return I18nString.i18nString(UiStrings.PreserveCase)
}

export const matchWholeWord = (): string => {
  return I18nString.i18nString(UiStrings.MatchWholeWord)
}

export const toggleSearchDetails = (): string => {
  return I18nString.i18nString(UiStrings.ToggleSearchDetails)
}

export const useRegularExpression = (): string => {
  return I18nString.i18nString(UiStrings.UseRegularExpression)
}

export const manyResultsInOneFile = (resultCount: number): string => {
  return I18nString.i18nString(UiStrings.ManyResultsInOneFile, {
    PH1: resultCount,
  })
}

export const manyResultsInManyFiles = (resultCount: number, fileResultCount: number): string => {
  return I18nString.i18nString(UiStrings.ManyResultsInManyFiles, {
    PH1: resultCount,
    PH2: fileResultCount,
  })
}

export const confirmReplaceOneOccurrenceInOneFile = (replacement: string): string => {
  return I18nString.i18nString(UiStrings.ConfirmReplaceOneOccurrenceInOneFile, {
    PH1: replacement,
  })
}

export const confirmReplaceOneOccurrenceInOneFileNoValue = (): string => {
  return I18nString.i18nString(UiStrings.ConfirmReplaceOneOccurrenceInOneFileNoValue)
}

export const confirmReplaceManyOccurrencesInOneFile = (matchCount: number, replacement: string): string => {
  return I18nString.i18nString(UiStrings.ConfirmReplaceManyOccurrencesInOneFile, {
    PH1: matchCount,
    PH2: replacement,
  })
}

export const confirmReplaceManyOccurrencesInOneFileNoValue = (matchCount: number): string => {
  return I18nString.i18nString(UiStrings.ConfirmReplaceManyOccurrencesInOneFileNoValue, {
    PH1: matchCount,
  })
}

export const confirmReplaceManyOccurrencesInManyFiles = (matchCount: number, fileCount: number, replacement: string): string => {
  return I18nString.i18nString(UiStrings.ConfirmReplaceManyOccurrencesInManyFiles, {
    PH1: matchCount,
    PH2: fileCount,
    PH3: replacement,
  })
}

export const confirmReplaceManyOccurrencesInManyFilesNoValue = (matchCount: number, fileCount: number): string => {
  return I18nString.i18nString(UiStrings.ConfirmReplaceManyOccurrencesInManyFilesNoValue, {
    PH1: matchCount,
    PH2: fileCount,
  })
}

export const replacedOneOccurrenceInOneFile = (replacement: string): string => {
  return I18nString.i18nString(UiStrings.ReplacedOneOccurrenceInOneFile, {
    PH1: replacement,
  })
}

export const replacedManyOccurrencesInOneFile = (matchCount: number, replacement: string): string => {
  return I18nString.i18nString(UiStrings.ReplacedOneOccurrenceInOneFile, {
    PH1: matchCount,
    PH2: replacement,
  })
}

export const replacedManyOccurrencesInManyFiles = (matchCount: number, fileCount: number, replacement: string): string => {
  return I18nString.i18nString(UiStrings.ReplacedManyOccurrencesInManyFiles, {
    PH1: matchCount,
    PH2: fileCount,
    PH3: replacement,
  })
}

export const replaceAll = (): string => {
  return I18nString.i18nString(UiStrings.ReplaceAll)
}

export const replace = (): string => {
  return I18nString.i18nString(UiStrings.Replace)
}

export const dismiss = (): string => {
  return I18nString.i18nString(UiStrings.Dismiss)
}

export const copyPath = (): string => {
  return I18nString.i18nString(UiStrings.CopyPath)
}

export const refresh = (): string => {
  return I18nString.i18nString(UiStrings.Refresh)
}

export const clearSearchResults = (): string => {
  return I18nString.i18nString(UiStrings.ClearSearchResults)
}

export const openNewSearchEditor = (): string => {
  return I18nString.i18nString(UiStrings.OpenNewSearchEditor)
}

export const viewAsTree = (): string => {
  return I18nString.i18nString(UiStrings.ViewAsTree)
}

export const collapseAll = (): string => {
  return I18nString.i18nString(UiStrings.CollapseAll)
}

export const filesToInclude = (): string => {
  return I18nString.i18nString(UiStrings.FilesToInclude)
}

export const filesToExclude = (): string => {
  return I18nString.i18nString(UiStrings.FilesToExclude)
}

export const searchOnlyOpenEditors = (): string => {
  return I18nString.i18nString(UiStrings.SearchOnlyOpenEditors)
}

export const useExcludeSettings = (): string => {
  return I18nString.i18nString(UiStrings.UseExcludeSettings)
}

export const searchForHistory = (): string => {
  return I18nString.i18nString(UiStrings.SearchForHistory)
}
