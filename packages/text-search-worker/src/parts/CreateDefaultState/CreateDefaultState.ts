import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as MinimumSliderSize from '../MinimumSliderSize/MinimumSliderSize.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as ViewMode from '../ViewMode/ViewMode.ts'
import * as VirtualList from '../VirtualList/VirtualList.ts'

export const createDefaultState = (): SearchState => {
  const virtualList = VirtualList.create({
    itemHeight: 22,
    minimumSliderSize: MinimumSliderSize.minimumSliderSize,
    headerHeight: 61, // TODO
  })
  const height = 0
  const headerHeight = 61
  const deltaY = 0
  const finalDeltaY = 0
  const { scrollBarHeight } = virtualList
  const scrollBarY = finalDeltaY === 0 ? 0 : ScrollBarFunctions.getScrollBarY(deltaY, finalDeltaY, height - headerHeight, scrollBarHeight)
  const state: SearchState = {
    uid: 0,
    searchResults: [],
    stats: {},
    value: '',
    disposed: false,
    fileCount: 0,
    x: 0,
    y: 0,
    width: 0,
    height,
    ...virtualList,
    threads: 0,
    replacement: '',
    matchCount: 0,
    listFocused: false,
    listFocusedIndex: -1,
    inputSource: InputSource.User,
    workspacePath: '',
    includeValue: '',
    excludeValue: '',
    focus: WhenExpression.Empty,
    loaded: false,
    message: '',
    collapsedPaths: [],
    icons: [],
    assetDir: '',
    deltaY,
    finalDeltaY,
    focused: false,
    focusedIndex: -1,
    handleOffset: 0,
    focusSource: InputSource.User,
    flags: 0,
    platform: 0,
    searchInputErrorMessage: '',
    history: [],
    historyIndex: -1,
    viewMode: ViewMode.List,
    incrementalSearch: false,
    searchId: '',
    useChevrons: true,
    useFileIcons: true,
    limitHit: false,
    limitHitWarning: '',
    limit: 20_000,
    fileIconCache: {},
    scrollBarY,
  }
  return state
}
