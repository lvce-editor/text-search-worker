import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.result-context-menu'
export const skip = 1

export const test: Test = async ({ expect, FileSystem, Locator, Search, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.css`, `abc\nabx`)
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('ab')
  await Search.toggleReplace()
  await Search.setReplaceValue('d')

  // act
  await Search.handleContextMenu(2, 300, 100)

  // assert
  const fileMenu = Locator('.Menu')
  await expect(fileMenu).toBeVisible()
  const fileMenuItems = fileMenu.locator('.MenuItem')
  const replaceAll = fileMenuItems.nth(0)
  const fileDismiss = fileMenuItems.nth(1)
  const fileCopy = fileMenuItems.nth(2)
  const copyPath = fileMenuItems.nth(3)
  const fileCopyAll = fileMenuItems.nth(4)
  await expect(fileMenuItems).toHaveCount(5)
  await expect(replaceAll).toHaveText('Replace All')
  await expect(fileDismiss).toHaveText('Dismiss')
  await expect(fileCopy).toHaveText('Copy')
  await expect(copyPath).toHaveText('Copy Path')
  await expect(fileCopyAll).toHaveText('Copy All')

  await Search.handleContextMenu(2, 300, 124)

  const matchMenu = Locator('.Menu')
  await expect(matchMenu).toBeVisible()
  const matchMenuItems = matchMenu.locator('.MenuItem')
  const matchDismiss = matchMenuItems.nth(0)
  const matchCopy = matchMenuItems.nth(1)
  const matchCopyAll = matchMenuItems.nth(2)
  await expect(matchMenuItems).toHaveCount(3)
  await expect(matchDismiss).toHaveText('Dismiss')
  await expect(matchCopy).toHaveText('Copy')
  await expect(matchCopyAll).toHaveText('Copy All')
}
