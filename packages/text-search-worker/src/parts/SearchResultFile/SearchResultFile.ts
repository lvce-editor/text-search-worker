import type { SearchResultMatch } from '../SearchResultMatch/SearchResultMatch.ts'

export interface SearchResultFile {
  readonly path: string
  readonly matches: readonly SearchResultMatch[]
  readonly isExpanded: boolean
}
