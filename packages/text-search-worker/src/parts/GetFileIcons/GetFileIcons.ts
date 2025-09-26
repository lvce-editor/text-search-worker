import { DirentType } from '@lvce-editor/constants'
import type { IconRequest } from '../IconRequest/IconRequest.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

const getFileName = (text: string): string => {
  if (text.startsWith('./')) {
    return text.slice(2)
  }
  return text
}

export const getFileIcons = async (matches: readonly SearchResult[]): Promise<readonly string[]> => {
  const requests: IconRequest[] = []
  for (const item of matches) {
    if (item.type === TextSearchResultType.File) {
      const fileName = getFileName(item.text)
      requests.push({
        type: DirentType.File,
        name: fileName,
        path: `/${fileName}`,
      })
    }
  }
  const icons = await RendererWorker.getIcons(requests)
  // TODO cache file icons
  return icons
}
