import * as InvokeSearchProcess from '../InvokeSearchProcess/InvokeSearchProcess.ts'

export const getPullResults = async (searchId: string): Promise<any> => {
  return InvokeSearchProcess.invoke('TextSearch.getPullResults', searchId)
}
