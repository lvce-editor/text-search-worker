import { expect, test } from '@jest/globals'
import * as Workspace from '../src/parts/Workspace/Workspace.ts'

test('pathBaseName - extracts file name from path', () => {
  expect(Workspace.pathBaseName('/test/file.txt')).toBe('file.txt')
  expect(Workspace.pathBaseName('file.txt')).toBe('file.txt')
  expect(Workspace.pathBaseName('/deep/nested/path/file.txt')).toBe('file.txt')
})

test('getRelativePath - handles path starting with ./', () => {
  expect(Workspace.getRelativePath('./file.txt')).toBe('/file.txt')
  expect(Workspace.getRelativePath('./folder/file.txt')).toBe('/folder/file.txt')
})

test('getRelativePath - handles path without ./', () => {
  expect(Workspace.getRelativePath('file.txt')).toBe('/file.txt')
  expect(Workspace.getRelativePath('folder/file.txt')).toBe('/folder/file.txt')
})
