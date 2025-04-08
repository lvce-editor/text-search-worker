import type { BulkReplacementEdit } from '../BulkReplacementEdit/BulkReplacementEdit.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'

export interface ConfirmPromptOptions {
  readonly title: string
  readonly confirmMessage: string
}

export interface RendererWorkerApi {
  readonly 'BulkReplacement.applyBulkReplacement': (edits: readonly BulkReplacementEdit[]) => Promise<void>
  readonly 'ClipBoard.writeText': (text: string) => Promise<void>
  readonly 'ConfirmPrompt.prompt': (confirmText: string, options: ConfirmPromptOptions) => Promise<boolean>
  readonly 'ContextMenu.show': (x: number, y: number, id: any, ...args: readonly any[]) => Promise<void>
  readonly 'ExtensionHostTextSearch.executeTextSearchProvider': (scheme: string, query: string) => Promise<readonly SearchResult[]>
  readonly 'Focus.setFocus': (focusKey: number) => Promise<void>
  readonly 'IconTheme.getFileIcon': (options: any) => Promise<string>
  readonly 'Main.openUri': (uri: string, focus?: boolean, props?: any) => Promise<void>
  readonly 'SearchProcess.invoke': (command: string, options: any) => Promise<any>
  // eslint-disable-next-line  @typescript-eslint/prefer-readonly-parameter-types
  readonly 'SendMessagePortToElectron.sendMessagePortToElectron': (port: MessagePort, command: string) => Promise<void>
  readonly 'ExtensionHostTextSearch.textSearchHtml': (scheme: string, root: string, query: string) => Promise<readonly SearchResult[]>
  readonly 'ExtensionHostTextSearch.textSearchFetch': (
    scheme: string,
    root: string,
    query: string,
    options: any,
    assetDir: string,
  ) => Promise<readonly SearchResult[]>
  readonly 'ExtensionHostTextSearch.textSearchMemory': (
    scheme: string,
    root: string,
    query: string,
    options: any,
    assetDir: string,
  ) => Promise<readonly SearchResult[]>
}
