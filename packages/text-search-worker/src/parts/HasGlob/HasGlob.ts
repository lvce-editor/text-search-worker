export const hasGlob = (pattern: string): boolean => {
  return pattern.includes('*') || pattern.includes('?') || pattern.includes('[') || pattern.includes('{')
}
