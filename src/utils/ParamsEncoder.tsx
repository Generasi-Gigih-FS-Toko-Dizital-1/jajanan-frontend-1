export const paramsEncoder = (params: any): string => {
  return encodeURIComponent(JSON.stringify(params))
}
