import { expect, test } from '@jest/globals'
import { getNewTextCut } from '../src/parts/GetNewTextCut/GetNewTextCut.ts'

test('getNewTextCut - cuts text from middle', () => {
  const result = getNewTextCut('hello world', 6, 11)
  expect(result).toEqual({
    newText: 'hello ',
    cutText: 'world',
  })
})

test('getNewTextCut - cuts text from start', () => {
  const result = getNewTextCut('hello world', 0, 5)
  expect(result).toEqual({
    newText: ' world',
    cutText: 'hello',
  })
})

test('getNewTextCut - cuts text from end', () => {
  const result = getNewTextCut('hello world', 6, 11)
  expect(result).toEqual({
    newText: 'hello ',
    cutText: 'world',
  })
})

test('getNewTextCut - empty selection returns same text', () => {
  const result = getNewTextCut('hello world', 5, 5)
  expect(result).toEqual({
    newText: 'hello world',
    cutText: '',
  })
})

test('getNewTextCut - selection covering entire text', () => {
  const result = getNewTextCut('hello', 0, 5)
  expect(result).toEqual({
    newText: '',
    cutText: 'hello',
  })
})

test('getNewTextCut - empty text with empty selection', () => {
  const result = getNewTextCut('', 0, 0)
  expect(result).toEqual({
    newText: '',
    cutText: '',
  })
})

test('getNewTextCut - single character selection', () => {
  const result = getNewTextCut('hello', 2, 3)
  expect(result).toEqual({
    newText: 'helo',
    cutText: 'l',
  })
})

test('getNewTextCut - multiple character selection', () => {
  const result = getNewTextCut('the quick brown fox', 4, 9)
  expect(result).toEqual({
    newText: 'the  brown fox',
    cutText: 'quick',
  })
})
