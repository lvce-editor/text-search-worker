import { expect, test } from '@jest/globals'
import * as TextSearchProvider from '../src/parts/TextSearchProvider/TextSearchProvider.ts'
import * as TextSearchNode from '../src/parts/TextSearchNode/TextSearchNode.ts'
import * as TextSearchWeb from '../src/parts/TextSearchWeb/TextSearchWeb.ts'
import * as TextSearchFetch from '../src/parts/TextSearchFetch/TextSearchFetch.ts'
import * as TextSearchHtml from '../src/parts/TextSearchHtml/TextSearchHtml.ts'
import * as TextSearchExtension from '../src/parts/TextSearchExtension/TextSearchExtension.ts'

test('getProvider - empty scheme returns node search', () => {
  expect(TextSearchProvider.getProvider('')).toBe(TextSearchNode.textSearch)
})

test('getProvider - web scheme returns web search', () => {
  expect(TextSearchProvider.getProvider('web')).toBe(TextSearchWeb.textSearch)
})

test('getProvider - fetch scheme returns fetch search', () => {
  expect(TextSearchProvider.getProvider('fetch')).toBe(TextSearchFetch.textSearch)
})

test('getProvider - html scheme returns html search', () => {
  expect(TextSearchProvider.getProvider('html')).toBe(TextSearchHtml.textSearch)
})

test('getProvider - unknown scheme returns extension search', () => {
  expect(TextSearchProvider.getProvider('xyz')).toBe(TextSearchExtension.textSearch)
})
