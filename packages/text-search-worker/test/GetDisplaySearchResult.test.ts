import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as GetSearchDisplayResult from '../src/parts/GetSearchDisplayResult/GetSearchDisplayResult.ts'

test('getDisplayResult - file', () => {
  const results: readonly SearchResult[] = [
    {
      type: 1,
      start: 0,
      end: 0,
      lineNumber: 0,
      text: './languages/index.kt',
    },
  ]

  const i = 0
  const replacement = ''
  const focusedIndex = -1
  const setSize = 1
  const searchTermLength = 1
  const fileIcons: readonly string[] = ['']
  const collapsedPaths: readonly string[] = []
  const minLineY = 0
  expect(
    GetSearchDisplayResult.getDisplayResult(results, fileIcons, i, setSize, searchTermLength, replacement, focusedIndex, collapsedPaths, minLineY),
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
    expanded: 2,
    childCount:4
  })
})

test('getDisplayResult - result', () => {
  const results: readonly SearchResult[] = [
    {
      type: 2,
      start: 5,
      end: 6,
      lineNumber: 1,
      text: 'fun main(args : Array<String>) {',
    },
  ]
  const i = 0
  const replacement = ''
  const focusedIndex = -1
  const setSize = 1
  const searchTermLength = 1
  const fileIcons: readonly string[] = []
  const collapsedPaths: readonly string[] = []
  const minLineY = 0
  expect(
    GetSearchDisplayResult.getDisplayResult(results, fileIcons, i, setSize, searchTermLength, replacement, focusedIndex, collapsedPaths, minLineY),
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
    expanded: 0,
    childCount: 2,
  })
})
