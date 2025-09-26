import { EventExpression } from '@lvce-editor/constants'
import type { DomEventListener } from '../DomEventListener/DomEventListener.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const renderEventListeners = (): readonly DomEventListener[] => {
  return [
    {
      name: DomEventListenerFunctions.HandleInput2,
      params: ['handleInput2', EventExpression.TargetName, EventExpression.TargetValue, InputSource.User],
    },
    {
      name: DomEventListenerFunctions.HandleExcludeInput,
      params: ['handleExcludeInput', EventExpression.TargetValue],
    },
    {
      name: DomEventListenerFunctions.HandleIncludeInput,
      params: ['handleIncludeInput', EventExpression.TargetValue],
    },
    {
      name: DomEventListenerFunctions.HandleReplaceInput,
      params: ['handleReplaceInput', EventExpression.TargetValue],
    },
    {
      name: DomEventListenerFunctions.HandleClick,
      params: ['handleClickAt', EventExpression.ClientX, EventExpression.ClientY],
    },
    {
      name: DomEventListenerFunctions.HandleListPointerDown,
      params: ['handleListPointerDown'],
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
      params: ['handleContextMenu', EventExpression.Button, EventExpression.ClientX, EventExpression.ClientY],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandleHeaderContextMenu,
      params: ['handleHeaderContextMenu'],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandleWheel,
      params: ['handleWheel', EventExpression.DeltaMode, EventExpression.DeltaY],
      passive: true,
    },
    {
      name: DomEventListenerFunctions.HandleButtonClick,
      params: ['handleHeaderClick', EventExpression.TargetName],
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
      params: ['handleScrollBarClick', EventExpression.DeltaY],
    },
    {
      name: DomEventListenerFunctions.HandleInputFocus,
      params: ['handleInputFocus', EventExpression.TargetName],
    },
    {
      name: DomEventListenerFunctions.HandleInputBlur,
      params: ['handleInputBlur', EventExpression.TargetName],
    },
  ]
}
