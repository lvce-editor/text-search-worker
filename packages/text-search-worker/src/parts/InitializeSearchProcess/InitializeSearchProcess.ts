import { PlatformType } from '@lvce-editor/constants'
import { SearchProcess } from '@lvce-editor/rpc-registry'
import * as LaunchSearchProcessElectron from '../LaunchSearchProcessElectron/LaunchSearchProcessElectron.ts'
import * as LaunchSearchProcessNode from '../LaunchSearchProcessNode/LaunchSearchProcessNode.ts'

export const initializeSearchProcess = async (platform: number): Promise<void> => {
  if (platform === PlatformType.Electron) {
    const rpc = await LaunchSearchProcessElectron.launchSearchProcessElectron()
    SearchProcess.set(rpc)
  } else if (platform === PlatformType.Remote) {
    const rpc = await LaunchSearchProcessNode.launchSearchProcessNode()
    SearchProcess.set(rpc)
  }
}
