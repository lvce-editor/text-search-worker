import { expect, test } from '@jest/globals'
import * as GetOutsideButtonsDom from '../src/parts/GetOutSideButtonsDom/GetOutSideButtonsDom.ts'
import * as InputActionFlag from '../src/parts/InputActionFlag/InputActionFlag.ts'
import { InputAction } from '../src/parts/InputAction/InputAction.ts'

test('getOutsideButtonsDom - no buttons', () => {
  const buttons: InputAction[] = []
  expect(GetOutsideButtonsDom.getOutSideButtonsDom(buttons)).toEqual({
    preNodes: [],
    postNodes: [],
  })
})

test('getOutsideButtonsDom - multiple buttons', () => {
  const buttons: readonly InputAction[] = [
    {
      flag: InputActionFlag.ButtonEnabled,
      name: 'Button1',
      icon: 'test-icon',
      title: 'Button 1',
    },
    {
      flag: InputActionFlag.ButtonDisabled,
      name: 'Button2',
      icon: 'test-icon',
      title: 'Button 2',
    },
  ]
  const items = GetOutsideButtonsDom.getOutSideButtonsDom(buttons)
  expect(items).toEqual({
    postNodes: [
      {
        ariaChecked: false,
        childCount: 1,
        className: 'SearchFieldButton',
        disabled: undefined,
        name: 'Button1',
        role: 'checkbox',
        tabIndex: 0,
        title: 'Button 1',
        type: 1,
      },
      {
        childCount: 0,
        className: 'MaskIcon test-icon',
        type: 8,
      },
      {
        ariaChecked: undefined,
        childCount: 1,
        className: 'SearchFieldButton SearchFieldButtonDisabled',
        disabled: true,
        name: 'Button2',
        role: undefined,
        tabIndex: 0,
        title: 'Button 2',
        type: 1,
      },
      {
        childCount: 0,
        className: 'MaskIcon test-icon',
        type: 8,
      },
    ],
    preNodes: [
      {
        childCount: 3,
        className: 'SearchFieldContainer',
        role: 'none',
        type: 4,
      },
    ],
  })
})
