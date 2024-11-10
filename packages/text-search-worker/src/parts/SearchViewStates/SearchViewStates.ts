const states = Object.create(null)

export const get = (uid: number) => {
  return states[uid]
}

export const set = (uid: number, state: any) => {
  states[uid] = state
}
