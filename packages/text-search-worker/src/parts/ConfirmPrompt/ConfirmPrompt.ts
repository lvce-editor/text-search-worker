import type { ConfirmPromptOptions } from '../RendererWorkerApi/RendererWorkerApi.ts'
import * as Rpc from '../ParentRpc/ParentRpc.ts'

export const prompt = (text: string, options: ConfirmPromptOptions): Promise<boolean> => {
  return Rpc.invoke('ConfirmPrompt.prompt', text, options)
}
