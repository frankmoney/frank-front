import React from 'react'
import CurrencyContext from 'contexts/CurrencyContext'

export const CURRENCY_INFO = {
  USD: {
    code: 'USD',
    symbol: '$',
    position: 'before',
  },
  RUB: {
    code: 'RUB',
    symbol: '₽',
    position: 'after',
  },
}

export const defaultFormatter = (value, precision = 2, abs = false) => {
  const fixed = value.toFixed(precision)
  const format = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: precision,
  })
  return format.format(
    abs && (fixed[0] === '-' || fixed[0] === '+') ? fixed.substr(1) : fixed
  )
}

const CurrencyProvider = ({ code, formatter, children }) => (
  <CurrencyContext.Consumer>
    {(context = {}) => (
      <CurrencyContext.Provider
        value={{
          ...context,
          ...CURRENCY_INFO[code],
          formatter: formatter || context.formatter || defaultFormatter,
        }}
      >
        {children}
      </CurrencyContext.Provider>
    )}
  </CurrencyContext.Consumer>
)

export default CurrencyProvider
