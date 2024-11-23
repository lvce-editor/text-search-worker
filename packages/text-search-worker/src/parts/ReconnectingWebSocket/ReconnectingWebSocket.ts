export const create = (url: string, args?: any): any => {
  const webSocket = new WebSocket(url, args)

  const reconnect = (): void => {
    const originalOnMessage = context.webSocket.onmessage
    context.webSocket = new WebSocket(url, args)
    context.webSocket.onmessage = originalOnMessage
    context.webSocket.onclose = handleClose
  }

  const handleClose = (): void => {
    setTimeout(reconnect, 2000)
  }

  const context = {
    webSocket,
    get onmessage(): any {
      return this.webSocket.onmessage
    },
    set onmessage(value: any) {
      this.webSocket.onmessage = value
    },
    send(message: any): void {
      this.webSocket.send(message)
    },
    addEventListener(type: any, listener: any): any {
      this.webSocket.addEventListener(type, listener)
    },
    removeEventListener(type: any, listener: any): any {
      this.webSocket.removeEventListener(type, listener)
    },
  }

  webSocket.onclose = handleClose
  return context
}
