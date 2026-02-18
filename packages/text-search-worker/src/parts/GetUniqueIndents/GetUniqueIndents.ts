import { getUnique } from '../GetUnique/GetUnique.ts'

const getIndent = (item: any): number => item.indent

export const getUniqueIndents = (items: readonly any[]): readonly number[] => {
  const indents = items.map(getIndent)
  const uniqueIndents = getUnique(indents)
  return uniqueIndents
}
