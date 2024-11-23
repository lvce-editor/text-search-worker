export const getFirstEvent = (eventTarget: EventTarget, eventMap: any): any => {
  const { resolve, promise } = Promise.withResolvers()
  const listenerMap = Object.create(null)
  const cleanup = (value: any): void => {
    for (const event of Object.keys(eventMap)) {
      eventTarget.removeEventListener(event, listenerMap[event])
    }
    resolve(value)
  }
  for (const [event, type] of Object.entries(eventMap)) {
    const listener = (event: any): void => {
      cleanup({
        type,
        event,
      })
    }
    eventTarget.addEventListener(event, listener)
    listenerMap[event] = listener
  }
  return promise
}
