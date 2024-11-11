import * as Rpc from '../Rpc/Rpc.ts'

export const openUri = async (path: string, focus = true, props = {}) => {
  await Rpc.invoke(/* Main.openUri */ 'Main.openUri', /* uri */ path, /* focus */ focus, props)
}
