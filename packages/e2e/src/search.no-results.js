export const name = 'search.no-results'

export const test = async ({ FileSystem, Workspace, Main, Locator, Editor, expect }) => {
  // TODO add search no results test

    // arrange
    const tmpDir = await FileSystem.getTmpDir()
    await FileSystem.writeFile(`${tmpDir}/test.css`, ` `)
    await Workspace.setPath(tmpDir)

    // act
    await Main.openUri(`${tmpDir}/test.css`)
    await Editor.setCursor(0, 0)
    await Editor.openCompletion()


    // assert
}
