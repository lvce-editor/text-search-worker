import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.regex-invalid-long'

export const test: Test = async ({ Platform, Search, FileSystem, Workspace, SideBar, Locator, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `Abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('(' + 'a'.repeat(100))
  await Search.setReplaceValue('')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('No results found')

  // act
  await Search.toggleUseRegularExpression()

  // assert
  const inputMessage = Locator('.SearchInputError')
  await expect(inputMessage).toBeVisible()
  if (Platform.isFirefox()) {
    await expect(inputMessage).toHaveText('unterminated parenthetical')
  } else {
    await expect(inputMessage).toHaveText('Invalid regular expression: /(ab/u: Unterminated group')
  }
}
