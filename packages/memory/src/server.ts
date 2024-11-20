import express from 'express'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const startServer = async (port: number, cwd: string) => {
  const app = express()

  // Serve static files from provided cwd
  app.use(express.static(cwd))

  // Serve index.html from src directory
  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
  })

  const { promise, resolve } = Promise.withResolvers<void>()
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
    resolve()
  })
  return promise
}
