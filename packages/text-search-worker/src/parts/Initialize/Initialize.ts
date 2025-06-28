import { launchSearchProcessElectron } from '../LaunchSearchProcessElectron/LaunchSearchProcessElectron.ts'
import { launchSearchProcessNode } from '../LaunchSearchProcessNode/LaunchSearchProcessNode.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as SearchProcess from '../SearchProcess/SearchProcess.ts'

export const initialize = async (platform: number): Promise<void> => {
  if (platform === PlatformType.Electron) {
    SearchProcess.setFactory(launchSearchProcessElectron)
  } else if (platform === PlatformType.Remote) {
    SearchProcess.setFactory(launchSearchProcessNode)
  }
  // TODO
}
