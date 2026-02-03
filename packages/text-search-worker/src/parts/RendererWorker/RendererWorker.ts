import { RendererWorker } from '@lvce-editor/rpc-registry'

export const {
  confirm,
  dispose,
  getFileIcon,
  getIcons,
  invoke,
  invokeAndTransfer,
  openUri,
  sendMessagePortToSearchProcess,
  set,
  showContextMenu2,
  writeClipBoardText,
} = RendererWorker
