import { execa } from 'execa'
import { root } from './root.ts'

const watchArgs = [
  'exec',
  '--workspace=packages/build',
  '--',
  'esbuild',
  '--format=esm',
  '--bundle',
  '--external:node:buffer',
  '--external:electron',
  '--external:ws',
  '--external:node:worker_threads',
  '--watch',
  '../text-search-worker/src/textSearchWorkerMain.ts',
  '--outfile=../../.tmp/dist/dist/textSearchWorkerMain.js',
]

const main = async (): Promise<void> => {
  await execa('npm', ['run', 'build'], {
    cwd: root,
    stdio: 'inherit',
  })
  execa('npm', watchArgs, {
    cwd: root,
    stdio: 'inherit',
  })
  execa('node', ['packages/server/src/server.js'], {
    cwd: root,
    stdio: 'inherit',
  })
}

main()
