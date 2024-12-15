import * as GetHandleDb from '../GetHandleDb/GetHandleDb.ts'

export const getHandle = async (uri: string): Promise<any> => {
  const handleDb = await GetHandleDb.getHandleDb()
  const handle = await handleDb.get('file-handles-store', uri)
  return handle
}
