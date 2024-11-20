import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createApp } from './createApp.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

export const startServer = async (port: number, textSearchWorkerPath: string): Promise<void> => {
  const app = createApp(textSearchWorkerPath, root)

  const { promise, resolve } = Promise.withResolvers<void>()
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
    resolve()
  })
  return promise
}
