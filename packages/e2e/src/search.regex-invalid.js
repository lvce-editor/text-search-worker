export const name = 'search.regex-invalid'

/**
 * @param {import('@lvce-editor/test-with-playwright').Test} param0
 */
export const test = async ({ Search, FileSystem, Workspace, SideBar, Locator, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `Abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('(ab')
  await Search.setReplaceValue('')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('No results found')

  // act
  await Search.toggleUseRegularExpression()

  // assert
  const inputMessage = Locator('.SearchInputError')
  await expect(inputMessage).toBeVisible()
  await expect(inputMessage).toHaveText('Invalid regular expression: /(ab/u: Unterminated group')
}
