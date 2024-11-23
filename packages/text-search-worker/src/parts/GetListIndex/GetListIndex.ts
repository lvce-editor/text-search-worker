export const getListIndex = (eventX: number, eventY: number, x: number, y: number, deltaY: number, itemHeight: number, topHeight: number): number => {
  const relativeY = eventY - y - topHeight + deltaY
  const index = Math.floor(relativeY / itemHeight)
  return index
}
