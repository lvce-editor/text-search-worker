import { spawn } from 'child_process'

export const spawnRipGrep = (args: readonly string[], cwd: string) => {
  return spawn('rg', args, {
    cwd,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
}
