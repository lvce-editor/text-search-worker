import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.copy-path'

export const skip = 1

export const test: Test = async ({ Command, ClipBoard, Search, FileSystem, Workspace, SideBar }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  await Search.focusIndex(0)

  // act
  await Command.execute(`Search.copyPath`)

  // assert
  await ClipBoard.shouldHaveText('memfs:///test.css')
}
