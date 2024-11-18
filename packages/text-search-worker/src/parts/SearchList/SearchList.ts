export interface SearchList {
  readonly collapsedPaths: readonly string[]
  readonly deltaY: number
  readonly fileCount: number
  readonly finalDeltaY: number
  readonly focusedIndex: number
  readonly headerHeight: number
  readonly height: number
  readonly icons: readonly string[]
  readonly itemHeight: number
  readonly items: readonly any[]
  readonly listFocused: boolean
  readonly listFocusedIndex: number
  readonly matchCount: number
  readonly maxLineY: number
  readonly message: string
  readonly minimumSliderSize: number
  readonly minLineY: number
  readonly scrollBarActive: boolean
  readonly scrollBarHeight: number
  readonly searchId: number
  readonly searchResults: readonly any[]
  readonly stats: any
  readonly touchDifference: number
  readonly touchOffsetY: number
  readonly touchTimeStamp: number
  readonly width: number
  readonly x: number
  readonly y: number
  readonly threads: number
  readonly workspacePath: string
  readonly loaded: boolean
  readonly assetDir: string
  readonly handleOffset: number
}
