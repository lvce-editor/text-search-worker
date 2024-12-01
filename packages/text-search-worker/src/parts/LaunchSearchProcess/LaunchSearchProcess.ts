import * as IpcParent from '../IpcParent/IpcParent.ts'
import * as IpcParentType from '../IpcParentType/IpcParentType.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const launchSearchProcess = async (): Promise<any> => {
  const ipc = await IpcParent.create({
    method: IpcParentType.NodeAlternate,
    type: 'search-process',
    name: 'Search Process',
    initialCommand: 'HandleMessagePortForSearchProcess.handleMessagePortForSearchProcess',
    platform: PlatformType.Remote,
  })
  // TODO
  // HandleIpc.handleIpc(ipc)
  return ipc
}
