import { test, expect } from '@jest/globals'
import { openDB } from '../src/parts/Idb/Idb.ts'

test('exports openDB function', () => {
  expect(openDB).toBeDefined()
  expect(typeof openDB).toBe('function')
})
