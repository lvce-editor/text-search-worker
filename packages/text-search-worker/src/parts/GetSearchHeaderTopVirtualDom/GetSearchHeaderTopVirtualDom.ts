import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetSearchFieldVirtualDom from '../GetSearchFieldVirtualDom/GetSearchFieldVirtualDom.ts'
import * as GetSearchToggleVirtualDom from '../GetSearchToggleVirtualDom/GetSearchToggleVirtualDom.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import * as InputName from '../InputName/InputName.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getSearchHeaderTopVirtualDom = (flags: number): readonly VirtualDomNode[] => {
  const dom: VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchHeaderTop,
      role: AriaRoles.None,
      childCount: 2,
    },
    ...GetSearchToggleVirtualDom.getSearchToggleVirtualDom(flags),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchHeaderTopRight,
      role: AriaRoles.None,
      childCount: SearchFlags.hasReplaceExpanded(flags) ? 2 : 1,
    },
    ...GetSearchFieldVirtualDom.getSearchFieldVirtualDom(
      InputName.SearchValue,
      'Search',
      'handleInput',
      [
        {
          icon: ClassNames.MaskIconCaseSensitive,
          checked: SearchFlags.hasMatchCase(flags),
          title: SearchStrings.matchCase(),
          name: InputName.MatchCase,
        },
        {
          icon: ClassNames.MaskIconWholeWord,
          checked: SearchFlags.hasMatchWholeWord(flags),
          title: SearchStrings.matchWholeWord(),
          name: InputName.MatchWholeWord,
        },
        {
          icon: ClassNames.MaskIconRegex,
          checked: SearchFlags.hasUseRegularExpression(flags),
          title: SearchStrings.useRegularExpression(),
          name: InputName.UseRegularExpression,
        },
      ],
      [],
    ),
  ]

  if (SearchFlags.hasReplaceExpanded(flags)) {
    dom.push(
      ...GetSearchFieldVirtualDom.getSearchFieldVirtualDom(
        InputName.ReplaceValue,
        'Replace',
        'handleReplaceInput',
        [
          {
            icon: ClassNames.MaskIconPreserveCase,
            checked: SearchFlags.hasPreserveCase(flags),
            title: SearchStrings.preserveCase(),
            name: InputName.PreserveCase,
          },
        ],
        [
          {
            icon: ClassNames.MaskIconReplaceAll,
            checked: false,
            title: SearchStrings.replaceAll(),
            name: InputName.ReplaceAll,
          },
        ],
      ),
    )
  }
  return dom
}
