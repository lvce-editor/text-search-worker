import * as Assert from '../Assert/Assert.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const show = async (x: number, y: number, id: number, ...args: readonly any[]): Promise<void> => {
  Assert.number(x)
  Assert.number(y)
  Assert.number(id)
  // TODO
  await RendererWorker.showContextMenu(x, y, id, ...args)
}

export const show2 = async (uid: number, menuId: any, x: number, y: number, args: any): Promise<void> => {
  await RendererWorker.showContextMenu2(uid, menuId, x, y, args)
}
