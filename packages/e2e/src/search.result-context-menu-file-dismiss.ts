import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.result-context-menu-file-dismiss'
export const skip = 1

export const test: Test = async ({ Command, expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/a.css`, `abc`)
  await FileSystem.writeFile(`${tmpDir}/b.css`, `abc`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')

  // act
  await Search.handleContextMenu(2, 300, 100)
  const menu = Locator('.Menu')
  const menuItems = menu.locator('.MenuItem')
  const dismiss = menuItems.nth(1)
  await expect(dismiss).toHaveText('Dismiss')
  await Command.execute('TextSearch.removeCurrent')

  // assert
  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  const dismissedFile = Locator('.TreeItem[aria-label="/a.css"]')
  const remainingFile = Locator('.TreeItem[aria-label="/b.css"]')
  await expect(message).toHaveText('1 result in 1 file')
  await expect(dismissedFile).toBeHidden()
  await expect(remainingFile).toBeVisible()
}
