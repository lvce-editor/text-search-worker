import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

const isFile = (match: any): boolean => {
  return match.type === TextSearchResultType.Match
}

export const getFiles = async (matches: readonly any[]): Promise<readonly any[]> => {
  return matches.filter(isFile)
}
