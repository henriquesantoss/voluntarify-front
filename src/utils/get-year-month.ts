import { addMonths } from 'date-fns'
import { formatLocale } from './format-locale'

export const getYearMonth = (date?: string | Date | number) =>
  Number(formatLocale(date || new Date(), 'yyyyMM'))

export const getCurrentYear = (date?: string | Date | number) =>
  Number(formatLocale(date || new Date(), 'yyyy'))

export const getCurrentMonth = (date?: string | Date | number) =>
  Number(formatLocale(date || new Date(), 'MM'))

export const getNextYearMonth = (date?: string | Date | number) =>
  Number(
    formatLocale(addMonths(date ? new Date(date) : new Date(), 1), 'yyyyMM'),
  )

export const dateInWords = (yearMonth: string) =>
  formatLocale(
    yearMonth.slice(0, 4) + '-' + yearMonth.slice(4) + '-02',
    'MMMM/yyyy',
  )
