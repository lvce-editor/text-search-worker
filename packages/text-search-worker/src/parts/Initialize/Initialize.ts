import * as InitializeSearchProcess from '../InitializeSearchProcess/InitializeSearchProcess.ts'
import * as PlatformState from '../PlatformState/PlatformState.ts'

export const initialize = async (platform: number): Promise<void> => {
  PlatformState.set(platform)
  await InitializeSearchProcess.initializeSearchProcess(platform)
}
