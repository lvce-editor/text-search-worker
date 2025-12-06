export const getRipGrepArgs = ({
  isCaseSensitive,
  searchString,
  threads,
  useRegularExpression,
}: {
  readonly threads: number
  readonly isCaseSensitive: boolean
  readonly searchString: string
  readonly useRegularExpression: boolean
}): readonly string[] => {
  const ripGrepArgs = ['--hidden', '--no-require-git', '--smart-case', '--stats', '--json', '--threads', `${threads}`]
  if (isCaseSensitive) {
    ripGrepArgs.push('--case-sensitive')
  } else {
    ripGrepArgs.push('--ignore-case')
  }
  if (useRegularExpression) {
    ripGrepArgs.push('--regexp', searchString)
  } else {
    ripGrepArgs.push('--fixed-strings')
    ripGrepArgs.push('--')
    ripGrepArgs.push(searchString)
  }
  ripGrepArgs.push('.')
  return ripGrepArgs
}
