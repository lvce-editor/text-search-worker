import type { SearchState } from '../SearchState/SearchState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as MinimumSliderSize from '../MinimumSliderSize/MinimumSliderSize.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'
import * as VirtualList from '../VirtualList/VirtualList.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const create = (
  uid: number,
  x: number,
  y: number,
  width: number,
  height: number,
  workspacePath: string,
  assetDir: string,
  itemHeight?: number,
  value: string = '',
  replacement: string = '',
  platform?: number,
): SearchState => {
  const state: SearchState = {
    uid,
    searchResults: [],
    stats: {},
    searchId: -1,
    value,
    disposed: false,
    fileCount: 0,
    x,
    y,
    width,
    height,
    ...VirtualList.create({
      itemHeight: itemHeight || 22,
      minimumSliderSize: MinimumSliderSize.minimumSliderSize,
      headerHeight: 61, // TODO
    }),
    threads: 0,
    replacement,
    matchCount: 0,
    listFocused: false,
    listFocusedIndex: -1,
    inputSource: InputSource.User,
    workspacePath: workspacePath,
    includeValue: '',
    excludeValue: '',
    focus: WhenExpression.Empty,
    loaded: false,
    message: '',
    collapsedPaths: [],
    icons: [],
    assetDir,
    deltaY: 0,
    finalDeltaY: 0,
    focused: false,
    focusedIndex: -1,
    handleOffset: 0,
    focusSource: InputSource.User,
    flags: 0,
    platform,
    searchInputErrorMessage: '',
    history: [],
    historyIndex: -1,
  }
  SearchViewStates.set(uid, state, state)
  return state
}
