import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.copy'

export const test: Test = async ({ Command, ClipBoard, Search, FileSystem, Workspace, SideBar, Locator, expect }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  await Search.focusIndex(1)

  // act
  await Command.execute(`Search.copy`)

  // assert
  await ClipBoard.shouldHaveText('abc')
}
