import * as GetIncrementalResults from '../GetIncrementalResults/GetIncrementalResults.ts'
import * as GetPullResults from '../GetPullResults/GetPullResults.ts'
import * as HandleMessagePort from '../HandleMessagePort/HandleMessagePort.ts'
import * as HandlePullResultsFound from '../HandlePullResultsFound/HandlePullResultsFound.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import * as TextSearch from '../TextSearch/TextSearch.ts'
import * as TextSearchIncremental from '../TextSearchIncremental/TextSearchIncremental.ts'

export const commandMap = {
  'HandleMessagePort.handleMessagePort': HandleMessagePort.handleMessagePort,
  'TextSearch.getIncrementalResults': GetIncrementalResults.getIncrementalResults,
  'TextSearch.getPullResults': GetPullResults.getPullResults,
  'TextSearch.handlePullResultsFound': HandlePullResultsFound.handlePullResultsFound,
  'TextSearch.initialize': Initialize.initialize,
  'TextSearch.search': TextSearch.textSearch,
  'TextSearch.searchIncremental': TextSearchIncremental.textSearchIncremental,
}
