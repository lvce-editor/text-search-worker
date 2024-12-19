import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
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
        SearchFlags.hasReplaceExpanded(flags) ? ClassNames.SearchToggleButtonExpanded : '',
      ),
      title: SearchStrings.toggleReplace(),
      ariaLabel: SearchStrings.toggleReplace(),
      ariaExpanded: SearchFlags.hasReplaceExpanded(flags),
      childCount: 1,
      'data-command': 'toggleReplace',
    },
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(
        ClassNames.MaskIcon,
        SearchFlags.hasReplaceExpanded(flags) ? ClassNames.MaskIconChevronDown : ClassNames.MaskIconChevronRight,
      ),
      childCount: 0,
    },
  ]
}
