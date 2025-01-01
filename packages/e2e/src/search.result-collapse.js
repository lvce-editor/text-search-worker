export const name = 'search.result-collapse'

export const skip = 1

export const test = async ({ Search, FileSystem, Workspace, SideBar, Locator, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  await Search.setReplaceValue('')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('1 result in 1 file')
  const result = Locator('.TreeItem[aria-label="/test.css"]')
  await expect(result).toHaveAttribute('aria-expanded', 'true')
  const match = Locator('.TreeItem[aria-label="abc"]')
  await expect(match).toBeVisible()

  // act
  await Search.selectIndex(0)

  // assert
  await expect(result).toHaveAttribute('aria-expanded', 'false')
  await expect(match).toBeHidden()
}
