// TODO high memory usage in idb because of transactionDoneMap

import { openDB } from '../Idb/Idb.ts'
import { VError } from '../VError/VError.ts'
import { state } from '../IndexedDbState/IndexedDbState.ts'
import * as IsDataCloneError from '../IsDataCloneError/IsDataCloneError.ts'

const getDb = async () => {
  // @ts-ignore
  const db = await openDB('session', state.dbVersion, {
    async upgrade(db: any, oldVersion: any) {
      if (!db.objectStoreNames.contains('session')) {
        const objectStore = await db.createObjectStore('session', {
          autoIncrement: true,
        })
        objectStore.createIndex('sessionId', 'sessionId', { unique: false })
      }
    },
  })
  return db
}

const getDbMemoized = async () => {
  // @ts-ignore
  state.cachedDb ||= await getDb()
  return state.cachedDb
}

export const saveValue = async (storeId: any, value: any) => {
  try {
    const db = await getDbMemoized()
    await db.add('session', value)
  } catch (error) {
    if (IsDataCloneError.isDataCloneError(error)) {
      // TODO
      return
    }
    throw new VError(error, 'Failed to save value to indexed db')
  }
}

export const getValues = async (storeId: any) => {
  try {
    const db = await getDbMemoized()
    const tx = db.transaction(storeId, 'readwrite')
    const [objects] = await Promise.all([tx.store.getAll(), tx.done])
    console.log({ objects })
    return objects
  } catch (error) {
    throw new VError(error, 'Failed to get values from indexed db')
  }
}

export const getValuesByIndexName = async (storeId:any , indexName:any , only:any ) => {
  const db = await getDbMemoized()
  const transaction = db.transaction(storeId)
  const index = transaction.store.index(indexName)
  const iterator = index.iterate(only)
  const objects = []
  for await (const cursor of iterator) {
    objects.push(cursor.value)
  }
  return objects
}

const getHandleDb = async () => {
  // @ts-ignore
  const db = await openDB('handle', state.dbVersion, {
    async upgrade(db:any , oldVersion:any ) {
      if (!db.objectStoreNames.contains('file-handles-store')) {
        // @ts-ignore
        const objectStore = await db.createObjectStore('file-handles-store', {})
      }
    },
  })
  return db
}

export const addHandle = async (uri:string , handle:any ) => {
  const handleDb = await getHandleDb()
  await handleDb.put('file-handles-store', handle, uri)
}

export const getHandle = async (uri:string ) => {
  const handleDb = await getHandleDb()
  const handle = await handleDb.get('file-handles-store', uri)
  return handle
}
export { state } from '../IndexedDbState/IndexedDbState.ts'
