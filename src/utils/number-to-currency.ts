export const numberToCurrency = (price: number, currency = 'BRL') =>
  price.toLocaleString('pt-BR', {
    style: 'currency',
    currency,
  })
