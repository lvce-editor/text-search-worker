import { beforeEach, expect, test } from '@jest/globals'
import type { TextSearchCompletionResult } from '../src/parts/TextSearchCompletionResult/TextSearchCompletionResult.ts'
import type { TextSearchProvider } from '../src/parts/TextSearchProvider/TextSearchProvider.ts'
import * as TextSearchProviders from '../src/parts/TextSearchProviders/TextSearchProviders.ts'

const providerA: TextSearchProvider = async (): Promise<TextSearchCompletionResult> => ({
  limitHit: false,
  results: [],
})

const providerB: TextSearchProvider = async (): Promise<TextSearchCompletionResult> => ({
  limitHit: false,
  results: [
    {
      end: 0,
      lineNumber: 0,
      start: 0,
      text: 'match',
      type: 1,
    },
  ],
})

beforeEach(() => {
  TextSearchProviders.reset()
})

test('add - adds providers and get retrieves them', () => {
  TextSearchProviders.add({
    default: providerA,
    test: providerB,
  })

  expect(TextSearchProviders.get('test')).toBe(providerB)
  expect(TextSearchProviders.get('missing')).toBe(providerA)
})

test('set - replaces existing providers', () => {
  TextSearchProviders.add({
    alternate: providerB,
  })

  TextSearchProviders.set({
    default: providerB,
  })

  expect(TextSearchProviders.get('alternate')).toBe(providerB)
  expect(TextSearchProviders.get('')).toBe(providerB)
})

test('reset - clears providers', () => {
  TextSearchProviders.set({
    default: providerA,
  })

  TextSearchProviders.reset()

  expect(TextSearchProviders.get('default')).toBeUndefined()
  expect(TextSearchProviders.get('anything')).toBeUndefined()
})
