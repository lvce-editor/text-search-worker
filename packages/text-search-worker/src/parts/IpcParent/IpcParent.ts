import * as IpcParentModule from '../IpcParentModule/IpcParentModule.js'

export const create = async ({ method, ...options }: any): Promise<any> => {
  const module = IpcParentModule.getModule(method)
  // @ts-ignore
  const rawIpc = await module.create(options)
  if (options.noReturn) {
    return undefined
  }
  if (options.raw) {
    return rawIpc
  }
  const ipc = module.wrap(rawIpc)
  return ipc
}
