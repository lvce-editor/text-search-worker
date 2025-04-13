import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'
import * as KeyCode from '../KeyCode/KeyCode.ts'
import * as KeyModifier from '../KeyModifier/KeyModifier.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const getKeyBindings = (): readonly KeyBinding[] => {
  return [
    {
      key: KeyModifier.CtrlCmd | KeyModifier.Alt | KeyCode.Enter,
      command: 'Search.replaceAll',
      when: WhenExpression.FocusSearch,
    },
    {
      key: KeyCode.Tab,
      command: 'Search.focusNextInput',
      when: WhenExpression.FocusSearch,
    },
    {
      key: KeyModifier.Shift | KeyCode.Tab,
      command: 'Search.focusPreviousInput',
      when: WhenExpression.FocusSearch,
    },
    {
      key: KeyCode.UpArrow,
      command: 'Search.previousHistoryResult',
      when: WhenExpression.FocusSearchInput,
    },
    {
      key: KeyCode.DownArrow,
      command: 'Search.nextHistoryResult',
      when: WhenExpression.FocusSearchInput,
    },
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
    {
      key: KeyCode.Enter,
      command: 'Search.submit',
      when: WhenExpression.FocusSearchInput,
    },
    {
      key: KeyCode.Enter,
      command: 'Search.submit',
      when: WhenExpression.FocusSearchReplaceInput,
    },
  ]
}
