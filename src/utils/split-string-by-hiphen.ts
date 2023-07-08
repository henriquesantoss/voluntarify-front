export const splitStringByHyphen = (str?: string | string[]) =>
  typeof str === 'string' ? str.split('-') : []
