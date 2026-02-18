import { expect, test } from '@jest/globals'
import { getCss } from '../src/parts/GetCss/GetCss.ts'

test('getCss - returns base css variables when there are no indents', () => {
  const result = getCss(24, [], 90, 12)
  expect(result).toBe(`.Search {
  --ScrollBarHeight: 90px;
  --ScrollBarTop: 12px;
  --TreeItemsTop: 24px;
}
  `)
})

test('getCss - returns css variables and indent rules', () => {
  const result = getCss(0, [16, 28], 44, 6)
  expect(result).toBe(`.Search {
  --ScrollBarHeight: 44px;
  --ScrollBarTop: 6px;
  --TreeItemsTop: 0px;
}

.Indent-16 {
  padding-left: 16px;
}
.Indent-28 {
  padding-left: 28px;
}`)
})
