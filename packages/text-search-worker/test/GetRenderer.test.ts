import { expect, test } from '@jest/globals'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as GetRenderer from '../src/parts/GetRenderer/GetRenderer.ts'
import * as RenderFocus from '../src/parts/RenderFocus/RenderFocus.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'
import * as RenderValue from '../src/parts/RenderValue/RenderValue.ts'

test('getRenderer - focus type', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderFocus)
  expect(renderer).toBe(RenderFocus.renderFocus)
})

test('getRenderer - value type', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderValue)
  expect(renderer).toBe(RenderValue.renderValue)
})

test('getRenderer - items type', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderItems)
  expect(renderer).toBe(RenderItems.renderItems)
})

test('getRenderer - invalid type', () => {
  expect(() => GetRenderer.getRenderer(999)).toThrow('unknown renderer')
})
