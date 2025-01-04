export interface DisplaySearchResult {
  readonly title: string
  readonly text: string
  readonly icon: string
  readonly posInSet: number
  readonly setSize: number
  readonly lineNumber: number // TODO not needed
  readonly matchStart: number
  readonly matchLength: number
  readonly replacement: string
  readonly depth: number
  readonly matchCount: number

  // TODO maybe use a flags number instead of multiple booleans
  readonly focused: boolean
  readonly expanded: number
  readonly childCount: number
}
