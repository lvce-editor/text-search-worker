import { expect, test } from '@jest/globals'
import * as GetBulkReplacementEdits from '../src/parts/GetBulkReplacementEdits/GetBulkReplacementEdits.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'
import type { DisplaySearchResult } from '../src/parts/DisplaySearchResult/DisplaySearchResult.ts'

test('getBulkReplacementEdits', () => {
  const workspacePath = '/test'
  const matches: readonly DisplaySearchResult[] = [
    {
      type: TextSearchResultType.File,
      text: './file.txt',
      lineNumber: 0,
      matchLength: 0,
      matchStart: 0,
      title: '',
      depth: 0,
      focused: false,
      icon: '',
      matchCount: 0,
      posInSet: 0,
      replacement: '',
      setSize: 0,
      top: 0,
    },
    {
      type: TextSearchResultType.Match,
      title: '',
      lineNumber: 1,
      matchLength: 1,
      matchStart: 0,
      depth: 0,
      focused: false,
      icon: '',
      matchCount: 0,
      posInSet: 0,
      replacement: '',
      setSize: 0,
      top: 0,
      text: '',
    },
  ]
  expect(GetBulkReplacementEdits.getBulkReplacementEdits(workspacePath, matches)).toEqual({ files: ['/test/file.txt'], ranges: [4, 0, 0, 0, 1] })
})
