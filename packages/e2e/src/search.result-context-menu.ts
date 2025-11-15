import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.result-context-menu'

export const test: Test = async ({ Command, Search, FileSystem, Workspace, SideBar, Locator, expect }) => {
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
  await Search.selectIndex(0)

  // act
  await Command.execute('Search.handleContextMenu', 0, 300, 100)

  // assert
  const menu = Locator('.Menu')
  await expect(menu).toBeVisible()
  const menuItems = menu.locator('.MenuItem')
  await expect(menuItems).toHaveCount(5)
  const first = menuItems.nth(0)
  await expect(first).toHaveText('Replace AllCtrl+ENTER')
  const second = menuItems.nth(1)
  await expect(second).toHaveText('DismissDELETE')
}
