import { expect, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { SearchProcess, TextSearchViewWorker } from '@lvce-editor/rpc-registry'
import * as HandlePullResultsFound from '../src/parts/HandlePullResultsFound/HandlePullResultsFound.ts'
import * as PlatformState from '../src/parts/PlatformState/PlatformState.ts'

test('handlePullResultsFound - forwards search process results to the view worker', async () => {
  PlatformState.set(PlatformType.Electron)
  const results = [{ end: 4, lineNumber: 1, start: 0, text: 'test', type: 2 }]
  using searchProcessRpc = SearchProcess.registerMockRpc({
    'TextSearch.getPullResults': () => results,
  })
  using textSearchViewWorkerRpc = TextSearchViewWorker.registerMockRpc({
    'TextSearch.handlePullResultsFound': () => undefined,
  })

  await HandlePullResultsFound.handlePullResultsFound(42, 'search-1')

  expect(searchProcessRpc.invocations).toEqual([['TextSearch.getPullResults', 'search-1']])
  expect(textSearchViewWorkerRpc.invocations).toEqual([['TextSearch.handlePullResultsFound', 42, 'search-1', results]])
})
