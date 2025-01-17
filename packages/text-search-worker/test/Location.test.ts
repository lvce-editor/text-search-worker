// tests/Location.test.ts
import { test, expect } from '@jest/globals'
import * as Location from '../src/parts/Location/Location.ts'

test('getHost - returns location.host', () => {
  // Mock the global location object
  const originalLocation = globalThis.location
  // @ts-ignore
  globalThis.location = {
    host: 'example.com:8080',
  }

  expect(Location.getHost()).toBe('example.com:8080')

  // Restore original location
  globalThis.location = originalLocation
})

test('getProtocol - returns location.protocol', () => {
  // Mock the global location object
  const originalLocation = globalThis.location
  // @ts-ignore
  globalThis.location = {
    protocol: 'https:',
  }

  expect(Location.getProtocol()).toBe('https:')

  // Restore original location
  globalThis.location = originalLocation
})
