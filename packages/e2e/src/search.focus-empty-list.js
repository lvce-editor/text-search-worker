export const name = 'search.focus-empty-list'

/**
 * @param {import('@lvce-editor/test-with-playwright').Test} param0
 */
export const test = async ({ Main, Search, FileSystem, Workspace, SideBar, Locator, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('')

  // act
  await Search.selectIndex(-1)

  // assert
  const tree = Locator('.Tree')
  await expect(tree).toHaveClass('FocusOutline')
}
