import type { TextSearchProvider } from '../TextSearchProvider/TextSearchProvider.ts'
import * as TextSearchNode from '../TextSearchNode/TextSearchNode.ts'

export const textSearch: TextSearchProvider = async (_scheme, root, query, options, assetDir, platform, searchId, uid) => {
  const workspace = new URL(root)
  const openEditorUris = options.openEditorUris?.flatMap((uri: string) => {
    if (!uri.startsWith('remote-ssh://')) {
      return []
    }
    const editor = new URL(uri)
    if (editor.host !== workspace.host || editor.username !== workspace.username) {
      return []
    }
    return [decodeURIComponent(editor.pathname)]
  })
  return TextSearchNode.textSearch(
    'file',
    decodeURIComponent(workspace.pathname),
    query,
    { ...options, ...(openEditorUris && { openEditorUris }) },
    assetDir,
    platform,
    searchId,
    uid,
  )
}
