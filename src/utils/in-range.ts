type period = string | number | Date | undefined

export const inRange = (start: period, end: period) =>
  !!end &&
  !!start &&
  new Date() <= new Date(end) &&
  new Date() >= new Date(start)
