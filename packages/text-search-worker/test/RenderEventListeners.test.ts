import { expect, test } from '@jest/globals'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners', () => {
  expect(RenderEventListeners.renderEventListeners()).toEqual([
    {
      name: DomEventListenerFunctions.HandleInput2,
      params: ['handleInput2', 'event.target.name', 'event.target.value', InputSource.User],
    },
    {
      name: DomEventListenerFunctions.HandleExcludeInput,
      params: ['handleExcludeInput', 'event.target.value'],
    },
    {
      name: DomEventListenerFunctions.HandleIncludeInput,
      params: ['handleIncludeInput', 'event.target.value'],
    },
    {
      name: DomEventListenerFunctions.HandleReplaceInput,
      params: ['handleReplaceInput', 'event.target.value'],
    },
    {
      name: DomEventListenerFunctions.HandleInput,
      params: ['handleInput', 'event.target.value', InputSource.User],
    },
    {
      name: DomEventListenerFunctions.HandleClick,
      params: ['handleClickAt', 'event.clientX', 'event.clientY'],
    },
    {
      name: DomEventListenerFunctions.HandleToggleButtonClick,
      params: ['handleToggleButtonClick'],
    },
    {
      name: DomEventListenerFunctions.HandleListFocus,
      params: ['handleListFocus'],
    },
    {
      name: DomEventListenerFunctions.HandleListBlur,
      params: ['handleListBlur'],
    },
    {
      name: DomEventListenerFunctions.HandleContextMenu,
      params: ['handleContextMenu', 'event.button', 'event.clientX', 'event.clientY'],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandleWheel,
      params: ['handleWheel', 'event.deltaMode', 'event.deltaY'],
      passive: true,
    },
    {
      name: DomEventListenerFunctions.HandleHeaderClick2,
      params: ['handleHeaderClick', 'event.target.name'],
    },
    {
      name: DomEventListenerFunctions.HandleHeaderFocusIn,
      params: ['handleHeaderFocusIn'],
    },
    {
      name: DomEventListenerFunctions.HandleHeaderFocusOut,
      params: ['handleHeaderFocusOut'],
    },
    {
      name: DomEventListenerFunctions.HandleScrollBarPointerDown,
      params: ['handleScrollBarClick', 'event.deltaY'],
    },
  ])
})
