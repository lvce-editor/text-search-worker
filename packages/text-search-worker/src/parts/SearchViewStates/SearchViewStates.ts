import type { SearchState } from '../SearchState/SearchState.ts'
import * as ViewletRegistry from '../ViewletRegistry/ViewletRegistry.ts'

export const { get, set, dispose, getKeys } = ViewletRegistry.create<SearchState>()
