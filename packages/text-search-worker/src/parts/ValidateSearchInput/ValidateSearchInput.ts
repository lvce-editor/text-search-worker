// Based on https://github.com/microsoft/vscode/blob/ad375c92764b72a1f28f3e1626563e9e41e5c740/src/vs/workbench/contrib/search/browser/searchWidget.ts#L393 by Microsoft (License MIT)

export const validateSearchInput = (value: string, useRegularExpression: number): string => {
  if (value.length === 0) {
    return ''
  }
  if (!useRegularExpression) {
    return ''
  }
  try {
    new RegExp(value, 'u')
  } catch (error) {
    if (error && error instanceof Error) {
      return error.message
    }
    return ''
  }
  return ''
}
