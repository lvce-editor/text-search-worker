import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'

export interface ViewModel {
  readonly displayResults: readonly DisplaySearchResult[]
  readonly flags: number
  readonly message: string
  readonly focusOutline: boolean
  readonly searchInputErrorMessage: string
  readonly scrollBarHeight: number
  readonly scrollBarY: number
  readonly scrollBarValue: number
  readonly deltaY: number
  readonly itemHeight: number
  readonly matchCount: number
}
