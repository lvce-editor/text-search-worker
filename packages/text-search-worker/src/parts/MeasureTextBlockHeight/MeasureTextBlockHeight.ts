import { RendererWorker, TextMeasurementWorker } from '@lvce-editor/rpc-registry'

export const measureTextHeight = (text: string, fontFamily: string, fontSize: number, lineHeight: number, width: number): Promise<number> => {
  // TextMeasurementWorker.
  return RendererWorker.invoke('MeasureTextHeight.measureTextBlockHeight', text, fontFamily, fontSize, `${lineHeight}px`, width)
}
