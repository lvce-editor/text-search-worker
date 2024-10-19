import * as DomExceptionType from '../DomExceptionType/DomExceptionType.ts'

export const isNotAllowedError = (error: any) => {
  return error && error.name === DomExceptionType.NotAllowedError
}

export const isNotFoundError = (error: any) => {
  return error && error.name === DomExceptionType.NotFoundError
}

export const isNotReadableError = (error: any) => {
  return error && error.name === DomExceptionType.NotReadableError
}
