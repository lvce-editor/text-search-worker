import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as InputName from '../InputName/InputName.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getSearchToggleVirtualDom = (replaceExpanded: number): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Button,
      className: MergeClassNames.mergeClassNames(
        ClassNames.IconButton,
        ClassNames.SearchToggleButton,
        replaceExpanded ? ClassNames.SearchToggleButtonExpanded : '',
      ),
      title: SearchStrings.toggleReplace(),
      ariaLabel: SearchStrings.toggleReplace(),
      ariaExpanded: Boolean(replaceExpanded),
      childCount: 1,
      'data-command': 'toggleReplace',
      name: InputName.ToggleReplace,
    },
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(
        ClassNames.MaskIcon,
        replaceExpanded ? ClassNames.MaskIconChevronDown : ClassNames.MaskIconChevronRight,
      ),
      childCount: 0,
    },
  ]
}
