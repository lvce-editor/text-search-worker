import { expect, test } from '@jest/globals'
import * as ToGlob from '../src/parts/ToGlob/ToGlob.ts'

test('toGlob - adds a recursive glob for a trailing slash', () => {
  expect(ToGlob.toGlob('src/')).toEqual(['--glob', 'src/', '--glob', 'src/**'])
})

test('toGlob - preserves an empty pattern without adding a recursive glob', () => {
  expect(ToGlob.toGlob('')).toEqual(['--glob', ''])
})
