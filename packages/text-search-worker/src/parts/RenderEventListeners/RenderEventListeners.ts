import type { DomEventListener } from '../DomEventListener/DomEventListener.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const renderEventListeners = (): readonly DomEventListener[] => {
  return [
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
      params: ['handleClickAt', 'event.clientX', 'event.clientY'],
    },
    {
      name: DomEventListenerFunctions.HandleListFocus,
      params: ['handleClickAt', 'event.clientX', 'event.clientY'],
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
      params: ['handleContextMenu', 'event.deltaMode', 'event.deltaY'],
      passive: true,
    },
    {
      name: DomEventListenerFunctions.HandleHeaderClick2,
      params: ['handleHeaderClick', 'event.target.name'],
    },
  ]
}
