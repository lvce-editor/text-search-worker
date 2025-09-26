import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as GetSearchDisplayResults from '../src/parts/GetSearchDisplayResults/GetSearchDisplayResults.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

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
  const fileIcons: readonly string[] = ['']
  const itemHeight = 20
  const resultCount = 3
  const searchTerm = 'a'
  const minLineY = 0
  const maxLineY = 4
  const replacement = ''
  const focusedIndex = -1
  const collapsedPaths: readonly string[] = []
  expect(
    GetSearchDisplayResults.getDisplayResults(
      results,
      itemHeight,
      resultCount,
      searchTerm,
      minLineY,
      maxLineY,
      replacement,
      fileIcons,
      focusedIndex,
      collapsedPaths,
      results,
    ),
  ).toEqual([
    {
      badgeText: '3',
      depth: 0,
      focused: false,
      icon: '',
      matchLength: 0,
      matchStart: 0,
      posInSet: 1,
      replacement: '',
      setSize: 3,
      text: 'index.kt',
      title: '/languages/index.kt',
      expanded: 2,
    },
    {
      depth: 1,
      focused: false,
      icon: '',
      badgeText: '',
      matchLength: 1,
      matchStart: 5,
      posInSet: 2,
      replacement: '',
      setSize: 3,
      text: 'fun main(args : Array<String>) {',
      title: 'fun main(args : Array<String>) {',
      expanded: 0,
    },
    {
      depth: 1,
      focused: false,
      icon: '',
      badgeText: '',
      matchLength: 1,
      matchStart: 9,
      posInSet: 3,
      replacement: '',
      setSize: 3,
      text: 'fun main(args : Array<String>) {',
      title: 'fun main(args : Array<String>) {',
      expanded: 0,
    },
    {
      depth: 1,
      focused: false,
      icon: '',
      badgeText: '',
      matchLength: 1,
      matchStart: 16,
      posInSet: 4,
      replacement: '',
      setSize: 3,
      text: 'fun main(args : Array<String>) {',
      title: 'fun main(args : Array<String>) {',
      expanded: 0,
    },
  ])
})

test('getDisplayResults - should not show child items when parent file is collapsed', () => {
  const results: readonly SearchResult[] = [
    {
      type: TextSearchResultType.File,
      start: 0,
      end: 0,
      lineNumber: 0,
      text: './file1.txt',
    },
    {
      type: TextSearchResultType.Match,
      start: 5,
      end: 6,
      lineNumber: 1,
      text: 'match1 in file1',
    },
    {
      type: TextSearchResultType.Match,
      start: 9,
      end: 10,
      lineNumber: 2,
      text: 'match2 in file1',
    },
    {
      type: TextSearchResultType.File,
      start: 0,
      end: 0,
      lineNumber: 3,
      text: './file2.txt',
    },
    {
      type: TextSearchResultType.Match,
      start: 5,
      end: 6,
      lineNumber: 4,
      text: 'match1 in file2',
    },
  ]
  const fileIcons: readonly string[] = ['', '']
  const itemHeight = 20
  const resultCount = 3 // Only file1.txt and file2.txt should be counted, plus file2.txt's match
  const searchTerm = 'a'
  const minLineY = 0
  const maxLineY = 3 // Only show file1.txt, file2.txt, and file2.txt's match
  const replacement = ''
  const focusedIndex = -1
  const collapsedPaths: readonly string[] = ['./file1.txt'] // file1.txt is collapsed
  const originalResults = results

  const displayResults = GetSearchDisplayResults.getDisplayResults(
    results, // This should be the filtered results, but currently it's not
    itemHeight,
    resultCount,
    searchTerm,
    minLineY,
    maxLineY,
    replacement,
    fileIcons,
    focusedIndex,
    collapsedPaths,
    originalResults,
  )

  // Should only show file1.txt (collapsed) and file2.txt with its match
  // Should NOT show matches from file1.txt since it's collapsed
  expect(displayResults).toHaveLength(3)
  expect(displayResults[0].text).toBe('file1.txt')
  expect(displayResults[0].expanded).toBe(1) // Collapsed
  expect(displayResults[1].text).toBe('file2.txt')
  expect(displayResults[1].expanded).toBe(2) // Expanded
  expect(displayResults[2].text).toBe('match1 in file2')
})
