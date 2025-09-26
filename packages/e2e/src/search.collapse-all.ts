import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.collapse-all'

export const skip = 1

export const test: Test = async ({ Command, Search, FileSystem, Workspace, SideBar, Locator, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')

  // act
  await Command.execute('Search.collapseAll')

  // assert
  const text = Locator(`.TreeItem[aria-label="abc"]`)
  await expect(text).toBeHidden()
}
