import { expect, test } from '@jest/globals'
import * as Path from '../src/parts/Path/Path.ts'

test('dirname - file without slash', () => {
  const pathSeparator = '/'
  const path = 'abc'
  expect(Path.dirname(pathSeparator, path)).toBe('abc')
})

test('dirname - file with slash', () => {
  const pathSeparator = '/'
  const path = '/test/abc'
  expect(Path.dirname(pathSeparator, path)).toBe('/test')
})
