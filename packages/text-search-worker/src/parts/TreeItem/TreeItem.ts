export interface TreeItem {
  readonly label: string
  readonly uri: string
  readonly depth: number
  readonly selected: boolean
  readonly posInSet: number
  readonly setSize: number
  readonly icon: string
}
