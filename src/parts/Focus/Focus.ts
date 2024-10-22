import * as Rpc from '../Rpc/Rpc.js'

export const setFocus = async (focusKey: number): Promise<void> => {
  await Rpc.invoke('Focus.setFocus', focusKey)
}
