import { test, expect } from '@jest/globals'
import { getModule } from '../src/parts/IpcChildModule/IpcChildModule.ts'
import * as IpcChildType from '../src/parts/IpcChildType/IpcChildType.ts'
import { IpcChildWithModuleWorker, IpcChildWithModuleWorkerAndMessagePort } from '@lvce-editor/ipc/dist/browser.js'

test('getModule - should return IpcChildWithModuleWorker for ModuleWorker type', () => {
  expect(getModule(IpcChildType.ModuleWorker)).toEqual(IpcChildWithModuleWorker)
})

test('getModule - should return IpcChildWithModuleWorkerAndMessagePort for ModuleWorkerAndMessagePort type', () => {
  expect(getModule(IpcChildType.ModuleWorkerAndMessagePort)).toEqual(IpcChildWithModuleWorkerAndMessagePort)
})

test('getModule - should throw error for unknown type', () => {
  expect(() => getModule('unknown')).toThrow('unexpected ipc type')
})
