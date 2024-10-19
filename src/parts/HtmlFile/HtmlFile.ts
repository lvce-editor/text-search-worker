import * as Command from '../Command/Command.ts'

export const getBinaryString = (file: any) => {
  return Command.execute('Blob.blobToBinaryString', file)
}
