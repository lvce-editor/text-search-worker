import { RendererWorker } from '@lvce-editor/rpc-registry'

export const measureTextBlockHeight = (text: string, fontFamily: string, fontSize: number, lineHeight: number, width: number): Promise<number> => {
  return RendererWorker.invoke('MeasureTextHeight.measureTextBlockHeight', text, fontSize, fontFamily, lineHeight, width)
}
