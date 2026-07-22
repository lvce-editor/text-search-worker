import { expect, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { RendererWorker, SearchProcess } from '@lvce-editor/rpc-registry'
import * as InvokeSearchProcess from '../src/parts/InvokeSearchProcess/InvokeSearchProcess.ts'
import * as PlatformState from '../src/parts/PlatformState/PlatformState.ts'

test('invoke - uses the renderer worker on the web', async () => {
  PlatformState.set(PlatformType.Web)
  using mockRpc = RendererWorker.registerMockRpc({
    'SearchProcess.invoke': () => 'result',
  })

  await expect(InvokeSearchProcess.invoke('TextSearch.search', { query: 'test' })).resolves.toBe('result')
  expect(mockRpc.invocations).toEqual([['SearchProcess.invoke', 'TextSearch.search', { query: 'test' }]])
})

test('invoke - uses the direct search process rpc remotely', async () => {
  PlatformState.set(PlatformType.Remote)
  using mockRpc = SearchProcess.registerMockRpc({
    'TextSearch.search': () => 'result',
  })

  await expect(InvokeSearchProcess.invoke('TextSearch.search', { query: 'test' })).resolves.toBe('result')
  expect(mockRpc.invocations).toEqual([['TextSearch.search', { query: 'test' }]])
})
