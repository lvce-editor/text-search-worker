import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.input-paste'

export const skip = 1

export const test: Test = async ({ ClipBoard, Command, Search, FileSystem, Workspace, Locator, expect }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  await Command.execute('ClipBoard.writeText', 'ab')
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await Search.open()
  await Search.setValue('')
  await Search.setReplaceValue('')

  // act
  Command.execute('Search.handleInputPaste', 'SearchValue')

  // assert
  // TODO verify that input has pasted text
}
