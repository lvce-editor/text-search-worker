interface MinMaxResult {
  newDeltaY: number
  newMinLineY: number
  newMaxLineY: number
}

export const getNewMinMax = (newItemsLength: number, minLineY: number, maxLineY: number, deltaY: number, itemHeight: number): MinMaxResult => {
  if (maxLineY > newItemsLength) {
    const diff = maxLineY - minLineY
    const newMinLineY = Math.max(newItemsLength - diff, 0)
    const newDeltaY = newMinLineY * itemHeight
    return {
      newDeltaY,
      newMinLineY,
      newMaxLineY: newItemsLength,
    }
  }
  return {
    newDeltaY: deltaY,
    newMinLineY: minLineY,
    newMaxLineY: maxLineY,
  }
}
