import * as Assert from '../Assert/Assert.ts'
import * as AssetDir from '../AssetDir/AssetDir.ts'
import * as GetJson from '../GetJson/GetJson.ts'
import * as GetText from '../GetText/GetText.ts'
import * as SplitLines from '../SplitLines/SplitLines.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

const textSearchInFile = (file: string, content: string, query: string) => {
  const results: any[] = []
  const lines = SplitLines.splitLines(content)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const index = line.indexOf(query)
    if (index !== -1) {
      results.push({
        type: TextSearchResultType.Match,
        text: line,
        start: index,
        end: index + query.length,
        lineNumber: i,
      })
    }
  }
  if (results.length > 0) {
    results.unshift({
      type: TextSearchResultType.File,
      text: file,
      start: 0,
      end: 0,
      lineNumber: 0,
    })
  }
  return results
}

export const textSearch = async (scheme: string, root: string, query: string, options: any) => {
  Assert.string(scheme)
  Assert.string(root)
  Assert.string(query)
  const fetchUri = `${AssetDir.assetDir}/config/fileMap.json`
  const fileList = await GetJson.getJson(fetchUri)
  const allResults: any[] = []
  const relativeRoot = root.slice('fetch://'.length)
  for (const uri of fileList) {
    const fetchUri = `${AssetDir.assetDir}${uri}`
    const content = await GetText.getText(fetchUri)
    const relativeUri = uri.slice(relativeRoot.length + 1)
    const results = textSearchInFile(relativeUri, content, query)
    allResults.push(...results)
  }
  return allResults
}
