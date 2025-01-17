export const name = 'search.match-whole-word'

export const skip = true

/**
 * @param {import('@lvce-editor/test-with-playwright').Test} param0
 */
export const test = async ({ Search, FileSystem, Workspace, SideBar, Locator, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `Abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('abc')
  await Search.setReplaceValue('')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')

  // act
  await Search.toggleMatchWholeWord()

  // assert
  await expect(message).toHaveText('No results found')
}
