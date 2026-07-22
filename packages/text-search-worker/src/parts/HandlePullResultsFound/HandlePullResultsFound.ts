import { TextSearchViewWorker } from '@lvce-editor/rpc-registry'
import * as GetPullResults from '../GetPullResults/GetPullResults.ts'

export const handlePullResultsFound = async (uid: number, searchId: string): Promise<void> => {
  const results = await GetPullResults.getPullResults(searchId)
  await TextSearchViewWorker.invoke('TextSearch.handlePullResultsFound', uid, searchId, results)
}
