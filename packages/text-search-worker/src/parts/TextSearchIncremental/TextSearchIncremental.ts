import type { SearchState } from '../SearchState/SearchState.ts'
import type { TextSearchOptions } from '../TextSearchOptions/TextSearchOptions.ts'
import * as Assert from '../Assert/Assert.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as GetTextSearchRipGrepArgs from '../GetTextSearchRipGrepArgs/GetTextSearchRipGrepArgs.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'
import * as SearchProcess from '../SearchProcess/SearchProcess.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'
import { waitForNextFrame } from '../WaitForNextFrame/WaitForNextFrame.ts'

export const textSearchIncremental = async (
  root: string,
  query: string,
  options: TextSearchOptions,
  assetDir: string,
  platform: number,
  searchId: string,
  uid: number,
): Promise<void> => {
  Assert.string(root)
  Assert.string(query)
  const ripGrepArgs = GetTextSearchRipGrepArgs.getRipGrepArgs({
    ...options,
    searchString: query,
  })
  const actualOptions = {
    ripGrepArgs,
    searchDir: root,
    id: searchId,
  }

  const resultPromise = SearchProcess.invoke('TextSearch.searchIncremental', actualOptions)
  for (let i = 0; i < 100; i++) {
    const latest = SearchViewStates.get(uid)
    const { newState } = latest
    const { minLineY, height, headerHeight, itemHeight } = newState
    const listHeight = height - headerHeight
    const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
    const visible = await SearchProcess.invoke('TextSearch.getIncrementalResults', searchId, minLineY, minLineY + numberOfVisible)
    const latest2 = SearchViewStates.get(uid)
    if (!latest2 || latest2.newState.searchId !== searchId) {
      return
    }
    const updatedState2: SearchState = {
      ...latest2.newState,
      items: visible,
      listItems: visible,
      minLineY: 0,
      maxLineY: visible.length,
    }
    SearchViewStates.set(uid, latest2.oldState, updatedState2)
    // @ts-ignore
    await RendererWorker.invoke('Search.rerender')
    await waitForNextFrame()
  }
  await resultPromise
}
