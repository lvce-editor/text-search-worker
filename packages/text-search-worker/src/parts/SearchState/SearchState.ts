import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'
import type { SearchList } from '../SearchList/SearchList.ts'

export interface SearchState extends SearchHeader, SearchList {
  readonly uid: number
  readonly platform: number
}
