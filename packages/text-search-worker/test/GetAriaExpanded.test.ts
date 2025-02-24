import { expect, test } from '@jest/globals'
import * as GetAriaExpanded from '../src/parts/GetAriaExpanded/GetAriaExpanded.ts'
import * as ExpandedType from '../src/parts/ExpandedType/ExpandedType.ts'

test('getAriaExpanded - collapsed', () => {
  expect(GetAriaExpanded.getAriaExpanded(ExpandedType.Collapsed)).toBe('false')
})

test('getAriaExpanded - expanded', () => {
  expect(GetAriaExpanded.getAriaExpanded(ExpandedType.Expanded)).toBe('true')
})

test('getAriaExpanded - undefined for unknown value', () => {
  expect(GetAriaExpanded.getAriaExpanded(-1)).toBe(undefined)
})
