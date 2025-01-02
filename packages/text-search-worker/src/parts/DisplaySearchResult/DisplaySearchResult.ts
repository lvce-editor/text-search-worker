export interface DisplaySearchResult {
  readonly title: string
  readonly type: number
  readonly text: string
  readonly icon: string
  readonly posInSet: number
  readonly setSize: number
  readonly top: number
  readonly lineNumber: number
  readonly matchStart: number
  readonly matchLength: number
  readonly replacement: string
  readonly depth: number
  readonly matchCount: number
  readonly focused: boolean
  readonly expanded: boolean
}
