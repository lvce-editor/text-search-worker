import { RpcId, SearchProcess } from '@lvce-editor/rpc-registry'
import { createLazyRpc } from '../CreateLazyRpc/CreateLazyRpc.ts'

export const { set, dispose } = SearchProcess

export const { invoke, setFactory } = createLazyRpc(RpcId.SearchProcess)
