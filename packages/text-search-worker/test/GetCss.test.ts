import { expect, test } from '@jest/globals'
import { getCss } from '../src/parts/GetCss/GetCss.ts'

test('getCss - returns base css variables when there are no indents', () => {
  const result = getCss(24, [], [], 90, 12, 0)
  expect(result).toContain('.Search {')
  expect(result).toContain('--ScrollBarHeight: 90px;')
  expect(result).toContain('--ScrollBarTop: 12px;')
  expect(result).toContain('--TreeItemsTop: 24px;')
  expect(result).toContain('.TreeItemsTop-0 {')
  expect(result).toContain('top: 0px;')
})

test('getCss - returns css variables and indent rules', () => {
  const result = getCss(0, [16, 28], [12], 44, 6, -3)
  expect(result).toContain('.Search {')
  expect(result).toContain('--ScrollBarHeight: 44px;')
  expect(result).toContain('--ScrollBarTop: 6px;')
  expect(result).toContain('--TreeItemsTop: 0px;')
  expect(result).toContain('.Indent-16 {')
  expect(result).toContain('padding-left: 16px;')
  expect(result).toContain('.Indent-28 {')
  expect(result).toContain('padding-left: 28px;')
  expect(result).toContain('.IndentRight-12 {')
  expect(result).toContain('padding-right: 12px;')
  expect(result).toContain('.TreeItemsTop--3 {')
  expect(result).toContain('top: -3px;')
})
