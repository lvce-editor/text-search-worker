import { terminate } from '@lvce-editor/viewlet-registry'
import * as TextSearch from '../TextSearch/TextSearch.ts'
import * as TextSearchIncremental from '../TextSearchIncremental/TextSearchIncremental.ts'

export const commandMap = {
  'TextSearch.search': TextSearch.textSearch,
  'TextSearch.searchIncremental': TextSearchIncremental.textSearchIncremental,
  'TextSearch.terminal': terminate

}
