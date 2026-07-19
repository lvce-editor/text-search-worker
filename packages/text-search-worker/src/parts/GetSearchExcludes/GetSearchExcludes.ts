import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getSearchExcludes = async (): Promise<readonly string[]> => {
  const value = await RendererWorker.getPreference('search.exclude')
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return []
  }
  const excludes: string[] = []
  for (const [pattern, enabled] of Object.entries(value)) {
    if (enabled === true) {
      excludes.push(pattern)
    }
  }
  return excludes
}
