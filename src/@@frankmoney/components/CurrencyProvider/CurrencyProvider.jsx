import React from 'react'
import CurrencyContext from '@@frankmoney/contexts/CurrencyContext'

const CURRENCY_INFO = {
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

const defaultFormatter = (value, precision = 2) =>
  new Intl.NumberFormat('en-US', { minimumFractionDigits: precision }).format(
    value.toFixed(precision)
  )

const CurrencyProvider = ({ code, formatter, children }) => (
  <CurrencyContext.Consumer>
    {context => (
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
