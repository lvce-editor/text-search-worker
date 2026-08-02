const getContextArgs = (contextLines?: number): readonly string[] => {
  if (contextLines && contextLines > 0) {
    return ['--context', `${Math.trunc(contextLines)}`]
  }
  return []
}

const getIncludeArgs = (include?: string): readonly string[] => {
  return (include || '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .flatMap((pattern) => ['--glob', pattern])
}

export const getRipGrepArgs = ({
  contextLines,
  defaultExcludes,
  exclude,
  include,
  isCaseSensitive,
  matchWholeWord,
  paths,
  searchString,
  threads,
  useIgnoreFiles = true,
  useRegularExpression,
}: {
  readonly contextLines?: number
  readonly defaultExcludes?: readonly string[]
  readonly exclude?: string
  readonly include?: string
  readonly paths?: readonly string[]
  readonly threads: number
  readonly isCaseSensitive: boolean
  readonly matchWholeWord?: boolean
  readonly searchString: string
  readonly useIgnoreFiles?: boolean
  readonly useRegularExpression: boolean
}): readonly string[] => {
  const ripGrepArgs = [
    '--hidden',
    '--no-require-git',
    '--smart-case',
    '--stats',
    '--json',
    '--threads',
    `${threads}`,
    ...getContextArgs(contextLines),
  ]
  if (!useIgnoreFiles) {
    ripGrepArgs.push('--no-ignore')
  }
  const excludePatternsFromValue = exclude
    ? exclude
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)
    : []
  const excludePatternsFromDefaults = defaultExcludes?.filter(Boolean) || []
  const uniqueExcludePatterns = [...new Set([...excludePatternsFromDefaults, ...excludePatternsFromValue])]
  for (const excludePattern of uniqueExcludePatterns) {
    if (excludePattern.includes('*')) {
      ripGrepArgs.push('--glob', `!${excludePattern}`)
      if (!excludePattern.endsWith('/**')) {
        ripGrepArgs.push('--glob', `!${excludePattern}/**`)
      }
    } else {
      ripGrepArgs.push('--glob', `!**/${excludePattern}/**`)
    }
  }
  ripGrepArgs.push(...getIncludeArgs(include))
  if (isCaseSensitive) {
    ripGrepArgs.push('--case-sensitive')
  } else {
    ripGrepArgs.push('--ignore-case')
  }
  if (matchWholeWord) {
    ripGrepArgs.push('--word-regexp')
  }
  if (useRegularExpression) {
    ripGrepArgs.push('--regexp', searchString)
  } else {
    ripGrepArgs.push('--fixed-strings')
    ripGrepArgs.push('--')
    ripGrepArgs.push(searchString)
  }
  ripGrepArgs.push(...(paths || ['.']))
  return ripGrepArgs
}
