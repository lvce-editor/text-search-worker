import { expect, test } from '@jest/globals'
import { MockRpc, PlainMessagePortRpc } from '@lvce-editor/rpc'
import { RendererWorker, SearchProcess } from '@lvce-editor/rpc-registry'
import * as SearchProcessElectron from '../src/parts/SearchProcessElectron/SearchProcessElectron.ts'

test('invoke - forwards call to rpc', async () => {
  RendererWorker.set(
    MockRpc.create({
      commandMap: {},
      invoke() {},
      async invokeAndTransfer(method: string, port: MessagePort): Promise<void> {
        await PlainMessagePortRpc.create({
          messagePort: port,
          commandMap: {
            'test.method'() {
              return 'test result'
            },
          },
        })
      },
    }),
  )

  const result = await SearchProcessElectron.invoke('test.method', 'arg1', 'arg2')
  expect(result).toBe('test result')
  await SearchProcess.dispose()
})
