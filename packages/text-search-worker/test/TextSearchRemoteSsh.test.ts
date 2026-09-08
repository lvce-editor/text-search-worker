import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { textSearchProviderMap } from '../src/parts/TextSearchProviderMap/TextSearchProviderMap.ts'

const search = textSearchProviderMap['remote-ssh']

test('searches the decoded remote workspace path', async () => {
  using rpc = RendererWorker.registerMockRpc({
    'SearchProcess.invoke': () => ({ limitHit: false, results: [] }),
  })
  await expect(search('remote-ssh', 'remote-ssh://user@host:2222/work%20space', 'query', {}, '')).resolves.toEqual({
    limitHit: false,
    results: [],
  })
  expect(rpc.invocations[0]).toEqual(['SearchProcess.invoke', 'TextSearch.search', expect.objectContaining({ searchDir: '/work space' })])
})

test('limits open editors to the same remote user, host and port', async () => {
  using rpc = RendererWorker.registerMockRpc({
    'SearchProcess.invoke': () => ({ limitHit: false, results: [] }),
  })
  await search(
    'remote-ssh',
    'remote-ssh://user@host:2222/work%20space',
    'query',
    {
      openEditorUris: [
        'remote-ssh://user@host:2222/work%20space/file%20one.txt',
        'remote-ssh://other@host:2222/work%20space/wrong-user.txt',
        'remote-ssh://user@other:2222/work%20space/wrong-host.txt',
        'remote-ssh://user@host:2223/work%20space/wrong-port.txt',
        'file:///work%20space/local.txt',
      ],
    },
    '',
  )
  expect(rpc.invocations[0]).toEqual([
    'SearchProcess.invoke',
    'TextSearch.search',
    expect.objectContaining({
      ripGrepArgs: expect.arrayContaining(['file one.txt']),
      searchDir: '/work space',
    }),
  ])
  expect(JSON.stringify(rpc.invocations)).not.toMatch(/wrong-|local.txt/)
})

test('does not search when no remote editors are open', async () => {
  using rpc = RendererWorker.registerMockRpc({})
  await expect(search('remote-ssh', 'remote-ssh://host/workspace', 'query', { openEditorUris: [] }, '')).resolves.toEqual({
    limitHit: false,
    results: [],
  })
  expect(rpc.invocations).toEqual([])
})

test('preserves pull search identifiers', async () => {
  using rpc = RendererWorker.registerMockRpc({ 'SearchProcess.invoke': () => undefined })
  await search('remote-ssh', 'remote-ssh://host/workspace', 'query', { usePullBasedSearch: true }, '', 2, 'search-1', 42)
  expect(rpc.invocations[0]).toEqual([
    'SearchProcess.invoke',
    'TextSearch.searchPull',
    expect.objectContaining({ searchDir: '/workspace', searchId: 'search-1', uid: 42 }),
  ])
})
