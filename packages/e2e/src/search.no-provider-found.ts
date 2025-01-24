import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.no-provider-found'

export const skip = 1

export const test: Test = async ({ Search, FileSystem, Workspace, SideBar, Main, Locator, Editor, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')

  // act
  await Search.setValue('Doc')

  // assert
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('Error: Failed to execute text search provider: No text search provider for memfs found')
}
