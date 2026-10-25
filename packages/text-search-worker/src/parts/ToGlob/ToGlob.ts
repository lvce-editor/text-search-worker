import * as HasGlob from '../HasGlob/HasGlob.ts'

export const toGlob = (pattern: string): readonly string[] => {
  const args = ['--glob', pattern]
  if (!HasGlob.hasGlob(pattern)) {
    const normalizedPattern = pattern.endsWith('/') ? pattern.slice(0, -1) : pattern
    if (normalizedPattern) {
      args.push('--glob', `${normalizedPattern}/**`)
    }
  }
  return args
}
