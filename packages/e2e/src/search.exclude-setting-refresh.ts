import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'search.exclude-setting-refresh'

export const test: Test = async ({ Command, expect, FileSystem, Locator, Search, Settings, SideBar, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.mkdir(`${tmpDir}/excluded`)
  await FileSystem.mkdir(`${tmpDir}/included`)
  await FileSystem.writeFile(`${tmpDir}/excluded/result.txt`, `needle`)
  await FileSystem.writeFile(`${tmpDir}/included/result.txt`, `needle`)
  await Settings.update({ 'search.exclude': {} })
  await Workspace.setPath(tmpDir)
  await SideBar.open('Search')
  await Search.setValue('needle')

  const viewletSearch = Locator('.Search')
  const message = viewletSearch.locator('[role="status"]')
  const excludedResult = viewletSearch.locator('.TreeItem[aria-label="/excluded/result.txt"]')
  const includedResult = viewletSearch.locator('.TreeItem[aria-label="/included/result.txt"]')
  await expect(message).toHaveText('2 results in 2 files')
  await expect(excludedResult).toBeVisible()
  await expect(includedResult).toBeVisible()

  // act
  await Settings.update({ 'search.exclude': { '**/excluded': true } })
  const configuredExcludes = await Command.execute('Preferences.get', 'search.exclude')
  if (configuredExcludes?.['**/excluded'] !== true) {
    throw new Error(`Expected updated search.exclude preference but received ${JSON.stringify(configuredExcludes)}`)
  }
  await Command.execute('Search.refresh')
  const effectiveExcludes = await Command.execute('Search.getDefaultExcludes')
  if (!effectiveExcludes.includes('**/excluded')) {
    throw new Error(`Expected updated worker excludes but received ${JSON.stringify(effectiveExcludes)}`)
  }

  // assert
  await expect(message).toHaveText('1 result in 1 file')
  await expect(excludedResult).toBeHidden()
  await expect(includedResult).toBeVisible()
}
