import { createLazyRpc, RpcId, SearchProcess } from '@lvce-editor/rpc-registry'

export const { dispose, set } = SearchProcess

export const { invoke, setFactory } = createLazyRpc(RpcId.SearchProcess)
