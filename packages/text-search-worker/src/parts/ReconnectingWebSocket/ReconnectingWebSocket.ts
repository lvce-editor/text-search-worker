export const create = (url: string, args?: any): any => {
  const webSocket = new WebSocket(url, args)

  const reconnect = () => {
    const originalOnMessage = context.webSocket.onmessage
    context.webSocket = new WebSocket(url, args)
    context.webSocket.onmessage = originalOnMessage
    context.webSocket.onclose = handleClose
  }

  const handleClose = () => {
    setTimeout(reconnect, 2000)
  }

  const context = {
    webSocket,
    get onmessage() {
      return this.webSocket.onmessage
    },
    set onmessage(value) {
      this.webSocket.onmessage = value
    },
    send(message: any) {
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
