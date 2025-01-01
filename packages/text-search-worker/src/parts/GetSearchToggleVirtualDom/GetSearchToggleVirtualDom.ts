import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as InputName from '../InputName/InputName.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getSearchToggleVirtualDom = (flags: number): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Button,
      className: MergeClassNames.mergeClassNames(
        ClassNames.IconButton,
        ClassNames.SearchToggleButton,
        flags & SearchFlags.ReplaceExpanded ? ClassNames.SearchToggleButtonExpanded : '',
      ),
      title: SearchStrings.toggleReplace(),
      ariaLabel: SearchStrings.toggleReplace(),
      ariaExpanded: Boolean(flags & SearchFlags.ReplaceExpanded),
      childCount: 1,
      'data-command': 'toggleReplace',
      name: InputName.ToggleReplace,
    },
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(
        ClassNames.MaskIcon,
        flags & SearchFlags.ReplaceExpanded ? ClassNames.MaskIconChevronDown : ClassNames.MaskIconChevronRight,
      ),
      childCount: 0,
    },
  ]
}
