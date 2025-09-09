import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.limit-hit'

export const skip = 1

export const test: Test = async ({ Command, Search, FileSystem, Workspace, SideBar, Locator, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc\n`.repeat(10))
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('10 result in 1 file')

  // act
  await Command.execute('Search.setLimit', 5)

  // assert
  const warningMessage = Locator('.SearchWarningMessage')
  await expect(warningMessage).toBeVisible()
  await expect(warningMessage).toHaveText('Limit was hit')
}
