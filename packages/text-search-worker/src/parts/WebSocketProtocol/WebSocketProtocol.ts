import * as Protocol from '../Protocol/Protocol.js'

export const getWebSocketProtocol = (): string => {
  return location.protocol === Protocol.Https ? Protocol.Wss : Protocol.Ws
}
