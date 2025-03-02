import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.toggle-details'

export const skip = 1

export const test: Test = async ({ Main, Search, FileSystem, Workspace, SideBar, Locator, expect }) => {
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
  await Search.toggleSearchDetails()

  // assert

  // act
  await Search.toggleSearchDetails()

  // assert
}
