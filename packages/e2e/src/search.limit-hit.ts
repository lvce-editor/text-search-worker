import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.limit-hit'

export const skip = 1

export const test: Test = async ({ Search, FileSystem, Workspace, SideBar, Locator, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc\n`.repeat(1000))
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  // act
  await Search.setValue('ab')

  // assert
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('1000 result in 1 file')
}
