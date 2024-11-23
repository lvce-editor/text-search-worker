import { VError } from '../VError/VError.ts'
import * as Character from '../Character/Character.ts'

export const stringify = (value) => {
  return JSON.stringify(value, null, 2) + '\n'
}

export const stringifyCompact = (value) => {
  return JSON.stringify(value)
}

export const parse = (content) => {
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
