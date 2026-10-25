import * as ToGlob from '../ToGlob/ToGlob.ts'
import * as TrimPart from '../TrimPart/TrimPart.ts'

export const getIncludeArgs = (include?: string): readonly string[] => {
  return (include || '').split(',').map(TrimPart.trimPart).filter(Boolean).flatMap(ToGlob.toGlob)
}
