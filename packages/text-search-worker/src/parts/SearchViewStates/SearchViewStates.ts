import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { SearchState } from '../SearchState/SearchState.ts'

export const { get, set, wrapCommand, registerCommands, getCommandIds } = ViewletRegistry.create<SearchState>()
