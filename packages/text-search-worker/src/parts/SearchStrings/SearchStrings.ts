import * as Assert from '../Assert/Assert.ts'
import * as I18nString from '../I18NString/I18NString.ts'

/**
 * @enum {string}
 */
const UiStrings = {
  NoResults: 'No results found',
  Oneresult: '1 result in 1 file',
  ManyResultsInOneFile: '{PH1} results in 1 file',
  ManyResultsInManyFiles: '{PH1} results in {PH2} files',
  ReplaceAll: 'Replace All',
  Replace: 'Replace',
  ConfirmReplaceAll: 'Replace All?',
  ConfirmReplaceOneOccurrenceInOneFile: "Replace 1 occurrence across 1 file with '{PH1}'",
  ConfirmReplaceOneOccurrenceInOneFileNoValue: 'Replace 1 occurrence across 1 file',
  ConfirmReplaceManyOccurrencesInOneFile: "Replace {PH1} occurrences across 1 file with '{PH2}'",
  ConfirmReplaceManyOccurrencesInOneFileNoValue: 'Replace {PH1} occurrences across 1 file',
  ConfirmReplaceManyOccurrencesInManyFiles: "Replace {PH1} occurrences across {PH2} files with '{PH3}'",
  ConfirmReplaceManyOccurrencesInManyFilesNoValue: 'Replace {PH1} occurrences across {PH2} files',
  ReplacedOneOccurrenceInOneFile: "Replaced 1 occurrence across 1 file with '{PH1}'",
  ReplacedManyOccurrencesInOneFile: "Replaced {PH1} occurrences across 1 file with '{PH2}'",
  ReplacedManyOccurrencesInManyFiles: "Replaced {PH1} occurrences across {PH2} files with '{PH3}'",
  CopyPath: 'Copy Path',
  Dismiss: 'Dismiss',
  Refresh: 'Refresh',
  ClearSearchResults: 'Clear Search Results',
  OpenNewSearchEditor: 'Open New Search Editor',
  ViewAsTree: 'View as Tree',
  CollapseAll: 'Collapse All',
}

export const noResults = (): string => {
  return I18nString.i18nString(UiStrings.NoResults)
}

export const oneResult = (): string => {
  return I18nString.i18nString(UiStrings.Oneresult)
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
  Assert.number(matchCount)
  Assert.number(fileCount)
  Assert.string(replacement)
  return I18nString.i18nString(UiStrings.ConfirmReplaceManyOccurrencesInManyFiles, {
    PH1: matchCount,
    PH2: fileCount,
    PH3: replacement,
  })
}

export const confirmReplaceManyOccurrencesInManyFilesNoValue = (matchCount: number, fileCount: number): string => {
  Assert.number(matchCount)
  Assert.number(fileCount)
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