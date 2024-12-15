import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

const isFile = (match: any): boolean => {
  return match.type === TextSearchResultType.File
}

export const getFiles = (matches: readonly any[]): readonly any[] => {
  return matches.filter(isFile)
}
