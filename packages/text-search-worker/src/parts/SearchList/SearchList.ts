import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'

export interface SearchList {
  readonly assetDir: string
  readonly collapsedPaths: readonly string[]
  readonly deltaY: number
  readonly disposed: boolean
  readonly fileCount: number
  readonly finalDeltaY: number
  readonly focusedIndex: number
  readonly handleOffset: number
  readonly headerHeight: number
  readonly height: number
  readonly icons: readonly string[]
  readonly inputSource: number
  readonly itemHeight: number
  readonly items: readonly SearchResult[]
  readonly listItems: readonly SearchResult[]
  readonly listFocused: boolean
  readonly listFocusedIndex: number
  readonly loaded: boolean
  readonly matchCount: number
  readonly maxLineY: number
  readonly message: string
  readonly minimumSliderSize: number
  readonly minLineY: number
  readonly scrollBarActive: boolean
  readonly scrollBarHeight: number
  readonly searchId: number
  readonly searchResults: readonly DisplaySearchResult[]
  readonly stats: any
  readonly threads: number
  readonly touchDifference: number
  readonly touchOffsetY: number
  readonly touchTimeStamp: number
  readonly width: number
  readonly workspacePath: string
  readonly x: number
  readonly y: number
}
