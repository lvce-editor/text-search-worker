import type { ClickHandler } from '../ClickHandler/ClickHandler.ts'
import * as FocusReplaceValue from '../FocusReplaceValue/FocusReplaceValue.ts'
import * as FocusSearchValue from '../FocusSearchValue/FocusSearchValue.ts'
import * as InputName from '../InputName/InputName.ts'
import * as Noop from '../Noop/Noop.ts'
import * as ReplaceAll from '../ReplaceAll/ReplaceAll.ts'
import * as ToggleDetailsExpanded from '../ToggleDetailsExpanded/ToggleDetailsExpanded.ts'
import * as ToggleMatchCase from '../ToggleMatchCase/ToggleMatchCase.ts'
import * as ToggleMatchWholeWord from '../ToggleMatchWholeWord/ToggleMatchWholeWord.ts'
import * as ToggleOpenEditors from '../ToggleOpenEditors/ToggleOpenEditors.ts'
import * as TogglePreserveCase from '../TogglePreserveCase/TogglePreserveCase.ts'
import * as ToggleReplace from '../ToggleReplace/ToggleReplace.ts'
import * as ToggleUseIgnoreFiles from '../ToggleUseIgnoreFiles/ToggleUseIgnoreFiles.ts'
import * as ToggleUseRegularExpression from '../ToggleUseRegularExpression/ToggleUseRegularExpression.ts'

export const getClickHandler = (name: string): ClickHandler => {
  switch (name) {
    case InputName.MatchCase:
      return ToggleMatchCase.toggleMatchCase
    case InputName.ToggleReplace:
      return ToggleReplace.toggleReplace
    case InputName.UseRegularExpression:
      return ToggleUseRegularExpression.toggleUseRegularExpression
    case InputName.ReplaceAll:
      return ReplaceAll.replaceAll
    case InputName.MatchWholeWord:
      return ToggleMatchWholeWord.toggleMatchWholeWord
    case InputName.PreserveCase:
      return TogglePreserveCase.togglePreserveCase
    case InputName.ToggleSearchDetails:
      return ToggleDetailsExpanded.toggleDetailsExpanded
    case InputName.SearchOnlyOpenEditors:
      return ToggleOpenEditors.toggleOpenEditors
    case InputName.UseExcludeSettings:
      return ToggleUseIgnoreFiles.toggleUseIgnoreFiles
    case InputName.SearchValue:
      return FocusSearchValue.focusSearchValue
    case InputName.ReplaceValue:
      return FocusReplaceValue.focusReplaceValue
    default:
      return Noop.noop
  }
}
