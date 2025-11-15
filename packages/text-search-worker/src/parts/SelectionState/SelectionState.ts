interface Selection {
  readonly start: number
  readonly end: number
}

export interface SelectionState {
  readonly SearchValue: Selection
  readonly ReplaceValue: Selection
  readonly FilesToInclude: Selection
  readonly FilesToExclude: Selection
}
