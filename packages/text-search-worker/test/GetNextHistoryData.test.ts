import { test, expect } from '@jest/globals'
import { getNextHistoryData } from '../src/parts/GetNextHistoryData/GetNextHistoryData.ts'

test('getNextHistoryData with empty history', () => {
  const result = getNextHistoryData([], 0)
  expect(result).toEqual({
    newValue: '',
    newHistoryIndex: -1,
  })
})

test('getNextHistoryData with historyIndex -1', () => {
  const result = getNextHistoryData(['test1', 'test2'], -1)
  expect(result).toEqual({
    newValue: '',
    newHistoryIndex: -1,
  })
})

test('getNextHistoryData with valid history and index', () => {
  const history = ['test1', 'test2', 'test3']
  const result = getNextHistoryData(history, 1)
  expect(result).toEqual({
    newValue: 'test2',
    newHistoryIndex: 2,
  })
})

test('getNextHistoryData with index at end of history', () => {
  const history = ['test1', 'test2']
  const result = getNextHistoryData(history, 1)
  expect(result).toEqual({
    newValue: 'test2',
    newHistoryIndex: 2,
  })
})

test('getNextHistoryData with index beyond history length', () => {
  const history = ['test1', 'test2']
  const result = getNextHistoryData(history, 5)
  expect(result).toEqual({
    newValue: '',
    newHistoryIndex: 6,
  })
})

test('getNextHistoryData with index 0', () => {
  const history = ['test1', 'test2', 'test3']
  const result = getNextHistoryData(history, 0)
  expect(result).toEqual({
    newValue: 'test1',
    newHistoryIndex: 1,
  })
})