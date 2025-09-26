import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import * as GetSearchFieldVirtualDom from '../src/parts/GetSearchFieldVirtualDom/GetSearchFieldVirtualDom.ts'

test('NotReadableError', () => {
  const name = ''
  const placeholder = ''
  const onInput = 'handleInput'
  const insideButtons: any = []
  const outsideButtons: any = []
  const onFocus = ''
  expect(GetSearchFieldVirtualDom.getSearchFieldVirtualDom(name, placeholder, onInput, insideButtons, outsideButtons, onFocus)).toEqual([
    {
      childCount: 2,
      className: 'SearchField',
      role: AriaRoles.None,
      type: 4,
    },
    {
      autocapitalize: 'off',
      autocorrect: 'off',
      childCount: 0,
      className: 'MultilineInputBox',
      name: '',
      onFocus: '',
      onInput: 'handleInput',
      placeholder: '',
      spellcheck: false,
      type: 62,
    },
    {
      childCount: 0,
      className: 'SearchFieldButtons',
      type: 4,
    },
  ])
})

test('getSearchFieldVirtualDom - with error', () => {
  const name = ''
  const placeholder = ''
  const onInput = 'handleInput'
  const insideButtons: any = []
  const outsideButtons: any = []
  const onFocus = ''
  const hasError = true
  expect(GetSearchFieldVirtualDom.getSearchFieldVirtualDom(name, placeholder, onInput, insideButtons, outsideButtons, onFocus, hasError)).toEqual([
    {
      childCount: 2,
      className: 'SearchField SearchFieldError',
      role: AriaRoles.None,
      type: 4,
    },
    {
      autocapitalize: 'off',
      autocorrect: 'off',
      childCount: 0,
      className: 'MultilineInputBox',
      name: '',
      onFocus: '',
      onInput: 'handleInput',
      placeholder: '',
      spellcheck: false,
      type: 62,
    },
    {
      childCount: 0,
      className: 'SearchFieldButtons',
      type: 4,
    },
  ])
})
