import { launchSearchProcessElectron } from '../LaunchSearchProcessElectron/LaunchSearchProcessElectron.ts'
import { launchSearchProcessNode } from '../LaunchSearchProcessNode/LaunchSearchProcessNode.ts'
import { PlatformType } from '@lvce-editor/constants'
import * as SearchProcess from '../SearchProcess/SearchProcess.ts'

export const initialize = async (platform: number): Promise<void> => {
  if (platform === PlatformType.Electron) {
    SearchProcess.setFactory(launchSearchProcessElectron)
  } else if (platform === PlatformType.Remote) {
    SearchProcess.setFactory(launchSearchProcessNode)
  }
  // TODO
}
