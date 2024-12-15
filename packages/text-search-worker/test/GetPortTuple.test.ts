import { expect, test } from '@jest/globals'
import * as GetPortTuple from '../src/parts/GetPortTuple/GetPortTuple.ts'

test('getPortTuple - creates message channel with two ports', () => {
  const { port1, port2 } = GetPortTuple.getPortTuple()
  expect(port1).toBeDefined()
  expect(port2).toBeDefined()
  expect(port1).toBeInstanceOf(MessagePort)
  expect(port2).toBeInstanceOf(MessagePort)
})

test('getPortTuple - ports are different instances', () => {
  const { port1, port2 } = GetPortTuple.getPortTuple()
  expect(port1).not.toBe(port2)
})

test('getPortTuple - creates new channel each time', () => {
  const first = GetPortTuple.getPortTuple()
  const second = GetPortTuple.getPortTuple()
  expect(first.port1).not.toBe(second.port1)
  expect(first.port2).not.toBe(second.port2)
})
