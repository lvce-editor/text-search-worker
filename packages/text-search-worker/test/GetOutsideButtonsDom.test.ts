import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import type { InputAction } from '../src/parts/InputAction/InputAction.ts'
import * as GetOutsideButtonsDom from '../src/parts/GetOutSideButtonsDom/GetOutSideButtonsDom.ts'
import * as InputActionFlag from '../src/parts/InputActionFlag/InputActionFlag.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'

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
        onClick: DomEventListenerFunctions.HandleButtonClick,
        role: AriaRoles.CheckBox,
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
        onClick: DomEventListenerFunctions.HandleButtonClick,
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
        role: AriaRoles.None,
        type: 4,
      },
    ],
  })
})
