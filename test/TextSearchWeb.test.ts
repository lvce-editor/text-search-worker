import { beforeEach, expect, test } from '@jest/globals'
import * as TextSearchWeb from '../src/parts/TextSearchWeb/TextSearchWeb.ts'

beforeEach(() => {})

test.skip('textSearch', async () => {
  expect(TextSearchWeb.textSearch('', '', 'val')).toEqual([
    [
      './index.txt',
      [
        {
          absoluteOffset: 0,
          preview: 'value',
        },
      ],
    ],
  ])
})
