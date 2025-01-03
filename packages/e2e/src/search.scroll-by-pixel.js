export const name = 'search.scroll-by-pixel'

export const skip = 1

export const test = async ({ Search, FileSystem, Workspace, SideBar, Locator, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  const promises = []
  for (let i = 0; i < 100; i++) {
    promises.push(FileSystem.writeFile(`${tmpDir}/${i}.css`, `abc`))
  }
  await Promise.all(promises)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  await Search.setReplaceValue('')
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  await expect(message).toHaveText('100 results in 100 files')
  const result = Locator('.TreeItem[aria-label="/test.css"]')
  await expect(result).toHaveAttribute('aria-expanded', 'true')
  const match = Locator('.TreeItem[aria-label="abc"]')
  await expect(match).toBeVisible()

  // act
  await Search.handleWheel(1, 1)

  // assert
  const treeItems = Locator('.TreeItems')
  await expect(treeItems).toHaveCss('top', '-1px')
}
