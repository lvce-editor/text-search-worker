import { expect, test } from '@jest/globals'
import * as GetSearchDisplayResults from '../src/parts/GetSearchDisplayResults/GetSearchDisplayResults.ts'
import { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'

test('getDisplayResults', () => {
  const results: readonly SearchResult[] = [
    {
      type: 1,
      start: 0,
      end: 0,
      lineNumber: 0,
      text: './languages/index.kt',
    },
    {
      type: 2,
      start: 5,
      end: 6,
      lineNumber: 1,
      text: 'fun main(args : Array<String>) {',
    },
    {
      type: 2,
      start: 9,
      end: 10,
      lineNumber: 1,
      text: 'fun main(args : Array<String>) {',
    },
    {
      type: 2,
      start: 16,
      end: 17,
      lineNumber: 1,
      text: 'fun main(args : Array<String>) {',
    },
  ]
  const fileIcons: readonly string[] = []
  const itemHeight = 20
  const resultCount = 3
  const searchTerm = 'a'
  const minLineY = 0
  const maxLineY = 4
  const replacement = ''
  const collapsedPath: readonly string[] = []
  const focusedIndex = -1
  expect(
    GetSearchDisplayResults.getDisplayResults(
      results,
      itemHeight,
      resultCount,
      searchTerm,
      minLineY,
      maxLineY,
      replacement,
      collapsedPath,
      fileIcons,
      focusedIndex,
    ),
  ).toEqual([
    {
      depth: 0,
      focused: false,
      icon: '',
      lineNumber: 0,
      matchCount: 3,
      matchLength: 0,
      matchStart: 0,
      posInSet: 1,
      replacement: '',
      setSize: 3,
      text: 'index.kt',
      title: '/languages/index.kt',
      top: 0,
      type: 1,
    },
    {
      depth: 1,
      focused: false,
      icon: '',
      lineNumber: 1,
      matchCount: 0,
      matchLength: 1,
      matchStart: 5,
      posInSet: 2,
      replacement: '',
      setSize: 3,
      text: 'fun main(args : Array<String>) {',
      title: 'fun main(args : Array<String>) {',
      top: 20,
      type: 2,
    },
    {
      depth: 1,
      focused: false,
      icon: '',
      lineNumber: 1,
      matchCount: 0,
      matchLength: 1,
      matchStart: 9,
      posInSet: 3,
      replacement: '',
      setSize: 3,
      text: 'fun main(args : Array<String>) {',
      title: 'fun main(args : Array<String>) {',
      top: 40,
      type: 2,
    },
    {
      depth: 1,
      focused: false,
      icon: '',
      lineNumber: 1,
      matchCount: 0,
      matchLength: 1,
      matchStart: 16,
      posInSet: 4,
      replacement: '',
      setSize: 3,
      text: 'fun main(args : Array<String>) {',
      title: 'fun main(args : Array<String>) {',
      top: 60,
      type: 2,
    },
  ])
})
