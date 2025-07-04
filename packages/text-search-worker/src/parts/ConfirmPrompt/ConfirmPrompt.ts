import type { ConfirmPromptOptions } from '../ConfirmPromptOptions/ConfirmPromptOptions.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const prompt = (text: string, options: ConfirmPromptOptions): Promise<boolean> => {
  return RendererWorker.invoke('ConfirmPrompt.prompt', text, options)
}
