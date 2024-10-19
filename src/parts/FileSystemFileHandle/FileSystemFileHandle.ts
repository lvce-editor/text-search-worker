import * as HtmlFile from '../HtmlFile/HtmlFile.ts'

/**
 *
 * @param {FileSystemFileHandle} handle
 * @returns
 */
export const getFile = (handle: any) => {
  return handle.getFile()
}

/**
 *
 * @param {FileSystemFileHandle} handle
 * @returns
 */
export const getBinaryString = async (handle: any) => {
  const file = await getFile(handle)
  const text = await HtmlFile.getBinaryString(file)
  return text
}

/**
 *
 * @param {FileSystemFileHandle} handle
 * @param {string} content
 */
export const write = async (handle: any, content: string) => {
  // @ts-ignore
  const writable = await handle.createWritable()
  await writable.write(content)
  await writable.close()
}

export const writeResponse = async (handle: FileSystemFileHandle, response: Response) => {
  // @ts-ignore
  const writable = await handle.createWritable()
  // @ts-ignore
  await response.body.pipeTo(writable)
}
