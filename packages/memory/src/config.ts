import { join } from 'node:path'
import { root } from './root.ts'

export const threshold = 530_000

export const instantiations = 10_000

export const instantiationsPath = join(root, 'packages', 'text-search-worker')

export const workerPath = join(root, '.tmp/dist/dist/textSearchWorkerMain.js')

export const playwrightPath = new URL('../../e2e/node_modules/playwright/index.mjs', import.meta.url).toString()
