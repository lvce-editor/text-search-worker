const states = Object.create(null)

export const get = (uid: number): any => {
  return states[uid]
}

export const set = (uid: number, oldState: any, newState: any): void => {
  states[uid] = {
    oldState,
    newState,
  }
}
