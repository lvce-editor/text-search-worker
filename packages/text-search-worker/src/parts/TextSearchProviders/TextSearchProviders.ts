import type { TextSearchProvider } from '../TextSearchProvider/TextSearchProvider.ts'

const providers = Object.create(null)

export const add = (providerMap: Record<string, TextSearchProvider>): void => {
  Object.assign(providers, providerMap)
}

export const get = (protocol: string): TextSearchProvider => {
  return providers[protocol] || providers['default']
}

export const reset = (): void => {
  for (const key of Object.keys(providers)) {
    delete providers[key]
  }
}

export const set = (providerMap: Record<string, TextSearchProvider>): void => {
  reset()
  add(providerMap)
}
