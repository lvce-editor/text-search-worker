import { expect, jest, test, beforeEach } from '@jest/globals'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

const mockGetSearchDisplayResults = {
  getDisplayResults: jest.fn(),
}

const mockGetSearchVirtualDom = {
  getSearchVirtualDom: jest.fn(),
}

const mockGetFocusSelector = {
  getFocusSelector: jest.fn(),
}

const mockSearchViewStates = {
  get: jest.fn(),
}

jest.unstable_mockModule('../src/parts/GetSearchDisplayResults/GetSearchDisplayResults.ts', () => mockGetSearchDisplayResults)
jest.unstable_mockModule('../src/parts/GetSearchVirtualDom/GetSearchVirtualDom.ts', () => mockGetSearchVirtualDom)
jest.unstable_mockModule('../src/parts/GetFocusSelector/GetFocusSelector.ts', () => mockGetFocusSelector)
jest.unstable_mockModule('../src/parts/SearchViewStates/SearchViewStates.ts', () => mockSearchViewStates)

const Render = await import('../src/parts/Render/Render.ts')

beforeEach(() => {
  jest.resetAllMocks()
})

test('doRender - no changes returns empty commands', () => {
  const oldState = {
    items: [],
    minLineY: 0,
    maxLineY: 0,
    replacement: '',
    flags: 0,
    message: '',
    loaded: false,
    collapsedPaths: [],
    listFocusedIndex: -1,
    listFocused: false,
    icons: [],
    value: '',
    includeValue: '',
    excludeValue: '',
    focus: '',
    focusSource: InputSource.Script,
    inputSource: InputSource.Script,
  }
  mockSearchViewStates.get.mockReturnValue({ oldState, newState: oldState })

  const commands = Render.doRender(1)
  expect(commands).toEqual([])
})

test('doRender - renders items when changed', () => {
  const oldState = {
    items: [],
    minLineY: 0,
    maxLineY: 0,
    replacement: '',
    flags: 0,
    message: '',
    loaded: false,
    collapsedPaths: [],
    listFocusedIndex: -1,
    listFocused: false,
    icons: [],
    value: '',
    includeValue: '',
    excludeValue: '',
    focus: '',
    focusSource: InputSource.Script,
    inputSource: InputSource.Script,
  }
  const newState = {
    ...oldState,
    items: ['item1'],
    uid: 1,
    itemHeight: 22,
    fileCount: 1,
    value: 'test',
    listItems: ['item1'],
  }
  mockSearchViewStates.get.mockReturnValue({ oldState, newState })
  mockGetSearchDisplayResults.getDisplayResults.mockReturnValue(['displayResult1'])
  mockGetSearchVirtualDom.getSearchVirtualDom.mockReturnValue(['virtualDom1'])

  const commands = Render.doRender(1)
  expect(commands).toEqual([['Viewlet.setDom2', 1, ['virtualDom1']]])
})

test('doRender - renders focus when changed', () => {
  const oldState = {
    items: [],
    minLineY: 0,
    maxLineY: 0,
    replacement: '',
    flags: 0,
    message: '',
    loaded: false,
    collapsedPaths: [],
    listFocusedIndex: -1,
    listFocused: false,
    icons: [],
    value: '',
    includeValue: '',
    excludeValue: '',
    focus: '',
    focusSource: InputSource.Script,
    inputSource: InputSource.Script,
  }
  const newState = {
    ...oldState,
    focus: 'newFocus',
    focusSource: InputSource.Script,
  }
  mockSearchViewStates.get.mockReturnValue({ oldState, newState })
  mockGetFocusSelector.getFocusSelector.mockReturnValue('focusSelector')

  const commands = Render.doRender(1)
  expect(commands).toEqual([['Viewlet.focusElementByName', 'focusSelector']])
})

test('doRender - renders value when changed', () => {
  const oldState = {
    items: [],
    minLineY: 0,
    maxLineY: 0,
    replacement: '',
    flags: 0,
    message: '',
    loaded: false,
    collapsedPaths: [],
    listFocusedIndex: -1,
    listFocused: false,
    icons: [],
    value: '',
    includeValue: '',
    excludeValue: '',
    focus: '',
    focusSource: InputSource.Script,
    inputSource: InputSource.Script,
  }
  const newState = {
    ...oldState,
    value: 'newValue',
    uid: 1,
    inputSource: InputSource.Script,
  }
  mockSearchViewStates.get.mockReturnValue({ oldState, newState })

  const commands = Render.doRender(1)
  expect(commands).toEqual([['Viewlet.send', 1, 'setValue', 'newValue', '[name="search-value"]']])
})
