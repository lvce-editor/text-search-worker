import * as CreateHeader from '../CreateHeader/CreateHeader.ts'
import * as Height from '../Height/Height.ts'
import * as MinimumSliderSize from '../MinimumSliderSize/MinimumSliderSize.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'
import * as VirtualList from '../VirtualList/VirtualList.ts'

export const create = (uid: number, x: number, y: number, width: number, height: number, workspacePath: string, assetDir: string): SearchState => {
  const state: SearchState = {
    uid,
    ...VirtualList.create({
      itemHeight: Height.ListItem,
      minimumSliderSize: MinimumSliderSize.minimumSliderSize,
      headerHeight: 61, // TODO
      x,
      y,
      width,
      height,
      workspacePath,
      assetDir,
    }),
    ...CreateHeader.createHeader(),
  }
  SearchViewStates.set(uid, state, state)
  return state
}
