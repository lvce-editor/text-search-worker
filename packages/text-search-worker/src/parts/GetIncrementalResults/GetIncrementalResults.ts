import * as InvokeSearchProcess from '../InvokeSearchProcess/InvokeSearchProcess.ts'

export const getIncrementalResults = async (searchId: string, minLineY: number, maxLineY: number): Promise<any> => {
  return InvokeSearchProcess.invoke('TextSearch.getIncrementalResults', searchId, minLineY, maxLineY)
}
