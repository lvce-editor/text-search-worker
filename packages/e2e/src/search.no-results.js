export const name = 'search.no-results'

/**
 * @param {import('@lvce-editor/test-with-playwright').Test} param0
 */
export const test = async ({ Search, FileSystem, Workspace, SideBar, Main, Locator, Editor, expect }) => {
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
  await expect(message).toHaveText('No results found')
}
