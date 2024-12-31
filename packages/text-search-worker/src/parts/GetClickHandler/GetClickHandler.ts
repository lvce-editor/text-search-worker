import type { ClickHandler } from '../ClickHandler/ClickHandler.ts'
import * as InputName from '../InputName/InputName.ts'
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
      // @ts-ignore
      return ToggleMatchCase.toggleMatchCase
    case InputName.ToggleReplace:
      // @ts-ignore
      return ToggleReplace.toggleReplace
    case InputName.UseRegularExpression:
      // @ts-ignore
      return ToggleUseRegularExpression.toggleUseRegularExpression
    case InputName.ReplaceAll:
      // @ts-ignore
      return ReplaceAll.replaceAll
    case InputName.MatchWholeWord:
      // @ts-ignore
      return ToggleMatchWholeWord.toggleMatchWholeWord
    case InputName.PreserveCase:
      // @ts-ignore
      return TogglePreserveCase.togglePreserveCase
    case InputName.ToggleSearchDetails:
      // @ts-ignore
      return ToggleDetailsExpanded.toggleDetailsExpanded
    case InputName.SearchOnlyOpenEditors:
      // @ts-ignore
      return ToggleOpenEditors.toggleOpenEditors
    case InputName.UseExcludeSettings:
      // @ts-ignore
      return ToggleUseIgnoreFiles.toggleUseIgnoreFiles
    default:
      throw new Error(`Click handler not found: ${name}`)
  }
}
