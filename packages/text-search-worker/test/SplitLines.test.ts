import { expect, test } from '@jest/globals'
import * as SplitLines from '../src/parts/SplitLines/SplitLines.ts'

test('splitLines', () => {
  const lines = 'a\nb'
  expect(SplitLines.splitLines(lines)).toEqual(['a', 'b'])
})
