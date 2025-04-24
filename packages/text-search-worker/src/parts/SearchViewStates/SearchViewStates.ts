import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { SearchState } from '../SearchState/SearchState.ts'

export const { get, set, dispose, getKeys, wrapCommand } = ViewletRegistry.create<SearchState>()
