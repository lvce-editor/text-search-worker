import * as DomExceptionType from '../DomExceptionType/DomExceptionType.ts'

export const isNotReadableError = (error: any) => {
  return error && error.name === DomExceptionType.NotReadableError
}
