import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetSearchFieldVirtualDom from '../GetSearchFieldVirtualDom/GetSearchFieldVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getSearchHeaderTopVirtualDom = (flags: number): readonly VirtualDomNode[] => {
  const dom: VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchHeaderTop,
      role: AriaRoles.None,
      childCount: 2,
    },
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
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchHeaderTopRight,
      role: AriaRoles.None,
      childCount: SearchFlags.hasReplaceExpanded(flags) ? 2 : 1,
    },
    ...GetSearchFieldVirtualDom.getSearchFieldVirtualDom(
      'search-value',
      'Search',
      'handleInput',
      [
        {
          icon: ClassNames.MaskIconCaseSensitive,
          checked: SearchFlags.hasMatchCase(flags),
          title: SearchStrings.matchCase(),
        },
        {
          icon: ClassNames.MaskIconWholeWord,
          checked: SearchFlags.hasMatchWholeWord(flags),
          title: SearchStrings.matchWholeWord(),
        },
        {
          icon: ClassNames.MaskIconRegex,
          checked: SearchFlags.hasUseRegularExpression(flags),
          title: SearchStrings.useRegularExpression(),
        },
      ],
      [],
    ),
  ]

  if (SearchFlags.hasReplaceExpanded(flags)) {
    dom.push(
      ...GetSearchFieldVirtualDom.getSearchFieldVirtualDom(
        'search-replace-value',
        'Replace',
        'handleReplaceInput',
        [
          {
            icon: ClassNames.MaskIconPreserveCase,
            checked: SearchFlags.hasPreserveCase(flags),
            title: SearchStrings.preserveCase(),
          },
        ],
        [
          {
            icon: ClassNames.MaskIconReplaceAll,
            checked: false,
            title: SearchStrings.replaceAll(),
          },
        ],
      ),
    )
  }
  return dom
}