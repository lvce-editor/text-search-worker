import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.input-copy'

export const skip = 1

export const test: Test = async ({ ClipBoard, Command, Search, FileSystem, Workspace }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await Search.open()
  await Search.setValue('ab')
  await Search.setReplaceValue('')

  // act
  await Command.execute('Search.handleInputCopy', 'SearchValue')

  // assert
}
