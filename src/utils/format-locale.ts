import { format as fnsFormat } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatLocale = (date: string | Date | number, format: string) => {
  if (!date) return ''
  if (typeof date === 'string' && date.match(/^\d{4}-\d{2}\-\d{2}$/)) {
    date = date + 'T00:00:00'
  }
  return fnsFormat(new Date(date), format, {
    locale: ptBR,
  })
}
