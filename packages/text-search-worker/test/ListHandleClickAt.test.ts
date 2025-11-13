import { test, expect } from '@jest/globals'
import { IconThemeWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickAt } from '../src/parts/ListHandleClickAt/ListHandleClickAt.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

// Helper to create a state with listItems
const createState = (listItemsLength: number): SearchState => {
  const state = CreateDefaultState.createDefaultState()
  const listItems = Array.from({ length: listItemsLength }, (_, i): any => ({
    end: 0,
    lineNumber: 0,
    start: 0,
    text: `file${i}`,
    type: TextSearchResultType.File,
  }))
  return {
    ...state,
    x: 0,
    y: 0,
    itemHeight: 20,
    deltaY: 0,
    flags: 0,
    listItems,
  }
}

test('handleClickAt selects the correct index', async () => {
  IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['file-icon'],
  })

  const state = createState(10)
  // Click at y=101 should select index 2 (itemHeight=20, topHeight=61)
  const result = await handleClickAt(state, 10, 101, '')
  expect(result.listFocusedIndex).toBe(2)
})

test('handleClickAt with click above list', async () => {
  const state = createState(10)
  // Click at y=50 should select index -1 (above list area)
  const result = await handleClickAt(state, 10, 50, '')
  expect(result.listFocusedIndex).toBe(-1)
})

test('handleClickAt with click below list', async () => {
  const state = createState(5)
  // Click at y=61+5*20=161 should select index -1 (below list area)
  const result = await handleClickAt(state, 10, 161, '')
  expect(result.listFocusedIndex).toBe(-1)
})

test('handleClickAt with empty list', async () => {
  const state = createState(0)
  const result = await handleClickAt(state, 10, 71, '')
  expect(result.listFocusedIndex).toBe(-1)
})
