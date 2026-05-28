import { initializeIconThemeWorker } from '../InitializeIconThemeWorker/InitializeIconThemeWorker.ts'
import { initializeSearchProcess } from '../InitializeSearchProcess/InitializeSearchProcess.ts'
import { initializeTextMeasurementWorker } from '../InitializeTextMeasurementWorker/InitializeTextMeasurementWorker.ts'

export const initialize = async (platform: number): Promise<void> => {
  await Promise.all([initializeSearchProcess(platform), initializeIconThemeWorker(), initializeTextMeasurementWorker()])
}
