export interface Protocol {
  send: (method: string, params?: any, sessionId?: string) => Promise<any>
  close: () => void
  addEventListener: (event: string, listener: (event: CustomEvent) => void) => void
  removeEventListener: (event: string, listener: (event: CustomEvent) => void) => void
}
