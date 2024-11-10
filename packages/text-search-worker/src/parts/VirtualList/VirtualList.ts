export const create = ({
  itemHeight,
  headerHeight = 0,
  minimumSliderSize = 20,
}: {
  itemHeight: number
  headerHeight: number
  minimumSliderSize: number
}) => {
  return {
    deltaY: 0,
    minLineY: 0,
    maxLineY: 0,
    finalDeltaY: 0,
    itemHeight,
    headerHeight,
    items: [],
    minimumSliderSize,
    focusedIndex: -1,
    touchOffsetY: 0,
    touchTimeStamp: 0,
    touchDifference: 0,
    scrollBarHeight: 0,
    scrollBarActive: false,
  }
}
