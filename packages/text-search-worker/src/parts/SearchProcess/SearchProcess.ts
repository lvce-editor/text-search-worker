import { createLazyRpc, RpcId, SearchProcess } from '@lvce-editor/rpc-registry'

export const { set, dispose } = SearchProcess

export const { invoke, setFactory } = createLazyRpc(RpcId.SearchProcess)
