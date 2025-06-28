import type { ConfirmPromptOptions } from '../ConfirmPromptOptions/ConfirmPromptOptions.ts'
import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const prompt = (text: string, options: ConfirmPromptOptions): Promise<boolean> => {
  return Rpc.invoke('ConfirmPrompt.prompt', text, options)
}
