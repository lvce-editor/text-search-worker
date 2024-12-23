import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as GetSearchDisplayResult from '../src/parts/GetSearchDisplayResult/GetSearchDisplayResult.ts'

test('getDisplayResult - file', () => {
  const result: SearchResult = {
    type: 1,
    start: 0,
    end: 0,
    lineNumber: 0,
    text: './languages/index.kt',
  }

  const itemHeight = 20
  const i = 0
  const replacement = ''
  const focusedIndex = -1
  const setSize = 1
  const searchTermLength = 1
  const fileIcons: readonly string[] = ['']
  const fileIconIndex = 0
  expect(
    GetSearchDisplayResult.getDisplayResult(result, fileIcons, fileIconIndex, itemHeight, i, setSize, searchTermLength, replacement, focusedIndex),
  ).toEqual({
    depth: 0,
    focused: false,
    icon: '',
    lineNumber: 0,
    matchCount: 0,
    matchLength: 0,
    matchStart: 0,
    posInSet: 1,
    replacement: '',
    setSize: 1,
    text: 'index.kt',
    title: '/languages/index.kt',
    top: 0,
    type: 1,
  })
})

test('getDisplayResult - result', () => {
  const result: SearchResult = {
    type: 2,
    start: 5,
    end: 6,
    lineNumber: 1,
    text: 'fun main(args : Array<String>) {',
  }
  const itemHeight = 20
  const i = 0
  const replacement = ''
  const focusedIndex = -1
  const setSize = 1
  const searchTermLength = 1
  const fileIcons: readonly string[] = []
  const fileIconIndex = 0
  expect(
    GetSearchDisplayResult.getDisplayResult(result, fileIcons, fileIconIndex, itemHeight, i, setSize, searchTermLength, replacement, focusedIndex),
  ).toEqual({
    depth: 1,
    focused: false,
    icon: '',
    lineNumber: 1,
    matchCount: 0,
    matchLength: 1,
    matchStart: 5,
    posInSet: 1,
    replacement: '',
    setSize: 1,
    text: 'fun main(args : Array<String>) {',
    title: 'fun main(args : Array<String>) {',
    top: 0,
    type: 2,
  })
})
