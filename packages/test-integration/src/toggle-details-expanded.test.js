import assert from 'assert'

export const test = async (rpc) => {
  const uid = 1
  const x = 0
  const y = 0
  const width = 0
  const height = 0
  const workspacePath = ''
  const assetDir = ''
  const itemHeight = 22
  const value = ''
  const replacement = ''
  await rpc.invoke('TextSearch.create', uid, x, y, width, height, workspacePath, assetDir, itemHeight, value, replacement)
  await rpc.invoke('TextSearch.toggleSearchDetails', uid)
  const flags = await rpc.invoke('TextSearch.getFlags', uid)
  assert.equal(flags, 32)
}
