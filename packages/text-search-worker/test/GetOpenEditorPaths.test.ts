import { expect, test } from '@jest/globals'
import * as GetOpenEditorPaths from '../src/parts/GetOpenEditorPaths/GetOpenEditorPaths.ts'

test('getOpenEditorPaths - returns unique workspace-relative file paths', () => {
  expect(
    GetOpenEditorPaths.getOpenEditorPaths('file:///workspace', [
      'file:///workspace/src/app.ts',
      'file:///workspace/docs/guide%20one.md',
      'file:///workspace/src/app.ts',
      'search-editor://1/Search',
      'file:///other/outside.ts',
    ]),
  ).toEqual(['src/app.ts', 'docs/guide one.md'])
})

test('getOpenEditorPaths - supports plain and Windows paths', () => {
  expect(GetOpenEditorPaths.getOpenEditorPaths('/workspace/', ['/workspace/src/app.ts'])).toEqual(['src/app.ts'])
  expect(GetOpenEditorPaths.getOpenEditorPaths('file:///C:/workspace', ['file:///C:/workspace/src/app.ts'])).toEqual(['src/app.ts'])
  expect(GetOpenEditorPaths.getOpenEditorPaths('C:\\workspace', ['C:\\workspace\\src\\app.ts'])).toEqual(['src/app.ts'])
})
