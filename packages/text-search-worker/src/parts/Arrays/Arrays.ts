// based on https://github.com/microsoft/vscode/blob/c0769274fa136b45799edeccc0d0a2f645b75caf/src/vs/base/common/arrays.ts#L625 (License MIT)

const insertInto = (array: any, start: any, newItems: any): void => {
  const originalLength = array.length
  const newItemsLength = newItems.length
  array.length = originalLength + newItemsLength
  // Move the items after the start index, start from the end so that we don't overwrite any value.
  for (let i = originalLength - 1; i >= start; i--) {
    array[i + newItemsLength] = array[i]
  }

  for (let i = 0; i < newItemsLength; i++) {
    array[i + start] = newItems[i]
  }
}

export const push = (array: any, newItems: any): void => {
  insertInto(array, array.length, newItems)
}

export const isLastIndex = (array: any, index: number): boolean => {
  return index === array.length - 1
}

export const lastIndex = (array: any): number => {
  return array.length - 1
}

const toSpliced = (array: any, index: number, deleteCount: number, ...inserted: any[]): readonly any[] => {
  return [...array.slice(0, index), ...inserted, ...array.slice(index + deleteCount)]
}

export const remove = (array: readonly any[], index: number, deleteCount: number): readonly any[] => {
  return toSpliced(array, index, deleteCount)
}
