import { expect, jest, test } from '@jest/globals'

const mockEventListener = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}

test('listen - adds event listener', () => {
  const { listen } = require('../src/parts/Listen/Listen.ts')
  const type = 'click'
  const listener = jest.fn()

  listen(mockEventListener, type, listener)

  expect(mockEventListener.addEventListener).toHaveBeenCalledWith(type, listener)
  expect(mockEventListener.removeEventListener).not.toHaveBeenCalled()
})

test('listen - cleanup removes event listener', () => {
  const { listen } = require('../src/parts/Listen/Listen.ts')
  const type = 'click'
  const listener = jest.fn()

  const cleanup = listen(mockEventListener, type, listener)
  cleanup()

  expect(mockEventListener.removeEventListener).toHaveBeenCalledWith(type, listener)
})

test('listen - cleanup can be called multiple times', () => {
  const { listen } = require('../src/parts/Listen/Listen.ts')
  const type = 'click'
  const listener = jest.fn()

  const cleanup = listen(mockEventListener, type, listener)
  cleanup()
  cleanup()

  expect(mockEventListener.removeEventListener).toHaveBeenCalledTimes(1)
})
