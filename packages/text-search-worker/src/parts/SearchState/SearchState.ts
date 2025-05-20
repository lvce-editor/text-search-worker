import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'
import type { SearchList } from '../SearchList/SearchList.ts'

export interface SearchState extends SearchHeader, SearchList {
  readonly uid: number
  readonly platform: number
  readonly searchProgress: {
    readonly totalResults: number
    readonly isComplete: boolean
    readonly currentPage: number
    readonly resultsPerPage: number
  }
}
