export const name = 'search.replace-regex'

export const skip = 1

export const test = async ({ Main, Search, FileSystem, Workspace, SideBar, Locator, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('a.c')
  await Search.setReplaceValue('adc')
  await Search.toggleUseRegularExpression()
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')

  // act
  await Search.replaceAll()
  await Main.openUri(`${tmpDir}/test.css`)

  // assert
  const row = Locator('.EditorRow')
  await expect(row).toHaveText('adc')
}
