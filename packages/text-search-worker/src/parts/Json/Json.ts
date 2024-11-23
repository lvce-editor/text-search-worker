import { VError } from '../VError/VError.ts'

export const stringify = (value: any): string => {
  return JSON.stringify(value, null, 2) + '\n'
}

export const stringifyCompact = (value: any): string => {
  return JSON.stringify(value)
}

export const parse = (content: string): any => {
  if (content === 'undefined') {
    return null
  }
  // TODO use better json parse to throw more helpful error messages if json is invalid
  try {
    return JSON.parse(content)
  } catch (error) {
    throw new VError(error, 'failed to parse json')
  }
}
