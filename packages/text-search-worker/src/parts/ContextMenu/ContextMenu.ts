import * as Assert from '../Assert/Assert.ts'
import * as Rpc from '../Rpc/Rpc.ts'

export const show = async (x: number, y: number, id: number, ...args: any[]): Promise<void> => {
  // TODO ask renderer worker to show context menu
  Assert.number(x)
  Assert.number(y)
  Assert.number(id)
  // TODO
  await Rpc.invoke('ContextMenu.show', x, y, id, ...args)
}
