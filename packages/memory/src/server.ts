import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { readFile } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const startServer = async (port: number) => {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url!, `http://localhost:${port}`)
      let filePath: string

      if (url.pathname === '/') {
        filePath = join(__dirname, 'index.html')
      } else {
        filePath = join(process.cwd(), url.pathname)
      }

      const content = await readFile(filePath)
      const ext = filePath.split('.').pop()

      const contentTypes: Record<string, string> = {
        html: 'text/html',
        js: 'application/javascript',
        ts: 'application/javascript',
      }

      res.setHeader('Content-Type', contentTypes[ext!] || 'text/plain')
      res.end(content)
    } catch (error) {
      res.statusCode = 404
      res.end('Not found')
    }
  })

  return new Promise<void>((resolve) => {
    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`)
      resolve()
    })
  })
}
