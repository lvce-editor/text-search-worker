import { PlatformType } from '@lvce-editor/constants'
import { initializeIconThemeWorker } from '../InitializeIconThemeWorker/InitializeIconThemeWorker.ts'
import { launchSearchProcessElectron } from '../LaunchSearchProcessElectron/LaunchSearchProcessElectron.ts'
import { launchSearchProcessNode } from '../LaunchSearchProcessNode/LaunchSearchProcessNode.ts'
import * as SearchProcess from '../SearchProcess/SearchProcess.ts'

const setSearchProcessFactory = (platform: number): void => {
  if (platform === PlatformType.Electron) {
    SearchProcess.setFactory(launchSearchProcessElectron)
  } else if (platform === PlatformType.Remote) {
    SearchProcess.setFactory(launchSearchProcessNode)
  }
}

export const initialize = async (platform: number): Promise<void> => {
  setSearchProcessFactory(platform)
  await initializeIconThemeWorker()
}
