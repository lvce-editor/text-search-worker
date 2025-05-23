export const create = ({
  itemHeight,
  headerHeight = 0,
  minimumSliderSize = 20,
}: {
  readonly itemHeight: number
  readonly headerHeight: number
  readonly minimumSliderSize: number
}): any => {
  return {
    deltaY: 0,
    minLineY: 0,
    maxLineY: 0,
    finalDeltaY: 0,
    itemHeight,
    headerHeight,
    items: [],
    listItems: [],
    minimumSliderSize,
    focusedIndex: -1,
    touchOffsetY: 0,
    touchTimeStamp: 0,
    touchDifference: 0,
    scrollBarHeight: 0,
    scrollBarActive: false,
  }
}
