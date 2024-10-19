import * as Command from '../Command/Command.ts'

export const getText = (file: any) => {
  return file.text()
}

export const getBinaryString = (file: any) => {
  return Command.execute('Blob.blobToBinaryString', file)
}
