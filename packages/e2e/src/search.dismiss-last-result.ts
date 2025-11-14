import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.dismiss-last-result'

export const test: Test = async ({ Search, FileSystem, Workspace, SideBar, Locator, expect }) => {
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
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('No results found')
}
