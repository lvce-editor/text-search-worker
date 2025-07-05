export const waitForNextFrame = async (): Promise<void> => {
  const { resolve, promise } = Promise.withResolvers<DOMHighResTimeStamp>()
  requestAnimationFrame(resolve)
  await promise
}
