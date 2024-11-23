import * as GetData from '../GetData/GetData.ts'
import * as GetPortTuple from '../GetPortTuple/GetPortTuple.ts'
import * as IpcParentWithWebSocket from '../IpcParentWithWebSocket/IpcParentWithWebSocket.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as SendMessagePortToElectron from '../SendMessagePortToElectron/SendMessagePortToElectron.ts'

export const create = async (options: any): Promise<any> => {
  switch (options.platform) {
    case PlatformType.Web:
    case PlatformType.Remote:
      const module = IpcParentWithWebSocket
      const rawIpc = await module.create(options)
      if (options.raw) {
        return rawIpc
      }
      return {
        rawIpc,
        module,
      }
    case PlatformType.Electron:
      const { port1, port2 } = GetPortTuple.getPortTuple()
      await SendMessagePortToElectron.sendMessagePortToElectron(port2, options.initialCommand, options.ipcId)
      return port1
    default:
      throw new Error('unsupported platform')
  }
}

export const wrap = (port: any): any => {
  if (!(port instanceof MessagePort)) {
    return port.module.wrap(port.rawIpc)
  }
  return {
    port,
    /**
     * @type {any}
     */
    listener: undefined,
    get onmessage(): any {
      return this.listener
    },
    set onmessage(listener: any) {
      this.listener = listener
      const wrappedListener = (event: any): void => {
        const data = GetData.getData(event)
        const syntheticEvent = {
          data,
          target: this,
        }
        listener(syntheticEvent)
      }
      this.port.onmessage = wrappedListener
    },
    send(message: any): void {
      this.port.postMessage(message)
    },
    sendAndTransfer(message: any, transfer: any): void {
      this.port.postMessage(message, transfer)
    },
  }
}
