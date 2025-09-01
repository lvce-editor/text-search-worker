import { RendererWorker } from '@lvce-editor/rpc-registry'

export const {
  confirm,
  dispose,
  getFileIcon,
  invoke,
  invokeAndTransfer,
  openUri,
  sendMessagePortToSearchProcess,
  set,
  showContextMenu,
  writeClipBoardText,
  registerMockRpc,
} = RendererWorker
