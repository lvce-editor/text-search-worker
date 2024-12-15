// TODO high memory usage in idb because of transactionDoneMap

import { openDB } from '../Idb/Idb.ts'
import { state } from '../IndexedDbState/IndexedDbState.ts'

export const getHandleDb = async (): Promise<any> => {
  // @ts-ignore
  const db = await openDB('handle', state.dbVersion, {
    async upgrade(db: any) {
      if (!db.objectStoreNames.contains('file-handles-store')) {
        await db.createObjectStore('file-handles-store', {})
      }
    },
  })
  return db
}
