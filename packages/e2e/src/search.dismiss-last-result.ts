import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.dismiss-last-result'

export const skip = 1

export const test: Test = async ({ Search, FileSystem, Workspace, SideBar }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  await Search.focusIndex(0)

  // act
  await Search.dismissItem()

  // assert
  // await ClipBoard.shouldHaveText('test.css')
}
