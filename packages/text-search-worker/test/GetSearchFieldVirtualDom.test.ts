import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSearchFieldVirtualDom from '../src/parts/GetSearchFieldVirtualDom/GetSearchFieldVirtualDom.ts'

test('NotReadableError', () => {
  const name = ''
  const placeholder = ''
  const onInput = 'handleInput'
  const insideButtons: any = []
  const outsideButtons: any = []
  expect(GetSearchFieldVirtualDom.getSearchFieldVirtualDom(name, placeholder, onInput, insideButtons, outsideButtons)).toEqual([
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
      onBlur: DomEventListenerFunctions.HandleInputBlur,
      onContextMenu: DomEventListenerFunctions.HandleListContextMenu,
      onFocus: DomEventListenerFunctions.HandleInputFocus,
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
  const hasError = true
  expect(GetSearchFieldVirtualDom.getSearchFieldVirtualDom(name, placeholder, onInput, insideButtons, outsideButtons, hasError)).toEqual([
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
      onBlur: DomEventListenerFunctions.HandleInputBlur,
      onContextMenu: DomEventListenerFunctions.HandleListContextMenu,
      onFocus: DomEventListenerFunctions.HandleInputFocus,
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
