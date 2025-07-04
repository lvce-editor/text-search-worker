import * as Assert from '../Assert/Assert.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const show = async (x: number, y: number, id: number, ...args: readonly any[]): Promise<void> => {
  // TODO ask renderer worker to show context menu
  Assert.number(x)
  Assert.number(y)
  Assert.number(id)
  // TODO
  await RendererWorker.showContextMenu(x, y, id, ...args)
}
