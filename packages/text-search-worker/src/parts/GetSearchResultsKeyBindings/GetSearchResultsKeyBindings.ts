import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'
import * as KeyCode from '../KeyCode/KeyCode.ts'
import * as KeyModifier from '../KeyModifier/KeyModifier.ts'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'

export const getSearchResultKeyBindings = (): readonly KeyBinding[] => {
  return [
    {
      key: KeyCode.DownArrow,
      command: 'Search.focusNext',
      when: WhenExpression.FocusSearchResults,
    },
    {
      key: KeyCode.UpArrow,
      command: 'Search.focusPrevious',
      when: WhenExpression.FocusSearchResults,
    },
    {
      key: KeyCode.Delete,
      command: 'Search.dismissItem',
      when: WhenExpression.FocusSearchResults,
    },
    {
      key: KeyCode.Home,
      command: 'Search.focusFirst',
      when: WhenExpression.FocusSearchResults,
    },
    {
      key: KeyCode.End,
      command: 'Search.focusLast',
      when: WhenExpression.FocusSearchResults,
    },
    {
      key: KeyModifier.CtrlCmd | KeyCode.KeyC,
      command: 'Search.copy',
      when: WhenExpression.FocusSearchResults,
    },
  ]
}
