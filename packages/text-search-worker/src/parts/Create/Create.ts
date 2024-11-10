import * as Height from '../Height/Height.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as MinimumSliderSize from '../MinimumSliderSize/MinimumSliderSize.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'
import * as VirtualList from '../VirtualList/VirtualList.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const create = (uid: number, x: number, y: number, width: number, height: number, workspacePath: string) => {
  const state = {
    uid,
    searchResults: [],
    stats: {},
    searchId: -1,
    value: '',
    disposed: false,
    fileCount: 0,
    x,
    y,
    width,
    height,
    ...VirtualList.create({
      itemHeight: Height.ListItem,
      minimumSliderSize: MinimumSliderSize.minimumSliderSize,
      headerHeight: 61, // TODO
    }),
    threads: 0,
    replaceExpanded: false,
    useRegularExpression: false,
    matchCase: false,
    matchWholeWord: false,
    replacement: '',
    matchCount: 0,
    listFocused: false,
    listFocusedIndex: -1,
    inputSource: InputSource.User,
    workspacePath: workspacePath,
    includeValue: '',
    excludeValue: '',
    detailsExpanded: false,
    focus: WhenExpression.Empty,
    loaded: false,
    message: '',
    collapsedPaths: [],
  }
  SearchViewStates.set(uid, state)
}