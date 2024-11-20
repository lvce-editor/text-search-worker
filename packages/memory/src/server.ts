import express from 'express'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

export const startServer = async (port: number, textSearchWorkerPath: string): Promise<void> => {
  const app = express()

  // Serve worker file
  app.get('/dist/textSearchWorkerMain.js', (req, res) => {
    res.sendFile(textSearchWorkerPath)
  })

  // Serve index.html from root directory
  app.get('/', (req, res) => {
    res.sendFile(join(root, 'index.html'))
  })

  const { promise, resolve } = Promise.withResolvers<void>()
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
    resolve()
  })
  return promise
}
