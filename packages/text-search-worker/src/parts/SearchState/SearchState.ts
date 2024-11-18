export interface SearchState {
  readonly assetDir: string
  readonly collapsedPaths: readonly string[]
  readonly deltaY: number
  readonly detailsExpanded: boolean
  readonly disposed: boolean
  readonly excludeValue: string
  readonly fileCount: number
  readonly finalDeltaY: number
  readonly focus: any
  readonly focused: boolean
  readonly focusedIndex: number
  readonly focusSource: number
  readonly handleOffset: number
  readonly headerHeight: number
  readonly height: number
  readonly icons: readonly string[]
  readonly includeValue: string
  readonly inputSource: number
  readonly itemHeight: number
  readonly items: readonly any[]
  readonly listFocused: boolean
  readonly listFocusedIndex: number
  readonly loaded: boolean
  readonly matchCase: boolean
  readonly matchCount: number
  readonly matchWholeWord: boolean
  readonly maxLineY: number
  readonly message: string
  readonly minLineY: number
  readonly preserveCase: boolean
  readonly replaceExpanded: boolean
  readonly replacement: string
  readonly scrollBarActive: boolean
  readonly scrollBarHeight: number
  readonly searchId: number
  readonly searchResults: readonly any[]
  readonly stats: any
  readonly threads: number
  readonly uid: number
  readonly useRegularExpression: boolean
  readonly value: string
  readonly width: number
  readonly workspacePath: string
  readonly x: number
  readonly y: number
}
