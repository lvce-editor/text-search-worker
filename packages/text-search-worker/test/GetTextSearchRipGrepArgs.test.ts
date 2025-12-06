import { expect, test } from '@jest/globals'
import * as GetTextSearchRipGrepArgs from '../src/parts/GetTextSearchRipGrepArgs/GetTextSearchRipGrepArgs.ts'

test('getRipGrepArgs - threads', () => {
  expect(
    GetTextSearchRipGrepArgs.getRipGrepArgs({
      isCaseSensitive: false,
      searchString: 'test',
      threads: 1,
      useRegularExpression: false,
    }),
  ).toEqual([
    '--hidden',
    '--no-require-git',
    '--smart-case',
    '--stats',
    '--json',
    '--threads',
    '1',
    '--ignore-case',
    '--fixed-strings',
    '--',
    'test',
    '.',
  ])
})

test('getRipGrepArgs - isCaseSensitive', () => {
  expect(
    GetTextSearchRipGrepArgs.getRipGrepArgs({
      isCaseSensitive: true,
      searchString: 'test',
      threads: 1,
      useRegularExpression: false,
    }),
  ).toEqual([
    '--hidden',
    '--no-require-git',
    '--smart-case',
    '--stats',
    '--json',
    '--threads',
    '1',
    '--case-sensitive',
    '--fixed-strings',
    '--',
    'test',
    '.',
  ])
})

test('getRipGrepArgs - useRegularExpression', () => {
  expect(
    GetTextSearchRipGrepArgs.getRipGrepArgs({
      isCaseSensitive: false,
      searchString: 'test',
      threads: 1,
      useRegularExpression: true,
    }),
  ).toEqual(['--hidden', '--no-require-git', '--smart-case', '--stats', '--json', '--threads', '1', '--ignore-case', '--regexp', 'test', '.'])
})
