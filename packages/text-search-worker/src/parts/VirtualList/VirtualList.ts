import type { SearchList } from '../SearchList/SearchList.ts'

export const create = ({
  itemHeight,
  headerHeight = 0,
  minimumSliderSize = 20,
  x,
  y,
  width,
  height,
  workspacePath,
  assetDir,
}: {
  itemHeight: number
  headerHeight: number
  minimumSliderSize: number
  x: number
  y: number
  width: number
  height: number
  workspacePath: string
  assetDir: string
}): SearchList => {
  const state: SearchList = {
    deltaY: 0,
    minLineY: 0,
    maxLineY: 0,
    finalDeltaY: 0,
    itemHeight,
    headerHeight,
    items: [],
    minimumSliderSize,
    focusedIndex: -1,
    touchOffsetY: 0,
    touchTimeStamp: 0,
    touchDifference: 0,
    scrollBarHeight: 0,
    scrollBarActive: false,
    searchResults: [],
    stats: {},
    searchId: -1,
    fileCount: 0,
    x,
    y,
    width,
    height,
    threads: 0,
    matchCount: 0,
    listFocused: false,
    listFocusedIndex: -1,
    workspacePath: workspacePath,
    loaded: false,
    message: '',
    collapsedPaths: [],
    icons: [],
    assetDir,
    handleOffset: 0,
  }
  return state
}
